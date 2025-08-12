'use client'

import { useActionState, useState } from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import CreateThread from '@/app/(forum)/thread/new/createThread'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type category = {
  id: string
  name: string
  slug: string
  description: string
}
type NewThreadProp = {
  categories: category[]
}

export default function NewThreadForm({ categories }: NewThreadProp) {
  const [state, formAction, isPending] = useActionState(CreateThread, undefined)
  const [selected, setSelected] = useState('')

  return (
    <div className="mx-auto max-w-2xl py-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800">
            Neuen Thread erstellen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Kategorie-Auswahl */}
            <div className="space-y-2">
              <Label>Kategorie auswählen</Label>
              <Select onValueChange={(value) => setSelected(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state?.fieldErrors?.categoryId && (
                <p className="text-destructive">{state?.fieldErrors?.categoryId}</p>
              )}
            </div>

            {/* HiddenInput für selected Category */}
            <div className="space-y-2">
              <Input name="categoryId" value={selected} hidden />
            </div>

            {/* Titel */}
            <div className="space-y-2">
              <Label>Titel</Label>
              <Input name="title" placeholder="Titel deines Threads" />
              {state?.fieldErrors?.title && (
                <p className="text-destructive">{state?.fieldErrors?.title}</p>
              )}
            </div>

            {/* Text */}
            <div className="space-y-2">
              <Label>Beitrag</Label>
              <Textarea name="text" placeholder="Schreibe hier deinen Beitrag..." rows={8} />
              {state?.fieldErrors?.text && (
                <p className="text-destructive">{state?.fieldErrors?.text}</p>
              )}
            </div>

            {/* Button */}
            <div className="pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-amber-800 text-white hover:bg-amber-900"
              >
                Thread erstellen
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
