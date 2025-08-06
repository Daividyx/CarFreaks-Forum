import { Navbar } from '@/components/navbar'
import './globals.css'
import Footer from '@/components/footer'
import SessionInfo from './_components/sessionInfo'
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
