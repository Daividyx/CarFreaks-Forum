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
      name: 'Technik',
      slug: 'technik',
      description: 'Wartung, Diagnose, Fehlersuche und Reparaturen.',
    },
    {
      name: 'Tuning',
      slug: 'tuning',
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
  // Kategorien holen
  const kaufberatung = await prisma.category.findFirst({
    where: { slug: 'kaufberatung' },
    select: { id: true },
  })
  const allgemeines = await prisma.category.findFirst({
    where: { name: 'allgemeines' },
    select: { id: true },
  })
  const fahrzeugvorstellungen = await prisma.category.findFirst({
    where: { name: 'fahrzeugvorstellungen' },
    select: { id: true },
  })
  const technik = await prisma.category.findFirst({
    where: { name: 'technik' },
    select: { id: true },
  })
  const tuning = await prisma.category.findFirst({
    where: { name: 'tuning' },
    select: { id: true },
  })

  // User holen
  const users = await prisma.user.findMany({ select: { id: true } })
  const user1 = users[0]?.id
  const user2 = users[1]?.id
  const user3 = users[2]?.id
  const user4 = users[3]?.id
  const user5 = users[4]?.id
  const user6 = users[5]?.id
  const user7 = users[6]?.id
  const user8 = users[7]?.id
  const user9 = users[8]?.id
  const user10 = users[9]?.id

  // --- Ab hier lag dein Code vorher außerhalb: rein in die Funktion! ---

  // Vorab prüfen
  if (
    !kaufberatung?.id ||
    !allgemeines?.id ||
    !fahrzeugvorstellungen?.id ||
    !technik?.id ||
    !tuning?.id
  ) {
    throw new Error('Mindestens eine Kategorie wurde nicht gefunden (ID fehlt).')
  }

  const c = {
    kaufberatung: kaufberatung.id,
    allgemeines: allgemeines.id,
    fahrzeugvorstellungen: fahrzeugvorstellungen.id,
    technik: technik.id,
    tuning: tuning.id,
  }

  const u = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10].filter(
    Boolean
  ) as string[] // falls <10 User

  const titles = {
    kaufberatung: [
      'Welches Auto unter 5000 Euro?',
      'Erfahrungen mit Gebrauchtwagenhändlern?',
      'Erstwagen für Student – Tipps?',
      'SUV oder Kombi für die Familie?',
      'Diesel noch sinnvoll im Alltag?',
      'Leasing oder Finanzierung – was lohnt?',
      'Elektro für 50 km Pendelstrecke?',
      'Worauf bei der Probefahrt achten?',
      'TÜV frisch – trotzdem Risiken?',
      'Import aus NL – ja oder nein?',
    ],
    allgemeines: [
      'Was habt ihr am Wochenende geschraubt?',
      'Euer Real-Verbrauch im Alltag',
      'Lieblings-Fahrstrecke in der Region',
      'Pflege-Tipps für den Sommer',
      'Welche Dashcam nutzt ihr?',
      'Versicherung günstiger – Erfahrungen?',
      'Sommer-/Winterreifen richtig lagern',
      'Werkzeug-Empfehlungen für Einsteiger',
      'Günstige OBD-Scanner?',
      'Was nervt euch im Straßenverkehr?',
    ],
    fahrzeugvorstellungen: [
      'Mein Golf 7 R – Vorstellung',
      'A4 B9 Avant – Daily-Driver',
      'E46 330i – Projektstart',
      'Focus ST – Tracktool',
      'Mazda MX-5 – Leicht & spaßig',
      'Tesla Model 3 – Pendler',
      'Octavia RS – Familienrakete',
      'Clio 3 RS – Ringpaket',
      'Civic Type R – FK8',
      'Polo GTI – Stadtflitzer',
    ],
    technik: [
      'Bremsanlage upgraden – was beachten?',
      'Ölwechsel-Intervalle realistisch?',
      'Software-Update nach Tuning?',
      'Ladeluftkühler – bringt das was?',
      'AGR stilllegen – legal?',
      'Zündkerzen: Iridium vs. Standard',
      'Fahrwerk knarzt – Diagnose',
      'Kupplung rutscht – Symptome',
      'OBD2 P0420 – was tun?',
      'Klimaanlage kühlt schwach',
    ],
    tuning: [
      'Stage 1 – welche Software?',
      'Auspuff legal eintragen',
      'Gewindefahrwerk vs. Federn',
      'Felgen 19 Zoll – welche ET?',
      'Offene Ansaugung – sinnvoll?',
      'Spurverbreiterung & Eintragung',
      'Folierung matt – Pflege',
      'Downpipe mit/ohne Kat',
      'Schubumluftventil – Erfahrungen',
      'Launch Control – sinnvoll?',
    ],
  } as const

  const randDate = (days = 365) =>
    new Date(Date.now() - Math.floor(Math.random() * days * 24 * 60 * 60 * 1000))

  type ThreadSeed = { title: string; authorId: string; categoryId: string; createdAt: Date }
  const threads: ThreadSeed[] = []

  for (let i = 0; i < u.length; i++) {
    const uid = u[i]
    threads.push(
      {
        title: titles.kaufberatung[i % 10],
        authorId: uid,
        categoryId: c.kaufberatung,
        createdAt: randDate(),
      },
      {
        title: titles.allgemeines[i % 10],
        authorId: uid,
        categoryId: c.allgemeines,
        createdAt: randDate(),
      },
      {
        title: titles.fahrzeugvorstellungen[i % 10],
        authorId: uid,
        categoryId: c.fahrzeugvorstellungen,
        createdAt: randDate(),
      },
      {
        title: titles.technik[i % 10],
        authorId: uid,
        categoryId: c.technik,
        createdAt: randDate(),
      },
      { title: titles.tuning[i % 10], authorId: uid, categoryId: c.tuning, createdAt: randDate() }
    )
  }

  await prisma.thread.createMany({ data: threads })
}

