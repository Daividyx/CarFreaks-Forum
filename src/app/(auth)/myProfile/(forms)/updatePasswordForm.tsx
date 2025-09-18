'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { updatePasswordShema } from '../(validation)/updatePasswordShema'

export default function UpdatePasswordForm() {
  // State für Ladezustand beim Absenden
  const [isPending, setIsPending] = useState(false)

  // State für Validierungs- oder Serverfehler
  const [error, setError] = useState<Record<string, string[] | undefined> | null>(null)

  // Sichtbarkeit der Passwortfelder steuern
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showNewConfirm, setShowNewConfirm] = useState(false)

  // Wird beim Absenden des Formulars ausgeführt
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    // Eingaben auslesen
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const inputData = {
      oldPassword: formData.get('oldPassword')?.toString(),
      newPassword: formData.get('newPassword')?.toString(),
      confirmPassword: formData.get('confirmPassword')?.toString(),
    }

    // Validierung mit Zod
    const parsed = updatePasswordShema.safeParse(inputData)
    if (!parsed.success) {
      setError(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }

    // Anfrage an BetterAuth: Passwort ändern
    const { data, error } = await authClient.changePassword({
      currentPassword: parsed.data.oldPassword,
      newPassword: parsed.data.confirmPassword, // hier wird das wiederholte PW übergeben
      revokeOtherSessions: true, // andere Sessions abmelden
    })

    // Falls Fehler vom Server zurückkommt
    if (error) {
      console.error('Passwort ändern fehlgeschlagen:', error)
      setError({
        form: [error.message || 'Passwort konnte nicht geändert werden.'],
      })
      setIsPending(false)
      return
    }

    // Erfolgsmeldung (derzeit nur in der Konsole)
    console.log('Passwort erfolgreich geändert', data)
    setIsPending(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-4xl space-y-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Passwort ändern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Feld: altes Passwort */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="oldPassword">Altes Passwort</Label>
              <div className="flex gap-2">
                <Input id="oldPassword" name="oldPassword" type={showOld ? 'text' : 'password'} />
                <Button type="button" variant="outline" onClick={() => setShowOld((prev) => !prev)}>
                  {showOld ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
              {error?.oldPassword && <p className="text-destructive">{error.oldPassword}</p>}
            </div>

            {/* Feld: neues Passwort */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword">Neues Passwort</Label>
              <div className="flex gap-2">
                <Input id="newPassword" name="newPassword" type={showNew ? 'text' : 'password'} />
                <Button type="button" variant="outline" onClick={() => setShowNew((prev) => !prev)}>
                  {showNew ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
              {error?.newPassword && <p className="text-destructive">{error.newPassword}</p>}
            </div>

            {/* Feld: neues Passwort bestätigen */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Neues Passwort wiederholen</Label>
              <div className="flex gap-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showNewConfirm ? 'text' : 'password'}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewConfirm((prev) => !prev)}
                >
                  {showNewConfirm ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
              {error?.confirmPassword && (
                <p className="text-destructive">{error.confirmPassword}</p>
              )}
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
