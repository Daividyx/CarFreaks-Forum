'use client'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { Database } from 'lucide-react'
import { headers } from 'next/headers'

export default function SessionInfo() {
  const { data: session } = authClient.useSession()

  return (
    <div className="bg-gray-100 p-2 text-left text-sm">
      {session
        ? `Du bist eingeloggt als ${session.user.name ?? 'Unbekannt'}`
        : 'Du bist nicht eingeloggt'}
    </div>
  )
}
