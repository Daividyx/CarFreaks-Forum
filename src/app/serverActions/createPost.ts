'use server'
import { CreatePostShema } from '../validationShema/createPostShema'
import z from 'zod'
import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function createPost(prevState: unknown, formData: FormData) {
  // User aus der Session holen
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) {
    redirect('/notAuthenticated')
  }

  const data = {
    content: formData.get('content')?.toString(),
    threadId: formData.get('threadId')?.toString(),
  }

  const parsed = CreatePostShema.safeParse(data)
  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  await prisma.post.create({
    data: {
      content: parsed.data.content,

      authorId: user.id,

      threadId: parsed.data.threadId,
    },
  })
  redirect(`/thread/${parsed.data.threadId}`)
}
