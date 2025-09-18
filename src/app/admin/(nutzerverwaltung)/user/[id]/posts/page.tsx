// app/admin/users/[id]/posts/page.tsx
import { prisma } from '@/database/prisma'
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

export default async function UserPostsPage({ params }: Props) {
  const { id } = params

  // Nutzer laden (für Header)
  const user = await prisma.user.findUnique({
    where: { id },
    select: { name: true },
  })

  // Alle Posts des Nutzers laden
  // - id, content, createdAt
  // - zugehöriger Thread (id, title)
  const posts = await prisma.post.findMany({
    where: { authorId: id },
    select: {
      id: true,
      content: true,
      createdAt: true,
      thread: {
        select: { id: true, title: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Hinweis, wenn keine Posts existieren
  if (!posts.length) {
    return (
      <div className="text-muted-foreground rounded-lg border p-6 text-center">Keine Beiträge.</div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Beiträge von {user?.name ?? 'Unbekannt'}
        </h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      {/* Tabelle mit allen Posts */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thread</TableHead>
            <TableHead>Auszug</TableHead>
            <TableHead>Erstellt am</TableHead>
            <TableHead className="text-right">Optionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              {/* Threadtitel */}
              <TableCell className="max-w-[360px] break-words whitespace-normal">
                {post.thread?.title ?? '–'}
              </TableCell>

              {/* Auszug aus dem Post */}
              <TableCell className="max-w-[480px] break-words whitespace-normal">
                {post.content?.slice(0, 160) ?? '–'}
              </TableCell>

              {/* Erstellungsdatum */}
              <TableCell className="text-center">
                {post.createdAt.toLocaleDateString('de-DE')}
              </TableCell>

              {/* Dropdown-Menü für Admin-Optionen */}
              <TableCell className="text-right">
                <PostDropdownMenuButton postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
