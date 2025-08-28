'use server'
import { prisma } from '@/database/prisma'
import { redirect } from 'next/navigation'

export default async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: { id: postId },
    })
  } catch (error) {
    console.log(error)
  }
}
