import { prisma } from '@/database/prisma'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PostDropdownMenuButton } from '@/components/buttons/adminDropdownMenuButon'

type Props = {
  params: {
    id: string
  }
}

export default async function ThreadPostsAdminPage({ params }: Props) {
  const { id } = await params

  // Thread-Daten abrufen, um den Titel im Header anzuzeigen
  const thread = await prisma.thread.findUnique({
    where: { id: id },
    select: { title: true },
  })

  // Alle Posts des Threads laden, sortiert nach Erstellungsdatum (neueste zuerst)
  const posts = await prisma.post.findMany({
    where: { threadId: id },
    select: {
      id: true,
      content: true,
      createdAt: true,

      author: { select: { name: true, email: true, id: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Wenn keine Posts existieren, Hinweis anzeigen
  if (posts.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border p-6 text-center">
        Keine Beiträge in diesem Thread.
      </div>
    )
  }

  return (
    <div className="mx-auto mt-20 max-w-4xl break-words">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Thema: {thread?.title}
        </h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Tabelle mit Posts */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Autor</TableHead>
            <TableHead>Auszug</TableHead>
            <TableHead>Erstellt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              {/* Spalte: Autor mit Name und Mail */}
              <TableCell className="break-words whitespace-normal">
                {post.author?.name ?? 'Unbekannt'}
                <div className="text-muted-foreground text-xs">{post.author?.email}</div>
              </TableCell>

              {/* Spalte: Inhalt (nur Auszug, max. 160 Zeichen) */}
              <TableCell className="break-words whitespace-normal">
                {post.content?.slice(0, 160) ?? '–'}
              </TableCell>

              {/* Spalte: Erstellungsdatum */}
              <TableCell>{post.createdAt.toLocaleDateString('de-DE')}</TableCell>

              {/* Spalte: Dropdown-Menü für Optionen */}
              <TableCell>
                <PostDropdownMenuButton postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
