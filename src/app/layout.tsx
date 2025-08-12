// Datei: RootLayout.tsx
// Globales Layout der Anwendung: Enthält Navbar, SessionInfo, Seiteninhalt und Footer.
// Wird von Next.js als zentrales Layout für alle Seiten verwendet.

import { MobileNavbar, Navbar } from '@/components/layout/navbar'
import './globals.css' // Globale CSS-Styles
import Footer from '@/components/layout/footer'
import SessionInfo from './sessionInfo'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-100">
        <Navbar /> {/* Navigation oben */}
        <MobileNavbar></MobileNavbar>
        <SessionInfo /> {/* Anzeige Login-Status */}
        <div className="max-h-screen flex-1 overflow-y-auto">{children}</div> {/* Hauptinhalt */}
        <Footer /> {/* Footer unten */}
      </body>
    </html>
  )
}
