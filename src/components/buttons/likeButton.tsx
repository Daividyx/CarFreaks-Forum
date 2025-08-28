'use client'

import { useState, useTransition } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { toggleLike } from '@/lib/serverActions/toggleLike'

type props = {
  postId: string
  initialLiked: boolean
  initialCount: number
}
export default function LikeButton({ postId, initialLiked, initialCount }: props) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState<number>(initialCount)
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleLike(postId)
      setLiked(result.liked)
      setCount((prev) => prev + (result.liked ? 1 : -1))
    })
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleClick}
        disabled={isPending}
        className="shadow-0 border-0 bg-white hover:bg-white"
      >
        <FaHeart className={`text-2xl ${liked ? 'text-red-500' : 'text-gray-400'}`} />
      </Button>
      <div className="text-sm text-gray-500">{count}</div>
    </div>
  )
}
