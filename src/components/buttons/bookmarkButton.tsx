/**
 * BookmarkButton.tsx
 * -------------------
 * Client-Komponente zum Merken bzw. Entfernen eines Threads aus den gespeicherten Themen.
 * Wird an Stellen eingebunden, an denen Nutzer*innen Threads bookmarken können.
 * Nutzt eine Server Action (`toggleBookmark`), um den Status in der Datenbank zu ändern.
 */
'use client'
import { FaBookmark } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useState, useTransition } from 'react'
import { toggleBookmark } from '@/lib/serverActions/toggleBookmark'

type Props = {
  threadId: string // ID des Threads
  initialBookmarked: boolean // Anfangszustand: ist der Thread gespeichert?
}

export default function BookmarkButton({ threadId, initialBookmarked }: Props) {
  // Lokaler State für den Bookmark-Status
  const [bookmarked, setBookmarked] = useState(initialBookmarked)

  // Transition für asynchrone UI-Updates (Verhindert UI-Blockaden)
  const [isPending, startTransition] = useTransition()

  // Klick-Handler: Ruft Server Action auf und aktualisiert State
  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleBookmark(threadId)
      setBookmarked(result.bookmarked)
    })
  }

  // UI-Ausgabe
  return (
    <div className="flex flex-col items-center gap-2">
      <Label>Thema merken</Label>
      <Button onClick={handleClick} disabled={isPending} className="bg-gray-100 hover:bg-gray-100">
        <FaBookmark
          className={`text-xl transition-colors ${bookmarked ? 'text-amber-500' : 'text-gray-400'}`}
        />
      </Button>
    </div>
  )
}
