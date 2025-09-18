import ThreadCard from '@/components/cards/ThreadCard'
import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'

import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function SavedThreads() {
  // Aktuelle Session abrufen
  const session = await auth.api.getSession({ headers: await headers() })

  // Falls kein User eingeloggt ist → Weiterleitung auf Fehlerseite
  if (!session?.user) {
    redirect('notAuthenticated')
  }

  // Eingeloggten User aus der Session holen
  const user = session?.user

  // Gespeicherte Threads (Bookmarks) aus der Datenbank laden
  // Für jedes Bookmark auch den Thread inkl. Autor und Posts mitladen
  const savedThreads = await prisma.bookmark.findMany({
    where: { userId: user?.id },
    include: {
      thread: {
        include: {
          author: true,
          posts: true,
        },
      },
    },
  })

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Kopfbereich */}
      <div className="mb-6 space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Übersicht</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Meine gespeicherten Themen
        </h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Bereich mit gespeicherten Threads */}
      <div className="space-y-4">
        {savedThreads.length === 0 ? (
          // Falls keine gespeicherten Threads existieren → Hinweis anzeigen
          <div className="text-muted-foreground rounded-lg border p-6 text-center">
            Du hast noch keine Themen gespeichert.
          </div>
        ) : (
          // Gespeicherte Threads als Liste ausgeben
          savedThreads.map((saved) => (
            <Link key={saved.id} href={`/thread/${saved.id}`} className="block">
              {/* ThreadCard mit den geladenen Thread-Daten */}
              <ThreadCard thread={saved.thread} />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
