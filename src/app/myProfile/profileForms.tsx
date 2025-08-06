import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type UserType = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | null | undefined | undefined
}
type prop = {
  user: UserType
}

export function changeName({ user }: prop) {
  return (
    <form>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Name </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6"></CardContent>
      </Card>
    </form>
  )
}
