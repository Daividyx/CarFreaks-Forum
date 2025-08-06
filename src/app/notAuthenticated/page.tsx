import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthRequiredPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-amber-800">
            Zugriff verweigert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-700">
            Um auf diese Seite zugreifen zu können, musst du eingeloggt sein oder ein Konto
            erstellen.
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild className="bg-amber-800 px-6 text-white hover:bg-amber-900">
              <Link href="/login">Einloggen</Link>
            </Button>
            <Button asChild variant="secondary" className="px-6">
              <Link href="/register">Registrieren</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
