'use client'
import { UserDropdownMenuButton } from '@/components/buttons/adminDropdownMenuButon'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMemo, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

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

// Mögliche Sortierschlüssel
type SortKey = 'name' | 'email' | 'role' | 'createdAt' | 'threadCount' | 'postCount'
type Direction = 'asc' | 'desc'

export default function UserTable({ users }: Props) {
  // State für Sortierspalte und Richtung
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [direction, setDirection] = useState<Direction>('desc')

  // Umschalten der Sortierung
  function toggleSort(column: SortKey) {
    if (sortBy !== column) {
      setSortBy(column)
      setDirection('asc')
    } else {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    }
  }

  // Liefert einen vergleichbaren Wert je nach Spalte
  function getComparableKey(u: User, col: SortKey): number | string {
    switch (col) {
      case 'createdAt':
        // Korrektur: getTime() aufrufen, nicht die Funktion selbst zurückgeben
        return u.createdAt.getTime()
      case 'threadCount':
        return u[col] ?? 0
      case 'postCount':
        return u[col] ?? 0
      default:
        return (u[col] ?? '').toLowerCase()
    }
  }

  // Sortierung nur neu berechnen, wenn Abhängigkeiten sich ändern
  const sorted = useMemo(() => {
    const copy = [...users]

    copy.sort((a, b) => {
      const aKey = getComparableKey(a, sortBy)
      const bKey = getComparableKey(b, sortBy)

      let result
      if (typeof aKey === 'string' && typeof bKey === 'string') {
        result = aKey.localeCompare(bKey, 'de')
      } else {
        result = Number(aKey) - Number(bKey)
      }

      return direction === 'asc' ? result : -result
    })

    return copy
  }, [users, sortBy, direction])

  // Button für sortierbare Spalten
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
              <UserDropdownMenuButton userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
