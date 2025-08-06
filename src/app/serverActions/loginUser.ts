'use server'
import z from 'zod'

import { prisma } from '@/database/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { LoginShema } from '../validationShema/loginShema'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'

export async function LoginUser(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  }

  const parsed = LoginShema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    }
  }
  // old without BetterAuth
  /*

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })
  if (!user) {
    return {
      loginError: 'E-Mail Adresse falsch',
    }
  }

  const isPasswordCorrect = await bcrypt.compare(parsed.data.password, user.password)
  if (!isPasswordCorrect) {
    return {
      loginError: 'Passwort falsch',
    }
  }
  */
  const { email, password } = parsed.data
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
  } catch (error) {
    return { error: 'oops. somethin bad happend :/' }
  }
}
