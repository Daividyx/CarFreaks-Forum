import * as z from 'zod'

// Zod Schema, dass die Benutzeraingaben Validiert. Gibt entsprechende fehlermeldungen zurück wenn etwas nicht stimmt
//Vergleicht auch ob beide Passwörter gleich sind
export const createUserShema = z
  .object({
    name: z.string().trim().min(6, ' Der benutzername muss mindestens 6 Zeichen lang sein'),
    email: z.email('Bitte gib eine gültige Email Adresse ein'),
    password: z.string().refine(
      (val) => {
        return (
          val.length >= 8 &&
          /[A-Z]/.test(val) &&
          /[a-z]/.test(val) &&
          /[0-9]/.test(val) &&
          /[^A-Za-z0-9]/.test(val)
        )
      },
      {
        message:
          'Das Passwort muss mindestens 8 Zeichen lang sein und Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.',
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein.',
    path: ['confirmPassword'],
  })
