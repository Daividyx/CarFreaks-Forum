'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

import { authClient } from '@/lib/auth-client'

import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function AdminNavBar() {
  return (
    <nav className="w-full bg-blue-300">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 p-4">
          <h1 className="text-2xl font-bold text-red-800">Admin</h1>
          <div className="flex gap-6">
            <Link className="hover:font-bold" href="/home">
              Startseite
            </Link>
            <Link className="hover:font-bold" href="/admin/country">
              Forum
            </Link>
            <Link className="hover:font-bold" href="/admin/user">
              Nutzerverwaltung
            </Link>
            <Link className="hover:font-bold" href="/admin/city">
              Stadtverwaltung
            </Link>
            <Link className="hover:font-bold" href="/admin/post">
              Postverwaltung
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Navbar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const userRole = session?.user.role

  async function handleLogout() {
    await authClient.signOut()
    router.push('/')
  }

  return (
    <nav className="container mx-auto flex w-full items-center justify-between gap-4 bg-yellow-400 p-4">
      <h1 className="text-2xl font-bold text-amber-800">
        <Link href="/">CarFreaks Forum</Link>
      </h1>
      <div className="flex gap-6">
        <Link className="hover:font-bold" href="/">
          Startseite
        </Link>
        <Link className="hover:font-bold" href="/thread/my-threads">
          Meine Themen
        </Link>
        <Link className="hover:font-bold" href="/thread/savedThreads">
          Gespeicherte Themen
        </Link>
        <Link className="hover:font-bold" href="/myProfile">
          Mein Profil
        </Link>

        <Link className="hover:font-bold" href="/users">
          Users
        </Link>
        {userRole === 'ADMIN' && (
          <Link className="hover:font-bold" href="/admin">
            Admin Dashboard
          </Link>
        )}
      </div>
      {session ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button asChild>
          <Link href="/login">Log in!</Link>
        </Button>
      )}
    </nav>
  )
}

export function MobileNavbar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
