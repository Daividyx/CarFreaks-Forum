import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Hero() {
  // Aktuelle Session abrufen
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-10 px-4 lg:flex-row">
        {/* Textbereich mit Überschrift, Beschreibung und Buttons */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold text-amber-800 md:text-5xl">
            Willkommen im CarFreaks Forum
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Diskutiere mit anderen Auto-Enthusiasten über Technik, Tuning, Kaufberatung & mehr. Ganz
            egal ob Neuling oder Profi – hier bist du richtig!
          </p>

          {/* Sessionabhängige Anzeige */}
          {session ? (
            // Wenn Nutzer eingeloggt ist → Button zum Erstellen eines neuen Threads
            <div className="mt-8 flex flex-col items-center">
              <h1 className="text-lg font-bold">
                Beginne eine Diskussion, stelle eine Frage oder erzähl einfach einen Witz.
              </h1>
              <Link href={'/thread/new'}>
                <Button className="bg-amber-800 text-white hover:bg-amber-900 hover:font-bold">
                  Starte ein Thema
                </Button>
              </Link>
            </div>
          ) : (
            // Wenn Nutzer nicht eingeloggt ist → Buttons zum Login oder zur Registrierung
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

        {/* Bildbereich mit Quelle */}
        <div className="hidden flex-shrink-0 md:block">
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
