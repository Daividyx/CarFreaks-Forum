// prisma/seed.ts
import { PrismaClient, Role } from '../src/generated/prisma' // dein custom output
import { auth } from '../src/lib/auth' // deine Better-Auth Server-Instanz
const prisma = new PrismaClient()

async function createUsers(prisma: PrismaClient) {
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
    { name: 'Lea', email: 'lea@mail.com', password: 'Testpasswort123.' },
    { name: 'Tim', email: 'tim@mail.com', password: 'Testpasswort123.' },
    { name: 'Nina', email: 'nina@mail.com', password: 'Testpasswort123.' },
    { name: 'Jonas', email: 'jonas@mail.com', password: 'Testpasswort123.' },
    { name: 'Mia', email: 'mia@mail.com', password: 'Testpasswort123.' },
    { name: 'Felix', email: 'felix@mail.com', password: 'Testpasswort123.' },
    { name: 'Laura', email: 'laura@mail.com', password: 'Testpasswort123.' },
    { name: 'Ben', email: 'ben@mail.com', password: 'Testpasswort123.' },
    { name: 'Clara', email: 'clara@mail.com', password: 'Testpasswort123.' },
    { name: 'Elias', email: 'elias@mail.com', password: 'Testpasswort123.' },
    { name: 'Marie', email: 'marie@mail.com', password: 'Testpasswort123.' },
  ]

  for (const u of users) {
    //  Prüfen, ob es den User schon gibt (per unique email)
    const exists = await prisma.user.findUnique({ where: { email: u.email } })
    if (!exists) {
      // 2) Über Better Auth anlegen (macht Hash/Account richtig)
      try {
        await auth.api.signUpEmail({ body: { email: u.email, password: u.password, name: u.name } })
      } catch (e) {
        // Wenn Better Auth "existiert schon" meldet, ignorieren wir das
        // (zur Sicherheit oben schon per findUnique geprüft).
      }
    }
  }
  //  einen Admin setzen
  await prisma.user
    .update({
      where: { email: 'admin@mail.com' },
      data: { role: 'ADMIN' },
    })
    .catch(() => {})
}

async function createCategories() {
  const categories = [
    {
      name: 'Kaufberatung',
      slug: 'kaufberatung',
      description: 'Hilfe beim Aussuchen des neuen Autos.',
    },
    {
      name: 'Allgemeines',
      slug: 'allgemeines',
      description: 'News, Trends und allgemeine Fragen rund ums Auto.',
    },
    {
      name: 'Fahrzeugvorstellungen',
      slug: 'fahrzeugvorstellungen',
      description: 'Zeig dein Auto: Bilder, Umbauten und Geschichten.',
    },
    {
      name: 'Technik & Reparatur',
      slug: 'technik-reparatur',
      description: 'Wartung, Diagnose, Fehlersuche und Reparaturen.',
    },
    {
      name: 'Tuning & Styling',
      slug: 'tuning-styling',
      description: 'Leistung, Fahrwerk, Felgen, Beleuchtung und Optik.',
    },
  ]

  for (const c of categories) {
    const exists = await prisma.category.findFirst({ where: { name: c.name } })
    if (!exists) {
      try {
        await prisma.category.create({
          data: {
            name: c.name,
            slug: c.slug,
            description: c.description,
          },
        })
      } catch (e) {}
    }
  }
}

async function createThreads() {
  const categories = await prisma.category.findMany({ select: { id: true } })
}
