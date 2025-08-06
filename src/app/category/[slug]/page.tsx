// app/category/[slug]/page.tsx

import { prisma } from '@/database/prisma'
import { notFound, redirect } from 'next/navigation'
import ThreadCard from '../../thread/ThreadCard'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

type Props = {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: Props) {
  // Nur eingeloggte Nutzer haben Zugriff.
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/notAuthenticated')
  }
  const slug = params.slug
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      threads: {
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: {
          author: true,
          posts: true,
        },
      },
    },
  })

  if (!category) return notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-800">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {category.threads.map((thread) => (
          <Link href={`/thread/${thread.id}`}>
            <ThreadCard
              authorName={thread.author.name}
              threadTitle={thread.title}
              createdAt={thread.createdAt}
              postCount={thread.posts.length}
              key={thread.id}
            ></ThreadCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
