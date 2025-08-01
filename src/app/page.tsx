import CategoryGrid from '@/app/_components/categoryGrid'
import Hero from '@/app/_components/hero'
import LatestTreads from '@/app/_components/latestTreads'
import { prisma } from '@/database/prisma'

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
