import z from 'zod'

export const updateEmailShema = z.object({
  email: z.email('Bitte geben Sie eine gültige Email Adresse ein'),
})
