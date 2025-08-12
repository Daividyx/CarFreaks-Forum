import { prisma } from '@/database/prisma'

import { notFound, redirect } from 'next/navigation'
import AnswerPostForm from './answerPostForm'
import PostCard from '../../../../components/cards/PostCard'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import BookmarkButton from '@/components/buttons/bookmarkButton'

type Props = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: Props) {
  const id = (await params).id
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    redirect('/notAuthenticated')
  }

  const thread = await prisma.thread.findUnique({
    where: { id },
    include: {
      author: true,
      bookmarks: true,
      posts: {
        orderBy: { createdAt: 'asc' },
        include: {
          author: true,
          likes: true,
        },
      },
    },
  })

  if (!thread) return notFound()

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="space-y-2">
        {/* Thread-Indikator */}
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Thread</p>

        {/* Titel */}
        <h1 className="text-3xl font-extrabold tracking-tight text-amber-800">{thread.title}</h1>

        {/* Meta-Infos */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            gestartet von <span className="font-semibold text-black">{thread.author.name}</span> –{' '}
            {new Date(thread.createdAt).toLocaleDateString('de-DE')}
          </span>

          <BookmarkButton
            initialBookmarked={thread.bookmarks.some(
              (bookmark) => bookmark.userId === session?.user?.id
            )}
            threadId={thread.id}
            key={thread.id}
          />
        </div>

        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Posts */}
      <div className="mt-6 space-y-4">
        {thread.posts.map((post) => (
          <PostCard post={post} key={post.id} userId={session.user.id} />
        ))}
      </div>

      {/* Antwortformular */}
      <div className="mt-10">
        <AnswerPostForm threadId={thread.id} />
      </div>
    </div>
  )
}
