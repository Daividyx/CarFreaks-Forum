'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useActionState } from 'react'
import { useState } from 'react'
import CreateUser from '@/app/serverActions/createUser'

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(CreateUser, undefined)

  // Zustand für Passwort-Anzeigen
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form action={formAction}>
      <Card className="mx-auto my-20 flex max-w-md flex-col items-center">
        <CardTitle> Jetzt registrieren</CardTitle>
        <Link href="/login" className="hover:font-bold">
          <CardDescription>Hast du schon eine Konto? Dann hier einloggen!</CardDescription>
        </Link>
        <CardContent className="space-y-4 py-6">
          {/* Benutzername */}
          <div className="w-[300px] space-y-1">
            <Label className="px-2">Benutzername</Label>
            <Input name="userName" id="userName" />
            {state?.errors?.userName && (
              <p className="px-2 text-sm text-red-700">{state?.errors?.userName}</p>
            )}
          </div>

          {/* Email */}
          <div className="w-[300px] space-y-2">
            <Label className="px-2">Email Adresse</Label>
            <Input name="email" id="email" />
            {state?.errors?.email && (
              <p className="px-2 text-sm text-red-700">{state?.errors?.email}</p>
            )}
          </div>

          {/* Passwort */}
          <div className="w-[300px] space-y-2">
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
            {state?.errors?.password && (
              <p className="px-2 text-sm text-red-700">{state?.errors?.password}</p>
            )}
          </div>

          {/* Passwort bestätigen */}
          <div className="w-[300px] space-y-2">
            <Label className="px-2">Passwort bestätigen</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className="pr-16"
              />
              <Button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-1 h-7 -translate-y-1/2 px-2 text-xs"
                variant="secondary"
              >
                {showConfirmPassword ? 'Verbergen' : 'Anzeigen'}
              </Button>
            </div>
            {state?.errors?.confirmPassword && (
              <p className="px-2 text-sm text-red-700">{state?.errors?.confirmPassword}</p>
            )}
          </div>

          {/* Registrieren-Button */}
          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-800 text-white hover:bg-amber-900"
            >
              Registrieren
            </Button>
            {state?.existingUserError && (
              <p className="px-2 text-sm text-red-700">{state?.existingUserError}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
