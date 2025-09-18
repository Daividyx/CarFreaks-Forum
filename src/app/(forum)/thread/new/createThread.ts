'use server'
import { prisma } from '@/database/prisma'
import { CreateThreadSchema } from './newThreadShema'
import z from 'zod'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreateThread(prevState: unknown, formData: FormData) {
  // Daten aus dem Formular auslesen
  const data = {
    categoryId: formData.get('categoryId')?.toString(),
    title: formData.get('title')?.toString(),
    text: formData.get('text')?.toString(),
  }

  // Session prüfen → nur eingeloggte Nutzer dürfen Threads erstellen
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) {
    return {}
  }

  // Eingaben mit Zod-Schema validieren
  const parsed = CreateThreadSchema.safeParse(data)
  if (!parsed.success) {
    return {
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  // Neuen Thread in der Datenbank anlegen
  const newThread = await prisma.thread.create({
    data: {
      title: parsed.data.title,
      authorId: user.id,
      categoryId: parsed.data.categoryId,
    },
  })

  // Direkt den ersten Post im Thread erstellen (der Eröffnungspost)
  await prisma.post.create({
    data: {
      content: parsed.data.text,
      authorId: user.id,
      threadId: newThread.id,
    },
  })

  // Nach erfolgreicher Erstellung zum neuen Thread weiterleiten
  redirect(`/thread/${newThread.id}`)
}
