'use client'

import Link from 'next/link'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

export default function LoginForm() {
  // State-Variable, um das Passwort sichtbar/unsichtbar zu machen
  const [showPassword, setShowPassword] = useState(false)

  // State-Variable, um den Ladezustand beim Login anzuzeigen
  const [isPending, setIsPending] = useState(false)

  // State-Variable für Fehlermeldungen
  const [error, setError] = useState<string | null | undefined>(null)

  // Router-Hook von Next.js, um nach erfolgreichem Login umzuleiten
  const router = useRouter()

  // Funktion, die beim Absenden des Formulars ausgeführt wird
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // Verhindert das Neuladen der Seite
    setIsPending(true) // Zeigt an, dass die Anfrage läuft
    setError(null) // Zurücksetzen von Fehlern

    // Formulardaten auslesen
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
    }

    // Falls E-Mail oder Passwort fehlt → Fehlermeldung ausgeben
    if (!data.email || !data.password) {
      setError('Bitte Email und Passwort eingeben')
      setIsPending(false)
      return
    }

    // Login-Versuch über BetterAuth
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    })

    // Falls Fehler beim Login auftreten → Fehlermeldung anzeigen
    if (error) {
      setError(error.message)
      setIsPending(false)
      return
    }

    // Wenn alles erfolgreich → zurücksetzen und zur Profilseite leiten
    setIsPending(false)
    router.push('/myProfile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto my-20 flex max-w-md flex-col items-center">
        <CardTitle>Jetzt einloggen</CardTitle>

        {/* Link zur Registrierungsseite */}
        <Link href="/register" className="hover:font-bold">
          <CardDescription>Noch kein Konto? Jetzt registrieren!</CardDescription>
        </Link>

        <CardContent className="space-y-4 py-6">
          {/* Eingabefeld: E-Mail */}
          <div className="w-[300px] space-y-1">
            <Label className="px-2">Email Adresse</Label>
            <Input name="email" id="email" type="email" />
          </div>

          {/* Eingabefeld: Passwort mit Umschalten zwischen Anzeigen/Verbergen */}
          <div className="w-[300px] space-y-1">
            <Label className="px-2">Passwort</Label>
            <div className="relative">
              <Input
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="pr-16"
              />
              <Button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-1 h-7 -translate-y-1/2 px-2 text-xs"
                variant="secondary"
              >
                {showPassword ? 'Verbergen' : 'Anzeigen'}
              </Button>
            </div>
          </div>

          {/* Login-Button + Fehlermeldungsausgabe */}
          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-800 text-white hover:bg-amber-900"
            >
              Login
            </Button>
            <p className="text-destructive pt-4">{error}</p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
