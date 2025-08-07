import z from 'zod'

export const updateNameShema = z.object({
  name: z.string().min(5, 'Der Name muss mindestens 5 Zeichen lang sein'),
})
