import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ThreadCardProps = {
  threadTitle: string
  authorName: string
  postCount: number
  createdAt: Date
}

export default function ThreadCard({
  threadTitle,
  authorName,
  postCount,
  createdAt,
}: ThreadCardProps) {
  return (
    <Card className="rounded-xl px-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <CardTitle className="text-xl font-semibold">{threadTitle}</CardTitle>
      <CardDescription className="text-sm text-gray-500">
        von {authorName} – {postCount} Posts – {createdAt.toLocaleDateString('de-DE')}
      </CardDescription>
    </Card>
  )
}
