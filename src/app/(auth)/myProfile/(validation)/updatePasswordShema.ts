import z from 'zod'

export const updatePasswordShema = z
  .object({
    oldPassword: z.string().min(1, 'Bitte aktuelles Passwort eingeben'), // Pflichtfeld

    newPassword: z.string().refine(
      (val) =>
        val.length >= 8 &&
        /[A-Z]/.test(val) && // Mind. ein Großbuchstabe
        /[a-z]/.test(val) && // Mind. ein Kleinbuchstabe
        /[0-9]/.test(val) && // Mind. eine Zahl
        /[^A-Za-z0-9]/.test(val), // Mind. ein Sonderzeichen
      {
        message:
          'Das Passwort muss mindestens 8 Zeichen lang sein und Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.',
      }
    ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein.',
    path: ['confirmPassword'],
  })
