import { Card, CardDescription, CardTitle } from '@/components/ui/card'

type Props = {
  user: {
    name: string
    email: string
    role: string
    createdAt: Date
    threads: { id: string }[]
    posts: { id: string }[]
  }
}

export default function UserCard({ user }: Props) {
  return (
    <Card className="rounded-xl px-6 py-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
      <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>

      <CardDescription className="mt-1 text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            {user.email} – <span className="font-bold text-black">{user.role}</span>
          </span>
          <span className="text-muted-foreground ml-auto text-xs">
            Mitglied seit {user.createdAt.toLocaleDateString('de-DE')}
          </span>
        </div>

        <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-xs">
          <span>{user.threads.length} Threads</span>
          <span>{user.posts.length} Beiträge</span>
        </div>
      </CardDescription>
    </Card>
  )
}
