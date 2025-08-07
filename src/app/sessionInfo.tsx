'use client'
import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { Database } from 'lucide-react'
import { headers } from 'next/headers'

export default function SessionInfo() {
  const { data: session } = authClient.useSession()

  return (
    <div className="bg-gray-100 p-2 text-left text-sm">
      {session ? (
        <p className="flex gap-1 p-4 text-xl">
          Du bist eingeloggt als <p className="text-destructive font-bold">{session.user.name}</p>
        </p>
      ) : (
        <p className="text-xl">Du bist nicht eingeloggt</p>
      )}
    </div>
  )
}
