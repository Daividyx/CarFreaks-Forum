import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import AuthRequiredPage from '../../notAuthenticated/page'
import ThreadCard from '@/app/thread/ThreadCard'
import { prisma } from '@/database/prisma'
import Link from 'next/link'

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
    <div className="mx-auto max-w-3xl">
      <h1>Meine Threads</h1>
      {threads.length === 0 && <p> DU hast noch keine Themen erstellt!</p>}

      {threads.map((thread) => (
        <Link key={thread.id} href={`/thread/${thread.id}`}>
          <ThreadCard
            authorName={thread.author.name}
            createdAt={thread.createdAt}
            postCount={thread.posts.length}
            threadTitle={thread.title}
            key={thread.id}
          ></ThreadCard>
        </Link>
      ))}
    </div>
  )
}
