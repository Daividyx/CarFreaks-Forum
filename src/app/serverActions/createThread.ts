'use server'
import { prisma } from '@/database/prisma'
import { CreateThreadSchema } from '../validationShema/newThreadShema'
import z from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreateThread(prevState: unknown, formData: FormData) {
  const data = {
    categoryId: formData.get('categoryId')?.toString(),
    title: formData.get('title')?.toString(),
    text: formData.get('text')?.toString(),
  }

  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) {
    return {
      sessionError: 'Es wurde keine Session gefunden',
    }
  }

  const parsed = CreateThreadSchema.safeParse(data)
  if (!parsed.success) {
    return {
      ParseError: 'Beim Überprüfen der Eingaben ist etwas schiefgelaufen',
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const newThread = await prisma.thread.create({
    data: {
      title: parsed.data.title,

      authorId: user.id,

      categoryId: parsed.data.categoryId,
    },
  })

  await prisma.post.create({
    data: {
      content: parsed.data.text,

      authorId: user.id,

      threadId: newThread.id,
    },
  })

  redirect(`/threads/${newThread.id}`)
}
