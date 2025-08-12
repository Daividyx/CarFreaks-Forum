import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { User, Heart, MessageSquare, FileText } from 'lucide-react'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/database/prisma'
import UpdateNameForm from './(forms)/updateNameForm'
import UpdateEmailForm from './(forms)/updateEmailForm'
import UpdatePasswordForm from './(forms)/updatePasswordForm'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }
  // User aus der Session speichern
  const user = session.user
  const userName = user.name
  const userEmail = user.email

  // Anzahl der Posts und Threads zählen
  const threadCount = await prisma.thread.count({
    where: { authorId: user.id },
  })
  const postCount = await prisma.post.count({
    where: { authorId: user.id },
  })

  const likeCount = await prisma.like.count({
    where: { userId: user.id },
  })

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Profil</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Hallo {user.name}, schön dich hier zu sehen!
        </h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <Link href="/thread/my-threads">
          <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
            <MessageSquare className="mb-2 h-10 w-10 text-amber-700" />
            <p className="text-2xl font-bold">{threadCount}</p>
            <p className="text-muted-foreground text-sm">Threads</p>
          </Card>
        </Link>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <FileText className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{postCount}</p>
          <p className="text-muted-foreground text-sm">Posts</p>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <User className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-muted-foreground text-sm">Mitglied seit</p>
          <p className="text-lg font-semibold">{user.createdAt.toLocaleDateString('de-DE')}</p>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
          <Heart className="mb-2 h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{likeCount}</p>
          <p className="text-muted-foreground text-sm">Likes</p>
        </Card>
      </div>

      {/* Profil-Formular */}
      <Card className="border shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold text-amber-800">Profil bearbeiten</h2>
        </div>
        <Accordion type="single" collapsible className="p-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-medium">Name ändern</AccordionTrigger>
            <AccordionContent>
              <UpdateNameForm oldName={user.name} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-medium">E-Mail ändern</AccordionTrigger>
            <AccordionContent>
              <UpdateEmailForm oldEmail={user.email} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-medium">Passwort ändern</AccordionTrigger>
            <AccordionContent>
              <UpdatePasswordForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
