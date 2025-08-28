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
import { Menu } from 'lucide-react'

export function Navbar() {
  const { data: session } = authClient.useSession()
  const router = useRouter()
  const userRole = session?.user.role

  async function handleLogout() {
    await authClient.signOut()
    router.push('/')
  }

  return (
    <nav className="hidden w-full bg-yellow-400 md:block">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 p-4">
          <h1 className="text-2xl font-bold text-amber-800">
            <Link href="/">CarFreaks Forum</Link>
          </h1>

          <div className="flex gap-6">
            <Link className="hover:font-bold" href="/">
              Startseite
            </Link>
            <Link className="hover:font-bold" href="/my-threads">
              Meine Themen
            </Link>
            <Link className="hover:font-bold" href="/savedThreads">
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
        </div>
      </div>
    </nav>
  )
}

export function MobileNavbar() {
  const { data: session } = authClient.useSession()
  const userRole = session?.user.role
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut()
    router.push('/')
  }
  return (
    <div className="block w-full bg-yellow-400 md:hidden">
      <div className="container mx-auto">
        <div className="mx-6 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-amber-800">Carfreaks Forum</h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menü öffnen">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-60 bg-yellow-400">
              <SheetHeader className="text-center">
                <SheetTitle className="text-lg">CarFreaks Menü</SheetTitle>
              </SheetHeader>

              <nav className="mt-4 flex flex-col gap-3 p-4">
                <Link href="/" className="hover:font-bold">
                  Startseite
                </Link>
                <Link href="/thread/my-threads" className="hover:font-bold">
                  Meine Themen
                </Link>
                <Link href="/thread/savedThreads" className="hover:font-bold">
                  Gespeicherte Themen
                </Link>
                <Link href="/myProfile" className="hover:font-bold">
                  Mein Profil
                </Link>
                <Link href="/users" className="hover:font-bold">
                  Users
                </Link>
                {userRole === 'ADMIN' && (
                  <Link href="/admin" className="hover:font-bold">
                    Admin Dashboard
                  </Link>
                )}
              </nav>

              {session ? (
                <Button className="ml-20 w-20" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" asChild className="flex-1">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/register">Registrieren</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
