// app/agb/page.tsx
export default function AgbPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Rechtliches</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className="text-muted-foreground text-base">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>
        <div className="border-b border-amber-200/70 pt-2" />
      </div>

      {/* Inhalt */}
      <div className="space-y-10 leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung des CarFreaks
            Forums. Mit der Registrierung und Nutzung der Plattform akzeptierst du diese
            Bedingungen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">
            2. Registrierung und Nutzerkonto
          </h2>
          <p>
            Um Beiträge im Forum zu erstellen, ist eine kostenlose Registrierung erforderlich. Jeder
            Nutzer ist verpflichtet, seine Zugangsdaten vertraulich zu behandeln und keine falschen
            Angaben zu machen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">
            3. Inhalte und Verhalten im Forum
          </h2>
          <p>
            Nutzer verpflichten sich, respektvoll miteinander umzugehen und keine Inhalte zu posten,
            die gegen geltendes Recht, Urheberrechte oder die guten Sitten verstoßen. Beleidigungen,
            Spam oder Werbung sind untersagt.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">4. Haftung</h2>
          <p>
            Die Betreiber übernehmen keine Haftung für von Nutzern erstellte Inhalte. Jeder Nutzer
            ist für seine eigenen Beiträge verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">5. Änderungen der AGB</h2>
          <p>
            Die Betreiber behalten sich vor, diese AGB jederzeit zu ändern. Änderungen werden
            rechtzeitig im Forum bekanntgegeben.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">6. Schlussbestimmungen</h2>
          <p>
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der
            übrigen Bestimmungen unberührt.
          </p>
        </section>
      </div>
    </div>
  )
}
