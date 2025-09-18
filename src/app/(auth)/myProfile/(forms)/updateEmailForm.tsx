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
  // State-Variable, um Ladezustand beim Absenden zu steuern
  const [isPending, setIsPending] = useState(false)

  // State-Variable für Fehler (z. B. Validierungsfehler)
  const [error, setError] = useState<Record<string, string[] | undefined> | null>(null)

  // Funktion, die ausgeführt wird, wenn das Formular abgesendet wird
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // Verhindert Neuladen der Seite
    setIsPending(true) // Ladezustand aktivieren
    setError(null) // Fehler zurücksetzen

    // Formulardaten auslesen
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      email: formData.get('email')?.toString(),
    }

    // Validierung der Eingaben mit Zod
    const parsed = updateEmailShema.safeParse(data)
    if (!parsed.success) {
      // Falls Validierung fehlschlägt → Fehler speichern und Anzeige ermöglichen
      setError(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }

    // Anfrage an BetterAuth: E-Mail-Adresse aktualisieren
    await authClient.changeEmail({
      newEmail: parsed.data.email,
    })

    // Nach erfolgreicher Änderung Ladezustand zurücksetzen
    setIsPending(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-4xl space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Email ändern</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Eingabefeld für die neue Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" defaultValue={oldEmail} />
              {/* Anzeige der Fehlermeldung falls Validierung fehlschlägt */}
              {error?.email && <p className="text-destructive">{error.email}</p>}
            </div>

            {/* Button zum Speichern */}
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
