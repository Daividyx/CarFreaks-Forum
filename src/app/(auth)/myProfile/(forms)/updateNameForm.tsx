'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { updateNameShema } from '../(validation)/updateNameShema'
import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

type Props = {
  oldName: string
}

export default function UpdateNameForm({ oldName }: Props) {
  // Router-Hook, um nach der Änderung auf die Profilseite zurückzuleiten
  const router = useRouter()

  // State für Ladezustand
  const [isPending, setIsPending] = useState(false)

  // State für Validierungsfehler
  const [error, setError] = useState<Record<string, string[] | undefined> | null>(null)

  // Wird beim Absenden des Formulars aufgerufen
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // Standard-Verhalten (Seitenreload) verhindern
    setIsPending(true) // Ladezustand aktivieren
    setError(null) // Fehler zurücksetzen

    // Formulardaten auslesen
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name')?.toString(),
    }

    // Validierung mit Zod
    const parsed = updateNameShema.safeParse(data)
    if (!parsed.success) {
      // Validierungsfehler → ins State schreiben, um sie im UI anzuzeigen
      setError(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }

    // API-Aufruf an BetterAuth: Benutzername aktualisieren
    await authClient.updateUser({
      name: parsed.data.name,
    })

    // Ladezustand zurücksetzen und Fehler löschen
    setIsPending(false)
    setError(null)

    // Weiterleitung zum Profil
    router.push('/myProfile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-4xl space-y-8 py-10">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Name ändern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Eingabefeld für den neuen Namen */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={oldName} />
              {/* Anzeige einer Fehlermeldung, falls Validierung fehlschlägt */}
              {error?.name && <p className="text-destructive">{error.name}</p>}
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
