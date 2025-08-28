import { Card, CardDescription, CardTitle } from '@/components/ui/card'

{
  /** Darüber diverse Importe */
}
type Props = {
  thread: {
    title: string
    author: { name: string }
    posts: { id: string }[]
    createdAt: Date
  }
}
export default function ThreadCard({ thread }: Props) {
  return (
    <Card className="w-full min-w-0 rounded-xl p-3 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg sm:p-5">
      <CardTitle className="text-base leading-snug font-semibold break-words sm:text-lg">
        {thread.title}
      </CardTitle>

      <CardDescription className="mt-2 text-xs text-gray-500 sm:text-sm">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <span className="min-w-0 break-words">
            von <span className="font-bold text-black">{thread.author.name}</span> –{' '}
            {thread.createdAt.toLocaleDateString('de-DE')}
          </span>

          {/* Mobile: eigene Zeile; ab sm rechtsbündig */}
          <span className="text-muted-foreground text-xs whitespace-nowrap sm:ml-auto">
            {thread.posts.length} Beiträge
          </span>
        </div>
      </CardDescription>
    </Card>
  )
}
