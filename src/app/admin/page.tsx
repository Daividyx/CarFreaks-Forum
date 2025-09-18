import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { User, Heart, MessageSquare, FileText } from 'lucide-react'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/database/prisma'

import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/notAdmin')
  }
  // User aus der Session speichern
  const user = session.user

  // Zeitraum letzte 30 Tage
  const thisMonth = new Date()
  thisMonth.setDate(thisMonth.getDate() - 30)

  // Anzahl aller Posts, Threads und neuen User in diesem Monat zählen
  const threadCount = await prisma.thread.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
    },
  })
  const postCount = await prisma.post.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
    },
  })
  const newUserCount = await prisma.user.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
    },
  })
  // Anzahl der Aktiven User in diesem Monat zählen
  // Aktiv -> Hat einen Post verfasst
  const activeUsers = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: thisMonth,
      },
    },
    distinct: 'authorId',
    select: { authorId: true },
  })
  const activeUserCount = activeUsers.length

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Dashboard</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <MessageSquare className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{threadCount}</p>
          <p className="text-muted-foreground text-sm">Threads in diesem Monat</p>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <FileText className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{postCount}</p>
          <p className="text-muted-foreground text-sm">Posts in diesem Monat</p>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <User className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{newUserCount}</p>
          <p className="text-muted-foreground text-sm">Neue Nutzer in diesem Monat</p>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <User className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{activeUserCount}</p>
          <p className="text-muted-foreground text-sm">Aktive Nutzer in diesem Monat</p>
        </Card>
      </div>

      {/* Admin Funktionen */}
      <Card className="border shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold text-amber-800">Admin Funktionen</h2>
        </div>
        <div className="flex flex-col space-y-2 pl-6">
          <Link className="underline hover:font-bold" href="/admin/user">
            Nutzerverwaltung
          </Link>
          <Link className="underline hover:font-bold" href="/admin/category">
            Kategorieverwaltung
          </Link>
        </div>
      </Card>
    </div>
  )
}
