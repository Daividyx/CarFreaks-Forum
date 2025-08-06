import AuthRequiredPage from '@/app/notAuthenticated/page'
import NewThreadForm from '@/app/thread/new/newThreadForm'
import ThreadCard from '@/app/thread/ThreadCard'
import { prisma } from '@/database/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function NewThreadPage() {
  const categories = await prisma.category.findMany({})
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user

  if (!session || !user) {
    return <AuthRequiredPage></AuthRequiredPage>
  }

  return (
    <div>
      <NewThreadForm categories={categories}></NewThreadForm>
    </div>
  )
}
