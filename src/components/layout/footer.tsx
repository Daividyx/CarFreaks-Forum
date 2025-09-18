'use client'

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-yellow-400 py-10 text-gray-700">
      <div className="container mx-auto flex flex-col justify-between gap-12 px-6 md:flex-row md:px-12">
        {/* Links */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-amber-800">CarFreaks Forum</h2>
          <p className="mt-2 text-sm text-gray-600">
            Musterstraße 12
            <br />
            12345 Musterstadt
            <br />
            Deutschland
          </p>
        </div>

        {/* Mitte */}
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-xl font-bold text-amber-800">Rechtliches</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <Link href="/impressum" className="hover:font-bold">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:font-bold">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link href="/agb" className="hover:font-bold">
                AGB
              </Link>
            </li>
          </ul>
        </div>

        {/* Rechts */}
        <div className="flex flex-col items-center md:items-end">
          <h2 className="text-xl font-bold text-amber-800">Folge uns</h2>
          <div className="mt-4 flex gap-4">
            <Link
              href="https://www.facebook.com"
              className="hover:text-amber-800"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              className="hover:text-amber-800"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </Link>
            <Link href="https://x.com/" className="hover:text-amber-800" aria-label="Twitter">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
