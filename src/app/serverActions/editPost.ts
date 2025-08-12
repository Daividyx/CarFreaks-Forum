'use server'

import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function updatePost(postId: string, newContent: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id

  const post = await prisma.post.findUnique({
    where: { id: postId },
  })

  if (!post || post.authorId !== userId) {
    throw new Error('Nicht erlaubt')
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      content: newContent,
    },
  })
}
