'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useActionState } from 'react'
import { unknown } from 'zod' // ⚠️ wird hier importiert, aber nicht verwendet
import createPost from './createPost'

type AnswerPostFormProps = {
  threadId: string
}

export default function AnswerPostForm({ threadId }: AnswerPostFormProps) {
  // useActionState wird verwendet, um den Status der Server Action (createPost) zu verwalten
  // state    → aktueller Zustand (Fehler, Rückgaben, etc.)
  // formAction → wird als action ins Formular gegeben
  // isPending → true, während die Anfrage läuft
  const [state, formAction, isPending] = useActionState(createPost, undefined)

  return (
    <form action={formAction} className="space-y-4">
      {/* Verstecktes Feld: Thread-ID wird beim Absenden mitgegeben */}
      <Input type="hidden" name="threadId" value={threadId} />

      {/* Eingabefeld für den Post-Inhalt */}
      <Textarea
        name="content"
        placeholder="Schreibe deine Antwort..."
        rows={5}
        className="w-full bg-white"
      />

      {/* Fehlerausgabe: falls der Inhalt fehlt oder ungültig ist */}
      {state?.errors?.content && <p className="text-sm text-red-500">{state.errors.content}</p>}

      {/* Button zum Absenden */}
      <Button type="submit" disabled={isPending} className="bg-amber-800 hover:bg-amber-900">
        {isPending ? 'Sende...' : 'Antwort absenden'}
      </Button>
    </form>
  )
}
