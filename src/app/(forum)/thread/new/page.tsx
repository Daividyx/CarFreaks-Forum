import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import NewThreadForm from './newThreadForm'
import { redirect } from 'next/navigation'

export default async function NewThreadPage() {
  // Session abrufen → nur eingeloggte Nutzer dürfen neue Threads erstellen
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Falls keine Session → Weiterleitung auf die "Nicht authentifiziert"-Seite
  if (!session) {
    redirect('/notAuthenticated')
  }

  // Kategorien aus der Datenbank laden
  const categories = await prisma.category.findMany({})

  // Formular zum Erstellen eines neuen Threads anzeigen
  return (
    <div>
      <NewThreadForm categories={categories}></NewThreadForm>
    </div>
  )
}
