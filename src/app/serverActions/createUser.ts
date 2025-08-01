'use server'
import z from 'zod'
import { createUserShema } from '../validationShema/createUserShema'
import { prisma } from '@/database/prisma'
import bcrypt from 'bcryptjs'

export default async function CreateUser(prefState: unknown, formData: FormData) {
  const data = {
    userName: formData.get('userName')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    confirmPassword: formData.get('confirmPassword')?.toString(),
  }

  const parsed = createUserShema.safeParse(data)

  if (!parsed.success) {
    return {
      ParseError: 'Beim Überprüfen der Eingaben ist etwas schiefgelaufen',
      errors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: parsed.data.email }, { userName: parsed.data.userName }],
    },
  })
  if (user) {
    return {
      success: false,
      existingUserError: 'Email oder Benutzername is bereits vergeben',
    }
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

  await prisma.user.create({
    data: {
      userName: parsed.data.userName,
      email: parsed.data.email,
      password: hashedPassword,
    },
  })
  return { success: true }
}
