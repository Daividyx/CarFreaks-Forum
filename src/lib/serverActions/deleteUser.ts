'use server'

import { headers } from 'next/headers'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/database/prisma'

export default async function deleteUser(userId: string) {
  // Session abrufen
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect('/notAuthenticated')
  }
  if (!(session.user.role == 'ADMIN')) {
    redirect('notAdmin')
  }

  await prisma.user.delete({
    where: { id: userId },
  })
  redirect('/admin/user')

  return
}
