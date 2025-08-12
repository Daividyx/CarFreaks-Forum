import { prisma } from '@/database/prisma'

export default async function promoteUser(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'ADMIN' },
    })
  } catch (error) {
    console.log(error)
  }
}
