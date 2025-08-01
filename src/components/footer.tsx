'use client'

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-yellow-400 text-gray-700 py-10 mt-12 border-t">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-amber-800">Folge uns</h2>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="hover:text-amber-800" aria-label="Facebook">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-amber-800" aria-label="Instagram">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-amber-800" aria-label="Twitter">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
