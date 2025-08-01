'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export default function NewThreadPage() {
  // State für Formular
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // TODO: Kategorien später aus DB laden
  const categories = [
    { id: 1, name: 'Kaufberatung' },
    { id: 2, name: 'Tuning & Umbauten' },
    { id: 3, name: 'Off-Topic' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ category, title, content })
    // Hier später Server Action für Thread-Erstellung
  }

  return (
    <div className="mx-auto max-w-2xl py-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800">
            Neuen Thread erstellen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Kategorie-Auswahl */}
            <div className="space-y-2">
              <Label>Kategorie auswählen</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Titel */}
            <div className="space-y-2">
              <Label>Titel</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel deines Threads"
              />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <Label>Beitrag</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Schreibe hier deinen Beitrag..."
                rows={8}
              />
            </div>

            {/* Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full bg-amber-800 text-white hover:bg-amber-900">
                Thread erstellen
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
