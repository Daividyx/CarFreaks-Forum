import { prisma } from '@/database/prisma'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

{
  /** Darüber importe */
}
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  advanced: {
    ipAddress: {
      disableIpTracking: true,
    },
  },
  emailAndPassword: {
    //Registrierung mit Email und Passwort
    enabled: true,
  },
  user: {
    changeEmail: {
      //Nutzer dürfen ihre Email-adresse ändern
      enabled: true,
    },
    additionalFields: {
      //Rolle eines Benutzers mit in die Session aufnehmen
      role: {
        type: 'string',
        input: false,
      },
    },
  },
})
