import { MobileNavbar, Navbar } from '@/components/layout/navbar'
import './globals.css' // Globale CSS-Styles
import Footer from '@/components/layout/footer'
import SessionInfo from '../components/sessionInfo'

{
  /* Hier darüber diverse Importe*/
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-100">
        {' '}
        {/* Globale Stylings inkl. Hintergrundfarbe*/}
        <Navbar /> {/* Navigation oben */}
        <MobileNavbar></MobileNavbar> {/* Navigation auf kleinen Geräten oben */}
        {/**<SessionInfo /> {/* Anzeige Login-Status */}
        <div className="max-h-screen flex-1 overflow-y-auto">{children}</div> {/* Hauptinhalt */}
        <Footer /> {/* Footer unten */}
      </body>
    </html>
  )
}
