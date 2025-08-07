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

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10">
      <h1 className="text-3xl font-bold text-amber-800">
        Hallo {user.name} und schön dich hier zu sehen
      </h1>

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
        <Card className="flex flex-col items-center justify-center p-6 shadow-md transition hover:shadow-lg">
          <User className="h-10 w-10 text-amber-700" />
          <p className="text-gray-500">Mitglied seit</p>
          <p className="text-2xl font-bold">{user.createdAt.toLocaleDateString('de-DE')}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 shadow-md transition hover:shadow-lg">
          <Heart className="h-10 w-10 text-amber-700" />
          <p className="text-2xl font-bold">{postCount}</p>
          <p className="text-gray-500">Likes</p>
        </Card>
      </div>

      {/* Profil-Formular */}
      <Card>
        <Accordion type="single" collapsible className="p-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl underline">Name ändern</AccordionTrigger>
            <AccordionContent>
              <UpdateNameForm oldName={user.name}></UpdateNameForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl underline">Email ändern</AccordionTrigger>
            <AccordionContent>
              <UpdateEmailForm oldEmail={user.email}></UpdateEmailForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl underline">Passwort ändern</AccordionTrigger>
            <AccordionContent>
              <UpdatePasswordForm></UpdatePasswordForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
