// app/datenschutz/page.tsx
export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 p-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Rechtliches</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-800">
          Datenschutzerklärung
        </h1>
        <p className="text-muted-foreground text-base">
          Stand: {new Date().toLocaleDateString('de-DE')}
        </p>
        <div className="border-b border-amber-200/70 pt-2" />
      </div>

      {/* Inhalt */}
      <div className="space-y-10 leading-relaxed text-gray-700">
        {/* 1 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">1. Allgemeine Hinweise</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir verarbeiten
            personenbezogene Daten ausschließlich im Rahmen der gesetzlichen Bestimmungen (DSGVO,
            BDSG). Mit dieser Erklärung informieren wir Sie über Art, Umfang und Zweck der Erhebung
            und Verarbeitung personenbezogener Daten im CarFreaks Forum.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">2. Verantwortliche Stelle</h2>
          <p>
            CarFreaks Forum
            <br />
            Musterstraße 12
            <br />
            12345 Musterstadt
            <br />
            Deutschland
            <br />
            E-Mail: datenschutz@carfreaks-forum.de
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">
            3. Welche Daten wir verarbeiten
          </h2>
          <p>Wir verarbeiten im Rahmen des Betriebs des Forums insbesondere:</p>
          <ul className="ml-6 list-disc">
            <li>Registrierungsdaten (Name, E-Mail-Adresse, Passwort in verschlüsselter Form)</li>
            <li>Profildaten (z. B. Benutzername, Rolle)</li>
            <li>Foreninhalte (Threads, Beiträge, Kommentare)</li>
            <li>Systemdaten (Zeitpunkt der Registrierung, Logins, ggf. IP-Adresse)</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">4. Cookies</h2>
          <p>
            Das Forum verwendet ausschließlich technisch notwendige Cookies. Diese sind
            erforderlich, um den Login-Status (Session-Cookie von BetterAuth) aufrechtzuerhalten und
            damit die Nutzung des Forums zu ermöglichen. Eine Nutzung des Forums ohne diese Cookies
            ist nicht möglich. Weitere Cookies (z. B. zu Analyse- oder Werbezwecken) werden nicht
            gesetzt.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">
            5. Rechtsgrundlage der Verarbeitung
          </h2>
          <p>
            Die Verarbeitung personenbezogener Daten im CarFreaks Forum erfolgt auf Grundlage von
            Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung, Bereitstellung der Plattform) sowie Art.
            6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und funktionsfähigen Betrieb
            des Forums).
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">6. Speicherdauer</h2>
          <p>
            Ihre personenbezogenen Daten werden solange gespeichert, wie es für die Nutzung des
            Forums erforderlich ist. Beiträge und Inhalte bleiben grundsätzlich bestehen, es sei
            denn, Sie machen von Ihrem Recht auf Löschung Gebrauch.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">7. Ihre Rechte</h2>
          <p>Sie haben nach DSGVO das Recht auf:</p>
          <ul className="ml-6 list-disc">
            <li>Auskunft über die von uns gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten („Recht auf Vergessenwerden“)</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Widerspruch gegen die Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>
          <p className="mt-2">
            Hierzu können Sie uns jederzeit über die im Impressum angegebenen Kontaktdaten
            erreichen.
          </p>
        </section>
      </div>
    </div>
  )
}
