import Link from 'next/link'
import { Button } from './ui/button'

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
  return (
    <nav className="w-full bg-yellow-400">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 p-4">
          <h1 className="text-2xl font-bold text-amber-800">
            <Link href="/">Forum</Link>
          </h1>
          <div className="flex gap-6">
            <Link className="hover:font-bold" href="/">
              Startseite
            </Link>
            <Link className="hover:font-bold" href="/category">
              Kategorien
            </Link>
            <Link className="hover:font-bold" href="/myProfile">
              Mein Profil
            </Link>
            <Link className="hover:font-bold" href="/admin">
              ADMIN
            </Link>
          </div>
          <Button asChild>
            <Link href="/post/new">Log in!</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
