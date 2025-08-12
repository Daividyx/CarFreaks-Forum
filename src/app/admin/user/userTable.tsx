'use client'
import deleteUser from '@/app/serverActions/deleteUser'
import promoteUser from '@/app/serverActions/promoteUser'
import { UserDropdownMenuButton } from '@/components/buttons/adminDropdownMenuButon'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMemo, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'

type User = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  createdAt: Date

  threadCount: number
  postCount: number
}
type Props = {
  users: User[]
}
// Tippfehler vermeiden
type SortKey = 'name' | 'email' | 'role' | 'createdAt' | 'threadCount' | 'postCount'
type Direction = 'asc' | 'desc'

export default function UserTable({ users }: Props) {
  // State für Sortierkriterium und Richtung
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [direction, setDirection] = useState<Direction>('desc')

  // Wird über einen Button in der Tabelle aufgerufen
  // column == Spaltenname
  // Setzt die Sortiervariable für die Sortierung auf den mitgegebenen Spaltennamen oder ändert die Richtung
  function toggleSort(column: SortKey) {
    if (sortBy !== column) {
      setSortBy(column)
      setDirection('asc')
    } else {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }
  }

  // Liefert je nach Sortierkriterium einen vergleichbaren Key
  function getComparableKey(u: User, col: SortKey): number | string {
    switch (col) {
      // Liefert Zeit in ms seiz 1970
      case 'createdAt':
        return Number(u.createdAt.getTime)
      // Liefert Wert oder 0
      case 'threadCount':
        return u[col] ?? 0
      case 'postCount':
        return u[col] ?? 0
      // Liefert Wert oder "" to LowerCase als String
      default:
        return (u[col] ?? '').toLowerCase()
    }
  }

  // Sortierung soll nur erneut berechnet werden, wenn sich einer von <<[users, sortBy,direction]>> ändert
  const sorted = useMemo(() => {
    // Array kopieren, damit das originale unverändert bleibt
    const copy = [...users]
    // Vergleicht 2 Paare a,b
    // Wenn negativ => a vor b
    // Wenn null => bleibt
    // wenn positiv => a nach b

    copy.sort((a, b) => {
      // vergleichbare Keys erhalten
      const aKey = getComparableKey(a, sortBy)
      const bKey = getComparableKey(b, sortBy)
      let result
      // Wenn String => Vergleichen mit Methode localCompare()
      if (typeof aKey === 'string' && typeof bKey === 'string') {
        result = aKey.localeCompare(bKey, 'de')
      }
      // Wenn Zahl => a-b
      else {
        result = Number(aKey) - Number(bKey)
      }
      // Je nach eingestellter Richtung Rückgabe negieren oder nicht
      if (direction === 'asc') {
        return result
      } else {
        return -result
      }
    })

    // Sortierte Kopie des Arrays zurückgeben. Wird in sortet gespeichert.
    return copy
  }, [users, sortBy, direction])

  function SortButton(column: SortKey, label?: string) {
    const active = sortBy === column
    const rotation = active && direction === 'desc' ? 'rotate-180' : 'rotate-0'
    const opacity = active ? 'opacity-100' : 'opacity-40'

    return (
      <Button
        variant="ghost"
        className="flex items-center gap-1 px-0"
        onClick={() => toggleSort(column)}
        aria-pressed={active}
        title={active ? (direction === 'asc' ? 'Aufsteigend' : 'Absteigend') : 'Sortieren'}
      >
        {label ?? column}
        <FaArrowUp
          className={`ml-1 h-4 w-4 transition-transform ${rotation} ${opacity}`}
          aria-hidden
        />
      </Button>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{SortButton('name', 'Name')}</TableHead>
          <TableHead>{SortButton('email', 'E-mail')}</TableHead>
          <TableHead>{SortButton('role', 'Rolle')}</TableHead>
          <TableHead>{SortButton('createdAt', 'Mitglied seit')}</TableHead>
          <TableHead className="w-[10px]">{SortButton('threadCount', 'Themen')}</TableHead>
          <TableHead>{SortButton('postCount', 'Beiträge')}</TableHead>
          <TableHead>Optionen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">{user.role}</TableCell>
            <TableCell className="text-center">
              {user.createdAt.toLocaleDateString('de-DE')}
            </TableCell>

            <TableCell className="text-center">{user.threadCount}</TableCell>
            <TableCell className="text-center">{user.postCount}</TableCell>
            <TableCell>
              <UserDropdownMenuButton userId={user.id}></UserDropdownMenuButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
