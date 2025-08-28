'use client'
import { Card, CardDescription } from '@/components/ui/card'

import LikeButton from '../buttons/likeButton'
import PostDropdownMenuButton from '../buttons/postDropdownMenuButton'
import deletePost from '@/lib/serverActions/deletePost'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import editPost from '@/lib/serverActions/editPost'
import { Button } from '../ui/button'

type Props = {
  post: {
    id: string
    content: string
    createdAt: Date
    author: {
      id: string
      name: string
    }
    likes: {
      userId: string
    }[]
  }
  userId: string
}

export default function PostCard({ post, userId }: Props) {
  const isOwner = post.author.id === userId
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(post.content)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await editPost(post.id, content)
    setIsEditing(false)
    router.refresh()
  }

  return (
    <Card className="rounded-xl px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <div className="flex">
        {/* Linke Seite – Inhalt/Formular – nimmt den Rest */}
        <div className="flex-1 pr-4">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea
                className="min-h-[300px] w-full resize-y rounded-md border p-2 text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex gap-2">
                <Button type="submit">Speichern</Button>
                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                  Abbrechen
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-base font-normal break-words">{post.content}</p>
              <CardDescription className="mt-2 text-sm text-gray-500">
                <span className="font-bold text-black">{post.author.name}</span> –{' '}
                {post.createdAt.toLocaleDateString('de-DE')}
              </CardDescription>
            </>
          )}
        </div>

        {/* Rechte Seite – Menü & Like */}
        <div className="flex w-16 flex-col items-center justify-between gap-2">
          {isOwner && (
            <PostDropdownMenuButton
              postId={post.id}
              key={post.id}
              onEdit={() => setIsEditing(true)}
            />
          )}
          <LikeButton
            postId={post.id}
            initialLiked={post.likes.some((like) => like.userId === userId)}
            initialCount={post.likes.length}
          />
        </div>
      </div>
    </Card>
  )
}
