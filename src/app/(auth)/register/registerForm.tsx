'use client'

import Link from 'next/link'

import { useActionState } from 'react'
import { useState } from 'react'

import z, { ZodError } from 'zod'
import { createUserShema } from '@/app/(auth)/register/createUserShema'
import { error } from 'console'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { promoteToAdmin } from './promoteToAdmin'

export default function RegisterForm() {
  //const [state, formAction, isPending] = useActionState(CreateUser, undefined)

  // Zustand für Passwort-Anzeigen
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isPending, setIsPending] = useState(false)

  //eigene Handle Submit funktion wird vom Formular aufgerufen
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() //neuladen verhindern
    setErrors({}) // Error State clearen
    setIsPending(true) // isPending auf true setzen
    console.log('Submit wurde ausgelöst')

    //Neues FormData Objekt erzeugen aus dem event von react
    //Daten aus formData auslesen und speichern
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
      confirmPassword: formData.get('confirmPassword')?.toString(),
    }
    console.log('Daten aus dem Formular gezogen:', data)
    // Daten validieren mit zod
    //Wenn Fehler, dann Errors in den State speichern
    const parsed = createUserShema.safeParse(data)
    console.log('parsed.success:', parsed.success)
    console.log('parsed.error:', parsed.error)
    if (!parsed.success) {
      setErrors(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }
    console.log('parsed.data:', parsed.data)
    console.log('better auth aufgerufen')
    //User Account erstellen mit betterAuth
    const { error } = await authClient.signUp.email({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    })
    if (error) {
      setErrors({ general: [error.message as string] })
      setIsPending(false)
    }

    //User mit Admin-Mail zum Admin machen
    await promoteToAdmin()

    redirect('myProfile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto my-20 flex max-w-md flex-col items-center">
        <CardTitle> Jetzt registrieren</CardTitle>
        <Link href="/login" className="hover:font-bold">
          <CardDescription>Hast du schon eine Konto? Dann hier einloggen!</CardDescription>
        </Link>
        <CardContent className="space-y-4 py-6">
          {/* Benutzername */}
          <div className="w-[300px] space-y-1">
            <Label className="px-2">Benutzername</Label>
            <Input name="name" id="name" />
            {errors.name?.[0] && <p className="px-2 text-sm text-red-700">{errors.name[0]}</p>}
          </div>

          {/* Email */}
          <div className="w-[300px] space-y-2">
            <Label className="px-2">Email Adresse</Label>
            <Input name="email" id="email" />
            {errors.email?.[0] && <p className="px-2 text-sm text-red-700">{errors.email[0]}</p>}
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
            {errors.password?.[0] && (
              <p className="px-2 text-sm text-red-700">{errors.password[0]}</p>
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
            {errors.confirmPassword?.[0] && (
              <p className="px-2 text-sm text-red-700">{errors.confirmPassword[0]}</p>
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
            {errors.general?.[0] && (
              <p className="px-2 text-sm text-red-700">{errors.general[0]}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
