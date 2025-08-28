/**
 * Startseite der Anwendung
 * Rendert die Komponenten Hero und CategoryGrid
 * Übergibt die Kategorien an das CategoryGrid zur Anzeige
 */

import { prisma } from '@/database/prisma'
import Hero from './hero'
import CategoryGrid from './categoryGrid'

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      threads: {
        include: {
          posts: true,
        },
      },
    },
  })

  return (
    <main className="container mx-auto space-y-12 px-4 py-8">
      <Hero />
      <CategoryGrid categories={categories} />
    </main>
  )
}
