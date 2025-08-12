'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { FaEllipsisV } from 'react-icons/fa'
import deletePost from '@/app/serverActions/deletePost'
import { useRouter } from 'next/navigation'
import editPost from '@/app/serverActions/editPost'

type Props = {
  postId: string
  onEdit: () => void
}

export default function PostDropdownMenuButton({ postId, onEdit }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = confirm('Möchtest du diesen Post wirklich löschen?')
    if (!confirmed) return

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
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete}>Beitrag löschen</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Beitrag bearbeiten</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
