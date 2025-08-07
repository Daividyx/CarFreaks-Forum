/**
 *
 * Globales Layout der Anwendung
 * Definiert die Struktur, die auf allen Seiten sichtbar ist
 * Beinhaltet z. B. Navigation, Footer und globale Styles
 *
 */

import { Navbar } from '@/components/layout/navbar'
import './globals.css'
import Footer from '@/components/layout/footer'
import SessionInfo from './sessionInfo'
import { auth } from '@/lib/auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <>
        <body>
          <div className="h-full w-full bg-gray-100">
            <Navbar />
            <SessionInfo></SessionInfo>
            {children}
            <Footer />
          </div>
        </body>
      </>
    </html>
  )
}
