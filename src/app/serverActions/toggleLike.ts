'use server'

import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function toggleLike(postId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id

  if (!userId) {
    redirect('/notAuthenticated')
  }

  const existing = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  })
  if (existing) {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    })
    return { liked: false }
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    })
    return { liked: true }
  }
}
