// app/category/[slug]/page.tsx

import { prisma } from '@/database/prisma'
import { notFound, redirect } from 'next/navigation'

import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import ThreadCard from '@/components/cards/ThreadCard'

type Props = {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await Promise.resolve(params)
  // Nur eingeloggte Nutzer haben Zugriff.
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/notAuthenticated')
  }

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      threads: {
        orderBy: { createdAt: 'desc' },

        include: {
          author: true,
          posts: true,
        },
      },
    },
  })

  if (!category) return notFound()

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="space-y-2">
        {/* Kategorie-Label */}
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Kategorie</p>

        {/* Kategoriename */}
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">{category.name}</h1>

        {/* Beschreibung */}
        <p className="text-muted-foreground text-base">{category.description}</p>

        {/* Anzahl Themen */}
        <div className="flex items-center gap-3 pt-2">
          <span className="h-1 w-12 rounded-full bg-amber-500/70" />
          <span className="text-muted-foreground text-xs">
            {category.threads.length} Them
            {category.threads.length === 1 ? '' : 'en'}
          </span>
        </div>

        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Thread-Liste */}
      <div className="mt-6 grid gap-4">
        {category.threads.length === 0 ? (
          <div className="text-muted-foreground rounded-lg border p-6 text-center">
            Noch keine Threads in dieser Kategorie.
          </div>
        ) : (
          category.threads.map((thread) => (
            <Link key={thread.id} href={`/thread/${thread.id}`} className="block">
              <ThreadCard thread={thread} />
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
