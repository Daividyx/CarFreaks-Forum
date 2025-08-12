import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import UserTable from './userTable'

export default async function Users() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/notAuthenticated')
  }
  const userRole = session.user.role
  if (userRole !== 'ADMIN') {
    redirect('notAdmin')
  }

  const rawData = await prisma.user.findMany({
    include: {
      _count: {
        select: { threads: true, posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
  const users = await rawData.map((data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt,
    threadCount: data._count.threads,
    postCount: data._count.posts,
  }))

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Nutzer</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>
      <UserTable users={users}></UserTable>
    </div>
  )
}
