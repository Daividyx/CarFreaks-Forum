'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { User, Mail, Lock, MessageSquare, FileText } from 'lucide-react'

type user = {
  userName: string
  email: string
  password: string
}
const testUser = {
  userName: 'David',
  email: 'david.c@mail.com',
  password: '123123',
}
export default function ProfilePage() {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const userName = 'DavidC'
  const email = 'david@example.com'
  const threadCount = 12
  const postCount = 48

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      {/* Profil-Formular */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Profil bearbeiten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Benutzername */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Benutzername</Label>
            <Input id="username" name="username" defaultValue={testUser.userName} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <Input id="email" name="email" type="email" defaultValue={testUser.email} />
          </div>

          {/* Passwort ändern */}
          <div className="flex flex-col gap-4">
            {/* Altes Passwort */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="oldPassword">Altes Passwort</Label>
              <div className="flex gap-2">
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type={showOld ? 'text' : 'password'}
                  placeholder="Altes Passwort"
                />
                <Button
                  type="button"
                  onClick={() => setShowOld((prev) => !prev)}
                  variant="secondary"
                >
                  {showOld ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
            </div>

            {/* Neues Passwort */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="newPassword">Neues Passwort</Label>
              <div className="flex gap-2">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Neues Passwort"
                />
                <Button
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  variant="secondary"
                >
                  {showNew ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
            </div>

            {/* Passwort bestätigen */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <div className="flex gap-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Passwort bestätigen"
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  variant="secondary"
                >
                  {showConfirm ? 'Verbergen' : 'Anzeigen'}
                </Button>
              </div>
            </div>
          </div>

          {/* Speichern */}
          <div className="pt-4">
            <Button className="w-full bg-amber-800 text-white hover:bg-amber-900">
              Änderungen speichern
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
