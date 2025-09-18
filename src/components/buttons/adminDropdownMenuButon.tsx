'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaEllipsisV } from 'react-icons/fa'
import deleteThread from '@/lib/serverActions/deleteThread'
import Link from 'next/link'
import deletePost from '@/lib/serverActions/deletePost'
import deleteUser from '@/lib/serverActions/deleteUser'
import DeleteCategory from '@/lib/serverActions/deleteCategory'

export function PostDropdownMenuButton({ postId }: { postId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Diesen Beitrag wirklich löschen?')) return
    await deletePost(postId)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-9 w-9 p-0">
          <FaEllipsisV className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className="text-red-600"
        >
          Post löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function ThreadDropdownMenuButton({ threadId }: { threadId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Diesen Thread wirklich löschen?')) return
    await deleteThread(threadId)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-9 w-9 p-0">
          <FaEllipsisV className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            handleDelete()
          }}
          className="text-red-600"
        >
          Thread löschen
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/thread/${threadId}`}>Zu den Beiträgen</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function UserDropdownMenuButton({ userId }: { userId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Diesen Thread wirklich löschen?')) return
    await deleteUser(userId)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-9 w-9 p-0">
          <FaEllipsisV className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault()
            handleDelete()
          }}
          className="text-red-600"
        >
          Nutzer löschen
        </DropdownMenuItem>

        {/* Navigation: Link als Kind vom MenuItem */}
        <DropdownMenuItem asChild>
          <Link href={`/admin/user/${userId}/threads`}>Zu den Themen</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/user/${userId}/posts`}>Zu den Beiträgen</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export function CategoryDropdownMenuButton({
  categorySlug,
  categoryId,
}: {
  categorySlug: string
  categoryId: string
}) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Diesen Thread wirklich löschen?')) return
    await DeleteCategory(categoryId)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-9 w-9 p-0">
          <FaEllipsisV className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onSelect={async (e) => {
            e.preventDefault()
            handleDelete()
          }}
          className="text-red-600"
        >
          Kategorie löschen
        </DropdownMenuItem>

        {/* Navigation: Link als Kind vom MenuItem */}
        <DropdownMenuItem asChild>
          <Link href={`/category/${categorySlug}`}>Zu den Themen</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
