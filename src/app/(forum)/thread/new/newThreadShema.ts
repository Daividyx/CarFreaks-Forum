import { z } from 'zod'

// Zod-Schema für das Erstellen eines neuen Threads
export const CreateThreadSchema = z.object({
  // Titel des Threads:
  // - mindestens 3 Zeichen
  // - maximal 1000 Zeichen
  // - individuelle Fehlermeldungen bei Verstoß
  title: z
    .string()
    .min(3, 'Titel muss mindestens 3 Zeichen haben')
    .max(1000, 'Titel darf maximal 1000 Zeichen haben'),

  // Text des Beitrags:
  // - mindestens 10 Zeichen
  text: z.string().min(10, 'Beitrag muss mindestens 10 Zeichen haben'),

  // Kategorie-ID:
  // - darf nicht leer sein
  categoryId: z.string().nonempty('Kategorie ist erforderlich'),
})
