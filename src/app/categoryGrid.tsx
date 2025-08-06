import CategoryCard from '@/components/cards/CategoryCard'
import Link from 'next/link'

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

type categories = {
  categories: category[]
}

export default function CategoryGrid({ categories }: categories) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="px-8 pb-6 text-2xl font-bold text-amber-800">Unsere Kategorien</h1>
      {/** Durch die Kategorien Mappen und für Jede Kategorie eine Card erstellen */}
      {categories.map((cat) => {
        const threadCount = cat.threads.length
        const postCount = cat.threads.reduce((sum, t) => sum + t.posts.length, 0)

        const latestThread = [...cat.threads].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]

        const latestThreadTitle = latestThread?.title ?? '-'
        const lastThreadDate = latestThread?.createdAt.toLocaleDateString('de-DE') ?? '-'

        return (
          <Link href={`/category/${cat.slug}`} key={cat.id}>
            <CategoryCard
              key={cat.id}
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
