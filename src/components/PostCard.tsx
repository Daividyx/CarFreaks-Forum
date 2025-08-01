import { Card, CardDescription, CardTitle } from '@/components/ui/card'

type Props = {
  content: string
  authorName: string
  createdAt: Date
}

export default function PostCard({ content, authorName, createdAt }: Props) {
  return (
    <Card className="rounded-xl px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <p className="text-base font-normal break-words">{content}</p>
      <CardDescription className="text-sm text-gray-500">
        von {authorName} – {createdAt.toLocaleDateString('de-DE')}
      </CardDescription>
    </Card>
  )
}
