import { prisma } from '@/database/prisma'

import { notFound } from 'next/navigation'
import AnswerPostForm from './answerPostForm'
import PostCard from '../../../../components/cards/PostCard'

type Props = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: Props) {
  const id = params.id
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
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-800">{thread.title}</h1>
        <p className="text-sm text-gray-500">
          gestartet von {thread.author.name} –{' '}
          {new Date(thread.createdAt).toLocaleDateString('de-DE')}
        </p>
      </div>

      <div className="space-y-4">
        {thread.posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            authorName={post.author.name}
            createdAt={post.createdAt}
          />
        ))}
      </div>
      <div className="mt-20">
        <AnswerPostForm threadId={thread.id}></AnswerPostForm>
      </div>
    </div>
  )
}
