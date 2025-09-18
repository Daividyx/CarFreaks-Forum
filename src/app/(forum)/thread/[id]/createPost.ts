'use server'

import z from 'zod'
import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CreatePostShema } from './createPostShema'

export default async function createPost(prevState: unknown, formData: FormData) {
  // User aus der aktuellen Session laden
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  // Falls kein User eingeloggt ist → Weiterleitung
  if (!user) {
    redirect('/notAuthenticated')
  }

  // Eingaben aus dem Formular auslesen
  const data = {
    content: formData.get('content')?.toString(),
    threadId: formData.get('threadId')?.toString(),
  }

  // Validierung mit Zod-Schema
  const parsed = CreatePostShema.safeParse(data)
  if (!parsed.success) {
    // Falls Fehler → Fehlerobjekt zurückgeben (wird im Client angezeigt)
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  // Neuen Post in der Datenbank anlegen
  await prisma.post.create({
    data: {
      content: parsed.data.content, // Inhalt des Posts
      authorId: user.id, // ID des eingeloggten Users
      threadId: parsed.data.threadId, // Zugehöriger Thread
    },
  })

  // Nach dem Erstellen zurück zum Thread weiterleiten
  redirect(`/thread/${parsed.data.threadId}`)
}
