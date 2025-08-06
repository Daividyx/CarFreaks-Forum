'use client'
import createPost from '@/app/serverActions/createPost'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useActionState } from 'react'
import { unknown } from 'zod'

type AnswerPostFormProps = {
  threadId: string
}

export default function AnswerPostForm({ threadId }: AnswerPostFormProps) {
  const [state, formAction, isPending] = useActionState(createPost, undefined)

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden Thread-ID */}
      <Input type="hidden" name="threadId" value={threadId} />

      {/* Textfeld */}
      <Textarea
        name="content"
        placeholder="Schreibe deine Antwort..."
        rows={5}
        className="w-full bg-white"
      />

      {/* Fehlerausgabe */}
      {state?.errors?.content && <p className="text-sm text-red-500">{state.errors.content}</p>}

      {/* Senden-Button */}
      <Button type="submit" disabled={isPending} className="bg-amber-800 hover:bg-amber-900">
        {isPending ? 'Sende...' : 'Antwort absenden'}
      </Button>
    </form>
  )
}
