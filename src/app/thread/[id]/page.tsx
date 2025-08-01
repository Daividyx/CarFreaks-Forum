import PostCard from '@/components/PostCard'
import { prisma } from '@/database/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: number
  }
}

export default async function PostPage({ params }: Props) {
  const id = Number(params.id)
  const thread = await prisma.thread.findUnique({
    where: { id },
    include: {
      author: true,
      posts: {
        orderBy: { createdAt: 'asc' },
        include: {
          author: true,
        },
      },
    },
  })

  if (!thread) return notFound()

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-amber-800">{thread.title}</h1>
        <p className="text-sm text-gray-500">
          gestartet von {thread.author.userName} –{' '}
          {new Date(thread.createdAt).toLocaleDateString('de-DE')}
        </p>
      </header>

      <section className="space-y-4">
        {thread.posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            authorName={post.author.userName}
            createdAt={post.createdAt}
          />
        ))}
      </section>
    </main>
  )
}
