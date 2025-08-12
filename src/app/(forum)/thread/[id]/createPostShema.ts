import z from 'zod'

export const CreatePostShema = z.object({
  content: z
    .string()
    .min(1, 'Ihre Antwort muss mindestens 1 Zeichen lang sein')
    .max(1000, 'Ihre Antwort darf maximal 100 Zeichen lang sein'),
  threadId: z.string(),
})
