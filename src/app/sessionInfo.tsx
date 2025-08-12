'use server'
// Datei: SessionInfo.tsx
// Zeigt an, ob ein Nutzer eingeloggt ist. Holt die Session serverseitig mit Better Auth.

import { auth } from '@/lib/auth' // Better Auth Server-Instanz
import { headers } from 'next/headers' // Zugriff auf HTTP-Header

export default async function SessionInfo() {
  // Session serverseitig abrufen
  const session = await auth.api.getSession({ headers: await headers() })
  const userRole = session?.user.role

  return (
    <div className="container mx-auto bg-gray-100 p-2 text-left text-sm">
      {!session ? (
        // Nicht eingeloggt
        <p className="text-xl">Du bist nicht eingeloggt</p>
      ) : (
        // Eingeloggt mit Nutzername
        <div className="flex gap-1 p-4 text-xl">
          Du bist eingeloggt als <p className="text-destructive">{`[${userRole}]`}</p>{' '}
          <p className="font-bold text-amber-800">{session.user.name}</p>
        </div>
      )}
    </div>
  )
}
