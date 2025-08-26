import { Card } from '@/components/ui/card'

interface ForumCardProps {
  title: string
  description: string
  threads: number
  posts: number
  lastPostTitle: string
  lastPostDate: string
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
    <Card className="mx-4 flex flex-col items-start justify-between gap-4 rounded-xl p-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-6">
      {/* Links */}
      <div className="flex w-full flex-col">
        <h2 className="text-base font-bold text-amber-800 sm:text-lg">{title}</h2>
        <p className="mt-1 text-sm break-words text-gray-600 sm:text-base">{description}</p>
      </div>

      {/* Mitte */}
      <div className="order-3 flex w-full flex-col text-left sm:order-none sm:max-w-xs sm:items-center sm:text-center">
        <p className="text-xs font-bold text-amber-800 sm:text-sm">Letzter Beitrag:</p>
        <p className="truncate text-sm font-medium text-gray-700">{lastPostTitle}</p>
        <p className="text-sm text-gray-700">{lastPostDate}</p>
      </div>

      {/* Rechts */}
      <div className="order-2 w-full space-y-1 text-left text-sm text-gray-600 sm:order-none sm:w-auto sm:text-right">
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
