'use server'
import z from 'zod'
import { NewCategoryShema } from '../validationShema/newCategoryShema'
import { prisma } from '@/database/prisma'
import { redirect } from 'next/navigation'

export default async function createCategory(prevState: unknown, formData: FormData) {
  const data = {
    name: formData.get('name')?.toString(),
    slug: formData.get('slug')?.toString(),
    description: formData.get('description')?.toString(),
  }

  const parsed = NewCategoryShema.safeParse(data)

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors }
  }

  try {
    await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
      },
    })
  } catch (error) {
    console.log(error)
    console.log('Fehler')
  }
  console.log("redirect('/admin/category')")
  redirect('/admin/category')
}
