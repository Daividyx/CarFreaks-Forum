'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useActionState } from 'react'
import { useState } from 'react'
import loginUser from '@/app/serverActions/loginUser'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction}>
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
            {state?.errors?.email && (
              <p className="px-2 text-sm text-red-700">{state.errors.email}</p>
            )}
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
            {state?.errors?.password && (
              <p className="px-2 text-sm text-red-700">{state.errors.password}</p>
            )}
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
            {state?.loginError && <p className="px-2 text-sm text-red-700">{state.loginError}</p>}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
