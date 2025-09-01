/**
 *
 * LoginForm
 * Stellt das Formular dar, das der Nutzer zum Login benötigt
 * Ereldig mittels BetterAuth die Authentifizierungslogik und meldet den Nutzer an
 *
 */
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
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null | undefined>(null)
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
    }
    if (!data.email || !data.password) {
      setError('Bitte Email und Passwort eingeben')
      setIsPending(false)
      return
    }
    // User einloggen mit Better Auth
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    })
    if (error) {
      setError(error.message)
      setIsPending(false)
      return
    }
    setIsPending(false)
    router.push('/myProfile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto my-20 flex max-w-md flex-col items-center">
        <CardTitle>Jetzt einloggen</CardTitle>
        <Link href="/register" className="hover:font-bold">
          <CardDescription>Noch kein Konto? Jetzt registrieren!</CardDescription>
        </Link>
        <CardContent className="space-y-4 py-6">
          {/* Email */}
          <div className="w-[300px] space-y-1">
            <Label className="px-2">Email Adresse</Label>
            <Input name="email" id="email" type="email" />
          </div>

          {/* Passwort */}
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

          {/* Login-Button */}
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
