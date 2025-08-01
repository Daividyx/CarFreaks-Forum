import { prisma } from '@/database/prisma'

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'desc' } })

  return <div></div>
}
