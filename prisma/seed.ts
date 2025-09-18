import { PrismaClient } from '@/generated/prisma'
import { categories } from './categories'

import { auth } from '@/lib/auth'

const prisma = new PrismaClient()

// Users
const users = [
  { name: 'admin', email: 'admin@mail.com', password: 'Testpasswort123.' },
  { name: 'David', email: 'david@mail.com', password: 'Testpasswort123.' },
  { name: 'Lisa', email: 'lisa@mail.com', password: 'Testpasswort123.' },
  { name: 'Markus', email: 'markus@mail.com', password: 'Testpasswort123.' },
  { name: 'Anna', email: 'anna@mail.com', password: 'Testpasswort123.' },
  { name: 'Tom', email: 'tom@mail.com', password: 'Testpasswort123.' },
  { name: 'Julia', email: 'julia@mail.com', password: 'Testpasswort123.' },
  { name: 'Max', email: 'max@mail.com', password: 'Testpasswort123.' },
  { name: 'Sophie', email: 'sophie@mail.com', password: 'Testpasswort123.' },
  { name: 'Paul', email: 'paul@mail.com', password: 'Testpasswort123.' },
]

// Main
async function main() {
  await clearTables()
  await seedCategory()
  await seedUser()
  await seedThreads()
  await seedPosts()
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// Alle Tabellen leeren vor dem Seeden
async function clearTables() {
  console.log('Tabellen werden geleert')
  await prisma.like.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.post.deleteMany()
  await prisma.thread.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Tabellen Prüfen
  console.log('Tabellen werden überprüft')
  const users = await prisma.user.count()
  const sessions = await prisma.session.count()
  const accounts = await prisma.account.count()
  const categories = await prisma.category.count()
  const threads = await prisma.thread.count()
  const posts = await prisma.post.count()
  const bookmarks = await prisma.bookmark.count()
  const likes = await prisma.like.count()

  if (users === 0) console.log('User ✅ leer')
  else console.log('User ❌ noch Daten vorhanden')

  if (sessions === 0) console.log('Sessions ✅ leer')
  else console.log('Sessions ❌ noch Daten vorhanden')

  if (accounts === 0) console.log('Accounts ✅ leer')
  else console.log('Accounts ❌ noch Daten vorhanden')

  if (categories === 0) console.log('Categories ✅ leer')
  else console.log('Categories ❌ noch Daten vorhanden')

  if (threads === 0) console.log('Threads ✅ leer')
  else console.log('Threads ❌ noch Daten vorhanden')

  if (posts === 0) console.log('Posts ✅ leer')
  else console.log('Posts ❌ noch Daten vorhanden')

  if (bookmarks === 0) console.log('Bookmarks ✅ leer')
  else console.log('Bookmarks ❌ noch Daten vorhanden')

  if (likes === 0) console.log('Likes ✅ leer')
  else console.log('Likes ❌ noch Daten vorhanden')

  // Wenn alles leer ist -> seeden
  if (
    users === 0 &&
    sessions === 0 &&
    accounts === 0 &&
    categories === 0 &&
    threads === 0 &&
    posts === 0 &&
    bookmarks === 0 &&
    likes === 0
  ) {
    console.log('Alles leer ✅ -> Starte Seeding...')
  }
}
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
  console.log('Kategorien wurden erfolgreich geseedet ✅ ')
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
  console.log('user wurden erfolgreich geseedet! ✅ ')
}

// Threads + erster Post seeden
async function seedThreads() {
  const existing = await prisma.thread.findMany()
  if (existing.length !== 0) {
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
    // jeder User bekommt 2 Threads
    for (let i = 0; i < 2; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]

      // Thread erstellen
      const thread = await prisma.thread.create({
        data: {
          title: `Thread ${i + 1} von ${u.name}`,
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
  }

  console.log('Threads + erste Posts wurden erfolgreich geseedet (2 pro User)! ✅ ')
}

// Zu jedem Thread 4 Posts seeden
async function seedPosts() {
  const threads = await prisma.thread.findMany()
  const users = await prisma.user.findMany()

  if (threads.length === 0 || users.length === 0) {
    console.log('Keine Threads oder User gefunden. Posts können nicht geseedet werden.')
    return
  }

  for (let t of threads) {
    for (let i = 0; i < 4; i++) {
      // Zufälligen User auswählen
      const randomUser = users[Math.floor(Math.random() * users.length)]

      await prisma.post.create({
        data: {
          content: `Post ${i + 1} im Thread "${t.title}". 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          authorId: randomUser.id,
          threadId: t.id,
        },
      })
    }
  }

  console.log('Zu jedem Thread wurden 4 Posts erstellt! ✅ ')
}
