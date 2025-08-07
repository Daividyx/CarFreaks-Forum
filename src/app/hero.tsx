import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Hero() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-10 px-4 lg:flex-row">
        {/* Textbereich */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold text-amber-800 md:text-5xl">
            Willkommen im CarFreaks Forum
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Diskutiere mit anderen Auto-Enthusiasten über Technik, Tuning, Kaufberatung & mehr. Ganz
            egal ob Neuling oder Profi – hier bist du richtig!
          </p>
          {!session && (
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild className="bg-amber-800 text-white hover:bg-amber-900">
                <Link href="/login">Einloggen</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="bg-yellow-400 text-amber-800 hover:bg-yellow-300"
              >
                <Link href="/register">Jetzt registrieren</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Bildbereich */}
        <div className="flex-shrink-0">
          <img
            src="Hero.jpg"
            alt="Sportwagen Illustration"
            className="mx-auto w-full max-w-sm rounded-2xl"
          />
          <p className="py-2 text-gray-600 hover:font-bold">
            Quelle: Foto von{' '}
            <Link href="https://unsplash.com/de/@higashino_se?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Haidong Liang
            </Link>{' '}
            auf{' '}
            <Link href="https://unsplash.com/de/fotos/schwarzer-porsche-911-tagsuber-auf-feldweg-geparkt-1keMi3aD1gg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
              Unsplash
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
