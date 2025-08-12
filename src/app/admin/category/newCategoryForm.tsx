'use client'

import createCategory from '@/app/serverActions/createCategory'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'

export default function NewCategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategory, undefined)
  const [slug, setSlug] = useState('')

  function generateSlug(name: string) {
    setSlug(name.toLowerCase().trim())
  }

  return (
    <div>
      <form action={formAction} className="space-y-2">
        <div>
          <Label className="p-2">Name</Label>
          <Input name="name" onChange={(e) => generateSlug(e.target.value)}></Input>
          {state?.errors.name && <p className="text-destructive">{state.errors.name}</p>}
        </div>
        <div className="hidden">
          <Label className="p-2">Slug</Label>
          <Input name="slug" value={slug} readOnly></Input>
        </div>
        <div>
          <Label className="p-2">Beschreibung</Label>
          <Input name="description"></Input>
          {state?.errors.description && (
            <p className="text-destructive">{state.errors.description}</p>
          )}
        </div>
        <div>
          <Button className="p-2" type="submit">
            Kategorie erstellen
          </Button>
        </div>
      </form>
    </div>
  )
}
