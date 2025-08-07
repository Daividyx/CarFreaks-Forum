'use server'
import { prisma } from '@/database/prisma'
import { Role } from '@/generated/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function promoteToAdmin() {
  //session und User holen
  const session = await auth.api.getSession({ headers: await headers() })
  const sessionUser = session?.user
  if (!sessionUser) {
    return
  }

  //prüfen ob es schon einen Admin in der Datenbank gibt. falls nein -> User mit der email "admin@mail.com" wird ADMIN

  const admin = await prisma.user.findFirst({
    where: {
      role: Role.ADMIN,
    },
  })
  if (!admin) {
    const isAdminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@mail.com',
      },
    })

    if (!isAdminUser) {
      return
    }

    await prisma.user.update({
      where: { email: 'admin@mail.com' },
      data: { role: Role.ADMIN },
    })
    return
  }
}
