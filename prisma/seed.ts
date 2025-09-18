import { PrismaClient } from '@/generated/prisma'
import { categories } from './categories'
import { users } from './users'
import { auth } from '@/lib/auth'

const prisma = new PrismaClient()

//Kategorien Seeden
async function seedCategory() {
  //Prüfen ob bereits Kategorien existieren
  const existing = await prisma.category.findMany()
  if (existing.length != 0) {
    console.log(
      'Datenbank enthält schon Kategorien Zum Seeden muss sie aber leer sein!. Vorgang Abgebrochen'
    )
    return
  }

  for (let c of categories) {
    await prisma.category.create({
      data: c,
    })
  }
  console.log('Kategorien wurden erfolgreich geseedet')
}

// User Seeden
async function seedUser() {
  const existing = await prisma.user.findMany()
  if (existing.length != 0) {
    console.log(
      'Datenbank enthält schon Users Zum Seeden muss sie aber leer sein!. Vorgang Abgebrochen'
    )
    return
  }

  for (let u of users) {
    await auth.api.signUpEmail({
      body: {
        name: u.name,
        email: u.email,
        password: u.password,
      },
    })
  }
  console.log('user wurden erfolgreich geseedet!')
}

// Threads + erster Post seeden
async function seedThreads() {
  const existing = await prisma.thread.findMany()
  if (existing.length != 0) {
    console.log(
      'Datenbank enthält schon Threads. Zum Seeden muss sie leer sein! Vorgang abgebrochen.'
    )
    return
  }

  const users = await prisma.user.findMany()
  const categories = await prisma.category.findMany()

  if (users.length === 0 || categories.length === 0) {
    console.log('Keine User oder Kategorien gefunden. Threads können nicht geseedet werden.')
    return
  }

  for (let u of users) {
    const category = categories[Math.floor(Math.random() * categories.length)]

    // Thread erstellen
    const thread = await prisma.thread.create({
      data: {
        title: `Thread von ${u.name}`,
        authorId: u.id,
        categoryId: category.id,
      },
    })

    // Erster Post im Thread
    await prisma.post.create({
      data: {
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Praesent eget orci vitae odio pharetra elementum.`,
        authorId: u.id,
        threadId: thread.id,
      },
    })
  }

  console.log('Threads + erste Posts wurden erfolgreich geseedet!')
}

// Main
async function main() {
  await seedCategory()
  await seedUser()
  await seedThreads()
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
