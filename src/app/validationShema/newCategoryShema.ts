import z from 'zod'

export const NewCategoryShema = z.object({
  name: z.string().trim().nonempty('Name muss vergeben werden'),

  slug: z.string().nonempty(),
  description: z.string().nonempty('Beschreibung muss vergeben werden'),
})
