import { Card, CardDescription, CardTitle } from '@/components/ui/card'

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
    <Card className="rounded-xl px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <CardTitle className="text-xl font-semibold">{thread.title}</CardTitle>

      <CardDescription className="mt-1 text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            von <span className="font-bold text-black">{thread.author.name}</span> –{' '}
            {thread.createdAt.toLocaleDateString('de-DE')}
          </span>
          <span className="text-muted-foreground ml-auto text-xs">
            {thread.posts.length} Beiträge
          </span>
        </div>
      </CardDescription>
    </Card>
  )
}
