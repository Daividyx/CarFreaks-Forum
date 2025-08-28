'use server'
import { prisma } from '@/database/prisma'

export default async function DeleteCategory(categoryId: string) {
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    })
  } catch (error) {
    console.log(error)
  }
}
