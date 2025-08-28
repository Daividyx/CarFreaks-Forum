import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

import { prisma } from '@/database/prisma'
import Link from 'next/link'
import AuthRequiredPage from '@/app/(error)/notAuthenticated/page'
import ThreadCard from '@/components/cards/ThreadCard'

export default async function MyThreads() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user

  if (!session?.user) {
    return <AuthRequiredPage></AuthRequiredPage>
  }

  const threads = await prisma.thread.findMany({
    where: { authorId: user?.id },
    include: {
      author: true,
      posts: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Übersicht</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Meine Themen</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Inhalt */}
      {threads.length === 0 ? (
        <div className="text-muted-foreground rounded-lg border p-6 text-center">
          Du hast noch keine Themen erstellt!
        </div>
      ) : (
        <div className="flex-warp flex min-w-0 flex-col space-y-4">
          {threads.map((thread) => (
            <Link key={thread.id} href={`/thread/${thread.id}`} className="block">
              <ThreadCard thread={thread} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
