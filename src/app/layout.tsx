import { Navbar } from '@/components/navbar'
import './globals.css'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <>
        <body>
          <div className="w-full bg-gray-100 h-full">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </>
    </html>
  )
}
