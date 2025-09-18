import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import UserTable from './userTable'

export default async function Users() {
  // Session abrufen
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    // Wenn keine Session vorhanden → Umleitung
    redirect('/notAuthenticated')
  }

  // Rolle des eingeloggten Nutzers prüfen
  const userRole = session.user.role
  if (userRole !== 'ADMIN') {
    // Wenn nicht Admin → Umleitung
    redirect('/notAdmin')
  }

  // Alle Nutzer laden
  // Threads und Posts werden gezählt
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

  // Daten transformieren: nur die benötigten Felder übernehmen
  const users = rawData.map((data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt,
    threadCount: data._count.threads,
    postCount: data._count.posts,
  }))

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6">
      {/* Header-Bereich */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Nutzerverwaltung</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Tabelle mit allen Nutzern */}
      <UserTable users={users} />
    </div>
  )
}
