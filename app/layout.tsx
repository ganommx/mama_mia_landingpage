import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mamamia.example.com'),
  title: {
    default: 'MamaMia — Renta y Venta de Vestidos',
    template: '%s | MamaMia',
  },
  description:
    'Vestidos de noche, quinceañera, graduación y boda en renta y venta, con asesoría personalizada.',
  keywords: [
    'renta de vestidos',
    'vestidos de noche',
    'vestidos de quinceañera',
    'vestidos de graduación',
    'venta de vestidos',
  ],
  authors: [{ name: 'Ganom' }],
  creator: 'Ganom',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'MamaMia',
    title: 'MamaMia — El vestido perfecto para tu momento especial',
    description: 'Renta y venta de vestidos con asesoría personalizada para cada ocasión.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Colección de vestidos MamaMia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MamaMia — Renta y Venta de Vestidos',
    description: 'Encuentra el vestido ideal para tu momento especial.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfairDisplay.variable}`}>
        <a
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brand-secondary px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  )
}
