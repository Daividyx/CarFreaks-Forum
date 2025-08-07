'use client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { updateNameShema } from '../(validation)/updateNameShema'
import z from 'zod'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

type Props = {
  oldName: string
}
export default function UpdateNameForm({ oldName }: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Record<string, string[] | undefined> | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name')?.toString(),
    }
    const parsed = updateNameShema.safeParse(data)
    if (!parsed.success) {
      setError(z.flattenError(parsed.error).fieldErrors)
      setIsPending(false)
      return
    }

    await authClient.updateUser({
      name: parsed.data.name,
    })

    setIsPending(false)
    setError(null)
    router.push('/myProfile')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-4xl space-y-8 py-10">
        {/* Profil-Formular */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Name ändern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Benutzername */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={oldName} />
              {error?.name && <p className="text-destructive">{error.name}</p>}
            </div>

            {/* Speichern */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-amber-800 text-white hover:bg-amber-900"
              >
                Änderungen speichern
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
