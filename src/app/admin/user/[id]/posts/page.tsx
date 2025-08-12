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

export default async function UserPostsPage({ params }: { params: { id: string } }) {
  const posts = await prisma.post.findMany({
    where: { authorId: params.id },
    include: { thread: { select: { id: true, title: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thread</TableHead>
            <TableHead>Auszug</TableHead>
            <TableHead>Erstellt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="max-w-[360px] truncate">{p.thread?.title ?? '–'}</TableCell>
              <TableCell className="max-w-[480px] truncate">
                {p.content?.slice(0, 120) ?? '–'}
              </TableCell>
              <TableCell>{p.createdAt.toLocaleDateString('de-DE')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
