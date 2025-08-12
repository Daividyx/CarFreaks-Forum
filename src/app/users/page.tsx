import { Input } from '@/components/ui/input'
import { prisma } from '@/database/prisma'
import { Label } from '@radix-ui/react-label'

export default async function Users() {
  const users = await prisma.user.findMany()
  if (!users) {
    return
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1> Diese Übersicht dient nur dem testen</h1>
      <h1>
        {' '}
        Wenn ein passwort geändert wird, dann wird es zu "Testpasswort1234." geändert. Anschließend
        wieder zurück zu "Testpasswort123."
      </h1>
      {users.map((user) => (
        <div key={user.id} className="space-y-4 rounded-md border p-4 shadow-sm">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`name-${user.id}`}>Name</Label>
            <Input id={`name-${user.id}`} defaultValue={user.name} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`email-${user.id}`}>Email</Label>
            <Input id={`email-${user.id}`} defaultValue={user.email} />
          </div>

          {/* Passwort */}
          <div className="flex flex-col gap-2">
            <Label htmlFor={`password-${user.id}`}>Passwort</Label>
            <Input id={`password-${user.id}`} type="text" defaultValue="Testpasswort123." />
          </div>
        </div>
      ))}
    </div>
  )
}
