import { PrismaClient } from '@/generated/prisma'
import { categories } from './categories'
import { auth } from '@/lib/auth'

const prisma = new PrismaClient()

// User Data
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
const adminEmail = 'admin@mail.com'

// Main
async function main() {
  console.log('\n==============================')
  console.log('🚀 Seed-Prozess wird gestartet')
  console.log('==============================\n')

  await clearTables()
  await seedCategory()
  await seedUser()
  await promoteAdmin(adminEmail)
  await seedThreads()
  await seedPosts()

  console.log('\n==============================')
  console.log('🏁 Seed-Prozess abgeschlossen!')
  console.log('==============================\n')
}
main()
  .catch((e) => {
    console.error('❌ Fehler im Seed-Prozess:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// Alle Tabellen leeren vor dem Seeden
async function clearTables() {
  console.log('🧹 Schritt 1: Tabellen werden geleert...\n')

  await prisma.like.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.post.deleteMany()
  await prisma.thread.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('🔎 Überprüfung nach dem Löschen:')

  const users = await prisma.user.count()
  const sessions = await prisma.session.count()
  const accounts = await prisma.account.count()
  const categories = await prisma.category.count()
  const threads = await prisma.thread.count()
  const posts = await prisma.post.count()
  const bookmarks = await prisma.bookmark.count()
  const likes = await prisma.like.count()

  if (users === 0) console.log('   User       ✅ leer')
  else console.log('   User       ❌ noch Daten vorhanden')

  if (sessions === 0) console.log('   Sessions   ✅ leer')
  else console.log('   Sessions   ❌ noch Daten vorhanden')

  if (accounts === 0) console.log('   Accounts   ✅ leer')
  else console.log('   Accounts   ❌ noch Daten vorhanden')

  if (categories === 0) console.log('   Categories ✅ leer')
  else console.log('   Categories ❌ noch Daten vorhanden')

  if (threads === 0) console.log('   Threads    ✅ leer')
  else console.log('   Threads    ❌ noch Daten vorhanden')

  if (posts === 0) console.log('   Posts      ✅ leer')
  else console.log('   Posts      ❌ noch Daten vorhanden')

  if (bookmarks === 0) console.log('   Bookmarks  ✅ leer')
  else console.log('   Bookmarks  ❌ noch Daten vorhanden')

  if (likes === 0) console.log('   Likes      ✅ leer')
  else console.log('   Likes      ❌ noch Daten vorhanden')

  console.log('\n✅ Tabellen erfolgreich geleert!\n')
}

// Kategorien seeden
async function seedCategory() {
  console.log('📂 Schritt 2: Kategorien werden geseedet...\n')

  const existing = await prisma.category.findMany()
  if (existing.length !== 0) {
    console.log('❌ Kategorien existieren bereits – Vorgang abgebrochen.\n')
    return
  }

  for (let c of categories) {
    await prisma.category.create({ data: c })
  }

  console.log('✅ Kategorien erfolgreich geseedet!\n')
}

// User seeden
async function seedUser() {
  console.log('👤 Schritt 3: User werden geseedet...\n')

  const existing = await prisma.user.findMany()
  if (existing.length !== 0) {
    console.log('❌ User existieren bereits – Vorgang abgebrochen.\n')
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

  console.log('✅ User erfolgreich geseedet!\n')
}

// Admin befördern
async function promoteAdmin(adminEmail: string) {
  console.log(`⭐ Schritt 4: User "${adminEmail}" wird zum Admin befördert...\n`)

  try {
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: 'ADMIN' },
    })
    console.log(`✅ "${adminEmail}" ist jetzt Admin!\n`)
  } catch (e) {
    console.error(`❌ Fehler: User "${adminEmail}" konnte nicht zum Admin gemacht werden.\n`, e)
  }
}

// Threads + erster Post seeden
async function seedThreads() {
  console.log('📝 Schritt 5: Threads + erste Posts werden geseedet...\n')

  const existing = await prisma.thread.findMany()
  if (existing.length !== 0) {
    console.log('❌ Threads existieren bereits – Vorgang abgebrochen.\n')
    return
  }

  const users = await prisma.user.findMany()
  const categories = await prisma.category.findMany()

  if (users.length === 0 || categories.length === 0) {
    console.log('❌ Keine User oder Kategorien gefunden. Threads können nicht erstellt werden.\n')
    return
  }

  for (let u of users) {
    for (let i = 0; i < 2; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]

      const thread = await prisma.thread.create({
        data: {
          title: `Thread ${i + 1} von ${u.name}`,
          authorId: u.id,
          categoryId: category.id,
        },
      })

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

  console.log('✅ Threads + erste Posts erfolgreich geseedet!\n')
}

// Posts seeden
async function seedPosts() {
  console.log('💬 Schritt 6: Zusätzliche Posts werden geseedet...\n')

  const threads = await prisma.thread.findMany()
  const users = await prisma.user.findMany()

  if (threads.length === 0 || users.length === 0) {
    console.log('❌ Keine Threads oder User gefunden. Posts können nicht erstellt werden.\n')
    return
  }

  for (let t of threads) {
    for (let i = 0; i < 4; i++) {
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

  console.log('✅ 4 Posts pro Thread erfolgreich erstellt!\n')
}
