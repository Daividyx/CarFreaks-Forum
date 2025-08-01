'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { User, Mail, Lock, MessageSquare, FileText } from 'lucide-react'
import UpdateProfileForm from '@/components/updateProfileForm'

export default function ProfilePage() {
  // Local state (später mit Server Actions ersetzen)

  // Demo-Daten (hier später echte User-Daten reinladen)
  const userName = 'DavidC'
  const email = 'david@example.com'
  const threadCount = 12
  const postCount = 48

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      {/* Titel */}
      <h1 className="text-3xl font-bold text-amber-800">Mein Profil</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 shadow-md transition hover:shadow-lg">
          <MessageSquare className="h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{threadCount}</p>
          <p className="text-gray-500">Threads</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 shadow-md transition hover:shadow-lg">
          <FileText className="h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{postCount}</p>
          <p className="text-gray-500">Posts</p>
        </Card>
      </div>

      {/* Profil-Formular */}

      <UpdateProfileForm></UpdateProfileForm>
    </div>
  )
}
