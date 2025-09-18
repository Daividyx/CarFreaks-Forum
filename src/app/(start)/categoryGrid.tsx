import CategoryCard from '@/components/cards/CategoryCard'
import Link from 'next/link'

// Typ für eine Kategorie mit Threads und deren Posts
type category = {
  id: string
  name: string
  description: string
  slug: string
  threads: {
    id: string
    title: string
    authorId: string
    categoryId: string
    createdAt: Date
    posts: {
      id: string
      content: string
      authorId: string
      createdAt: Date
      threadId: string
    }[]
  }[]
}

// Props für die Komponente: Liste von Kategorien
type categories = {
  categories: category[]
}

export default function CategoryGrid({ categories }: categories) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="px-8 pb-6 text-2xl font-bold text-amber-800">Unsere Kategorien</h1>
      {/* Kategorien durchlaufen und pro Kategorie eine Card erzeugen */}
      {categories.map((cat) => {
        // Anzahl der Threads in der Kategorie
        const threadCount = cat.threads.length

        // Anzahl aller Posts in allen Threads summieren
        const postCount = cat.threads.reduce((sum, t) => sum + t.posts.length, 0)

        // Neuesten Thread anhand des Datums bestimmen
        const latestThread = cat.threads.reduce(
          (latest, current) => (!latest || current.createdAt > latest.createdAt ? current : latest),
          undefined as (typeof cat.threads)[number] | undefined
        )

        // Titel und Datum des neuesten Threads, mit Fallback wenn keine Threads existieren
        const latestThreadTitle = latestThread?.title ?? 'Keine Threads vorhanden'
        const lastThreadDate = latestThread
          ? latestThread.createdAt.toLocaleDateString('de-DE')
          : '-'

        return (
          <Link href={`/category/${cat.slug}`} key={cat.id}>
            <CategoryCard
              description={cat.description}
              posts={postCount}
              threads={threadCount}
              title={cat.name}
              lastPostDate={lastThreadDate}
              lastPostTitle={latestThreadTitle}
            />
          </Link>
        )
      })}
    </section>
  )
}
