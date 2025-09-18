import z from 'zod'

// Zod-Schema zur Validierung neuer Posts
export const CreatePostShema = z.object({
  // Inhalt des Posts:
  // - darf nicht leer sein (min. 1 Zeichen)
  // - maximal 1000 Zeichen
  content: z
    .string()
    .min(1, 'Ihre Antwort muss mindestens 1 Zeichen lang sein')
    .max(1000, 'Ihre Antwort darf maximal 1000 Zeichen lang sein'),

  // Zugehöriger Thread (ID als String)
  threadId: z.string(),
})
