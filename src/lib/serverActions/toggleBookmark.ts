/**
 * toggleBookmark.ts
 * -----------------
 * Server Action zum Speichern oder Entfernen eines Bookmarks für einen Thread.
 * Überprüft zuerst die Sitzung, ermittelt den Nutzer und aktualisiert den Eintrag in der Datenbank.
 * Wird z. B. vom BookmarkButton (Client-Komponente) aufgerufen.
 */

'use server'

import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function toggleBookmark(threadId: string) {
  // Sitzung des aktuellen Nutzers abrufen
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id

  // Falls nicht eingeloggt, Umleitung zur Login-Seite
  if (!userId) {
    redirect('/notAuthenticated')
  }

  // Prüfen, ob bereits ein Bookmark existiert
  const existing = await prisma.bookmark.findUnique({
    where: {
      userId_threadId: {
        userId,
        threadId,
      },
    },
  })

  if (existing) {
    // Bookmark löschen, wenn es bereits existiert
    await prisma.bookmark.delete({
      where: {
        userId_threadId: {
          userId,
          threadId,
        },
      },
    })
    return { bookmarked: false }
  } else {
    // Bookmark neu erstellen
    await prisma.bookmark.create({
      data: {
        userId,
        threadId,
      },
    })
    return { bookmarked: true }
  }
}
