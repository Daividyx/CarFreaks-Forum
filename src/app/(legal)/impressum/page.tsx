// app/impressum/page.tsx
export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Rechtliches</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">Impressum</h1>
        <p className="text-muted-foreground text-base">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>
        <div className="border-b border-amber-200/70 pt-2" />
      </div>

      {/* Inhalt */}
      <div className="space-y-10 leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Angaben gemäß § 5 TMG</h2>
          <p>
            CarFreaks Forum
            <br />
            Musterstraße 12
            <br />
            12345 Musterstadt
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Kontakt</h2>
          <p>
            Telefon: +49 (0) 123 456789
            <br />
            E-Mail: info@carfreaks-forum.de
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Vertreten durch</h2>
          <p>
            Max Mustermann
            <br />
            (Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV)
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Haftung für Inhalte</h2>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
            Betreiber der Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
          </p>
        </section>
      </div>
    </div>
  )
}
