import { Card, CardContent } from '@/components/ui/card'

type prop = {
  params: string
}
export default function CalcButton({ params }: prop) {
  return (
    <Card className="flex h-12 justify-center">
      <CardContent className="flex justify-center">
        <h1 className="text-2xl font-bold">{params}</h1>
      </CardContent>
    </Card>
  )
}
