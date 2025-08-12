// app/admin/users/[id]/threads/page.tsx
import Link from 'next/link'
import { prisma } from '@/database/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React from 'react'
import { ThreadDropdownMenuButton } from '@/components/buttons/adminDropdownMenuButon'
type Props = {
  params: {
    id: string
  }
}
export default async function UserThreadsPage({ params }: Props) {
  const { id } = await params
  const threads = await prisma.thread.findMany({
    where: { authorId: id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: { select: { posts: true } },
    },

    orderBy: { createdAt: 'desc' },
  })

  if (!threads.length) {
    return (
      <div className="text-muted-foreground rounded-lg border p-6 text-center">Keine Threads.</div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-md font-semibold tracking-wider text-amber-800 uppercase">Admin</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Themen</h1>
        <div className="border-border/60 mt-3 border-t" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titel</TableHead>
            <TableHead>Beiträge</TableHead>
            <TableHead>Erstellt am</TableHead>
            <TableHead className="text-right">Optionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {threads.map((thread) => (
            <TableRow key={thread.id}>
              <TableCell className="max-w-[480px] break-words whitespace-normal">
                <Link href={`/thread/${thread.id}`} className="hover:underline">
                  {thread.title}
                </Link>
              </TableCell>
              <TableCell className="text-center">{thread._count.posts}</TableCell>
              <TableCell className="text-center">
                {thread.createdAt.toLocaleDateString('de-DE')}
              </TableCell>
              <TableCell className="text-right">
                <ThreadDropdownMenuButton threadId={thread.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
