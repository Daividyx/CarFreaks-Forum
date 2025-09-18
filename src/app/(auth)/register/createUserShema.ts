import * as z from 'zod'

// Schema zur Validierung der Nutzereingaben beim Erstellen eines Users
export const createUserShema = z
  .object({
    // Benutzername: mindestens 4 Zeichen, führende/trailing Spaces werden entfernt
    name: z.string().trim().min(4, ' Der benutzername muss mindestens 4 Zeichen lang sein'),

    // E-Mail: muss eine gültige Adresse sein
    email: z.email('Bitte gib eine gültige Email Adresse ein'),

    // Passwort: individuelle Prüfung mit refine → Regeln für Sicherheit
    password: z.string().refine(
      (val) => {
        return (
          val.length >= 8 && // mindestens 8 Zeichen
          /[A-Z]/.test(val) && // mindestens 1 Großbuchstabe
          /[a-z]/.test(val) && // mindestens 1 Kleinbuchstabe
          /[0-9]/.test(val) && // mindestens 1 Zahl
          /[^A-Za-z0-9]/.test(val) // mindestens 1 Sonderzeichen
        )
      },
      {
        message:
          'Das Passwort muss mindestens 8 Zeichen lang sein und Großbuchstaben, Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.',
      }
    ),

    // Bestätigungspasswort: wird nur zum Abgleich gebraucht
    confirmPassword: z.string(),
  })

  // Validierung: Passwort und Passwort-Bestätigung müssen übereinstimmen
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein.',
    path: ['confirmPassword'], // Fehler wird an confirmPassword gebunden
  })