// aufrufen:
await createThreads()

// 10 Posts je Thread erzeugen (auffüllen bis 10)
async function createPostsForAllThreads() {
  // User-IDs holen
  const users = await prisma.user.findMany({ select: { id: true } })
  if (users.length === 0) throw new Error('Keine User vorhanden.')
  const userIds = users.map((u) => u.id)

  // Threads holen (mit createdAt für realistische Zeitstempel)
  const threads = await prisma.thread.findMany({
    select: { id: true, createdAt: true, title: true },
  })

  // kurzer Text-Pool (deutsch, realistisch)
  const contentPool = [
    'Klingt plausibel. Hast du Quellen?',
    'Bei mir half ein Software-Update.',
    'Ich würde zuerst die Basics prüfen.',
    'ABE/Gutachten beachten, sonst Ärger.',
    'Im Alltag merkt man kaum einen Unterschied.',
    'Preis/Leistung ok, Verbrauch höher.',
    'Fehlerspeicher schon ausgelesen?',
    'ET und Reifendruck checken.',
    'Downpipe nur mit Kat empfehlenswert.',
    'Gewinde lohnt sich, wenn gut eingestellt.',
    'Ölwechsel-Intervall nicht zu lang ziehen.',
    'Vorher Diagnose, dann Teile tauschen.',
    'Legalität hängt vom Gutachten ab.',
    'Ich hatte das gleiche Problem – Sensor defekt.',
    'Sound ist subjektiv, am besten live anhören.',
    'TÜV sagt dazu meist klar Nein.',
    'Im Winter andere Einstellungen sinnvoll.',
    'Auf der Landstraße top, Stadt naja.',
    'Ich würde OEM-Teile nehmen.',
    'Achte auf die Einpresstiefe.',
  ]

  // zu erstellende Posts sammeln (Bulk-Insert)
  const postsToInsert: { threadId: string; authorId: string; content: string; createdAt: Date }[] =
    []

  for (let i = 0; i < threads.length; i++) {
    const t = threads[i]

    // bereits vorhandene Anzahl holen (idempotent "auffüllen")
    const existing = await prisma.post.count({ where: { threadId: t.id } })
    const needed = Math.max(0, 10 - existing)
    if (needed === 0) continue

    // Startzeit = Thread-Erstellung; jede Antwort später
    let ts = new Date(t.createdAt)

    for (let j = 0; j < needed; j++) {
      const authorId = userIds[(i + j) % userIds.length]
      const content = contentPool[(i + j) % contentPool.length]

      // 30–270 Minuten nach dem letzten Post
      const addMinutes = 30 + Math.floor(Math.random() * 240)
      ts = new Date(ts.getTime() + addMinutes * 60 * 1000)

      postsToInsert.push({
        threadId: t.id,
        authorId,
        content,
        createdAt: ts,
      })
    }
  }

  if (postsToInsert.length > 0) {
    await prisma.post.createMany({ data: postsToInsert })
  }
}

// Aufrufen:
await createPostsForAllThreads()
