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

  // Optional: Thread holen für Header (Titel anzeigen)
  const thread = await prisma.thread.findUnique({
    where: { id: id },
    select: { title: true },
  })

  const posts = await prisma.post.findMany({
    where: { id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { name: true, email: true, id: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (posts.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border p-6 text-center">
        Keine Beiträge in diesem Thread.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl break-words">
      <div className="text-muted-foreground mb-4 text-sm">
        Thread: <span className="font-medium">{thread?.title ?? '–'}</span>
      </div>

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
              <TableCell className="break-words whitespace-normal">
                {post.author?.name ?? 'Unbekannt'}
                <div className="text-muted-foreground text-xs">{post.author?.email}</div>
              </TableCell>
              <TableCell className="break-words whitespace-normal">
                {post.content?.slice(0, 160) ?? '–'}
              </TableCell>
              <TableCell>{post.createdAt.toLocaleDateString('de-DE')}</TableCell>
              <TableCell>
                <PostDropdownMenuButton postId={post.id}></PostDropdownMenuButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
