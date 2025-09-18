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

            {/**
             * User Seite ausschließlich zu Testzwecken verwendet und in der Finalen Version auskommentiert
             * <Link className="hover:font-bold" href="/users">
              Users
            </Link>
            */}
            {userRole === 'ADMIN' && (
              <Link className="hover:font-bold" href="/admin">
                Admin Dashboard
              </Link>
            )}
          </div>
          {/** Buttons abhängig von User Status
           * Eingeloggt - "Starte ein Thema" & "Logout"
           * Nicht eingelloggt - "Einloggen" & Registrieren
           */}
          {session ? (
            <div className="flex gap-4">
              <Button
                asChild
                className="bg-amber-800 text-white hover:bg-amber-900 hover:font-bold"
              >
                <Link href="/thread/new">Starte ein Thema</Link>
              </Button>
              <Button className="bg-black text-white hover:font-bold" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                className="bg-amber-800 text-white hover:bg-amber-900 hover:font-bold"
                asChild
              >
                <Link href="/login">Log in!</Link>
              </Button>
              <Button className="bg-black text-white hover:font-bold" asChild>
                <Link href="/register">Registrieren!</Link>
              </Button>
            </div>
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

            <SheetContent side="left" className="w-70 bg-yellow-400">
              <SheetHeader className="text-center">
                <SheetTitle className="text-lg font-bold">CarFreaks Menü</SheetTitle>
              </SheetHeader>

              <nav className="mt-4 flex flex-col gap-3 p-4">
                <Link href="/" className="hover:font-bold">
                  Startseite
                </Link>
                <Link href="/my-threads" className="hover:font-bold">
                  Meine Themen
                </Link>
                <Link href=" /savedThreads" className="hover:font-bold">
                  Gespeicherte Themen
                </Link>
                <Link href="/myProfile" className="hover:font-bold">
                  Mein Profil
                </Link>
                {/**
             * User Seite ausschließlich zu Testzwecken verwendet und in der Finalen Version auskommentiert
             * <Link className="hover:font-bold" href="/users">
              Users
            </Link>
            */}
                {userRole === 'ADMIN' && (
                  <Link href="/admin" className="hover:font-bold">
                    Admin Dashboard
                  </Link>
                )}

                {/** Buttons abhängig von User Status
                 * Eingeloggt - "Starte ein Thema" & "Logout"
                 * Nicht eingelloggt - "Einloggen" & Registrieren
                 */}
                {session ? (
                  <div className="mt-10 flex flex-col gap-4">
                    <Button
                      asChild
                      className="bg-amber-800 text-white hover:bg-amber-900 hover:font-bold"
                    >
                      <Link href="/thread/new">Starte ein Thema</Link>
                    </Button>
                    <Button className="bg-black text-white hover:font-bold" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      className="bg-amber-800 text-white hover:bg-amber-900 hover:font-bold"
                      asChild
                    >
                      <Link href="/login">Log in!</Link>
                    </Button>
                    <Button className="bg-black text-white hover:font-bold" asChild>
                      <Link href="/register">Registrieren!</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
