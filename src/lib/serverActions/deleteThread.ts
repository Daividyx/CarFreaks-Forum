'use server'
import { prisma } from '@/database/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function deleteThread(threadId: string) {
  try {
    await prisma.thread.delete({
      where: { id: threadId },
    })
    console.log()
  } catch (error) {
    console.log(error)
  }
}
