import { CategoryDropdownMenuButton } from '@/components/buttons/adminDropdownMenuButon'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table'
import { prisma } from '@/database/prisma'
import NewCategoryForm from './newCategoryForm'

export default async function AdminCategoryPage() {
  const rawCategories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,

      _count: { select: { threads: true } }, // Threads pro Kategorie
      threads: {
        select: {
          _count: { select: { posts: true } }, // Posts pro Thread
        },
      },
    },
  })

  const categories = rawCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    threadCount: c._count.threads,
    postCount: c.threads.reduce((sum, t) => sum + t._count.posts, 0),
  }))

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Kategorien</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Themen</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Optionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.threadCount}</TableCell>
              <TableCell>{category.postCount}</TableCell>
              <TableCell>
                <CategoryDropdownMenuButton
                  categoryId={category.id}
                  categorySlug={category.slug}
                ></CategoryDropdownMenuButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1 className="text-2xl text-amber-800">Neue Kategorie erstellen</h1>
      <NewCategoryForm></NewCategoryForm>
    </div>
  )
}
