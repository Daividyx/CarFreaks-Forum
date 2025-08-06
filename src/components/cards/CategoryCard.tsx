import { Card } from '@/components/ui/card'

interface ForumCardProps {
  title: string
  description: string
  threads: number
  posts: number
  lastPostTitle: string
  lastPostDate: string // Erwartet z. B. "28. Juli 2025"
}

export default function ForumCard({
  title,
  description,
  threads,
  posts,
  lastPostTitle,
  lastPostDate,
}: ForumCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between rounded-xl p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      {/* Links */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-amber-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Mitte */}
      <div className="hidden max-w-xs flex-col items-center px-4 text-center md:flex">
        <p className="truncate text-sm font-bold text-amber-800">Letzter Beitrag:</p>
        <p className="truncate text-sm font-medium text-gray-700">{lastPostTitle}</p>
        <p className="text-sm text-gray-700">{lastPostDate}</p>
      </div>

      {/* Rechts */}
      <div className="space-y-1 text-right text-sm text-gray-600">
        <p>
          <strong className="font-semibold text-amber-800">{threads}</strong> Themen
        </p>
        <p>
          <strong className="font-semibold text-amber-800">{posts}</strong> Posts
        </p>
      </div>
    </Card>
  )
}
