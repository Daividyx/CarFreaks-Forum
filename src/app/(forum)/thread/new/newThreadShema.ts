import { z } from 'zod'

export const CreateThreadSchema = z.object({
  title: z
    .string()
    .min(3, 'Titel muss mindestens 3 Zeichen haben')
    .max(1000, 'Titel darf maximal 100 Zeichen haben'),
  text: z.string().min(10, 'Beitrag muss mindestens 10 Zeichen haben'),
  categoryId: z.string().nonempty('Kategorie ist erforderlich'),
})
