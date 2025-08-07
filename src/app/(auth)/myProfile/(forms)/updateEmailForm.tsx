'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'

import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { updateEmailShema } from '../(validation)/updateEmailShema'

type Props = {
  oldEmail: string
}
export default function UpdateEmailForm({ oldEmail }: Props) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Record<string, string[] | undefined> | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      email: formData.get('email')?.toString(),
    }
    const parsed = updateEmailShema.safeParse(data)
    if (!parsed.success) {
      setError(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }

    //updateEmail

    await authClient.changeEmail({
      newEmail: parsed.data.email,
    })

    setIsPending(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Profil-Formular */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Email ändern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Benutzername */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={oldEmail} />
              {error?.email && <p className="text-destructive">{error.email}</p>}
            </div>

            {/* Speichern */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-amber-800 text-white hover:bg-amber-900"
              >
                Änderungen speichern
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
