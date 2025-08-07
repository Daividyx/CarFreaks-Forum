'use server'
import z from 'zod'
import { createUserShema } from '../(auth)/register/createUserShema'
import { prisma } from '@/database/prisma'
import bcrypt from 'bcryptjs'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

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
      OR: [{ email: parsed.data.email }, { name: parsed.data.name }],
    },
  })
  if (user) {
    return {
      success: false,
      existingUserError: 'Email oder Benutzername is bereits vergeben',
    }
  }

  const { name, email, password } = parsed.data

  try {
    await auth.api.signUpEmail({
      body: {
        name: name,
        email,
        password,
      },
    })
  } catch (error) {
    return {
      error: 'something bad happend here my fellow friend',
    }
  }
  redirect('myProfile')
}
