import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

/*
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";*/

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mamamialuxury.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  title: {
    default: "Renta de Vestidos en Zamora | Mamá Mía Luxury Dresses",
    template: "%s | Mamá Mía",
  },
  description:
    "Renta y venta de vestidos de fiesta en Zamora de Hidalgo, Michoacán. Encuentra vestidos para eventos y ocasiones especiales, además de bolsas y asesoría personalizada.",
  keywords: [
    "renta de vestidos en Zamora",
    "vestidos de fiesta en Zamora",
    "vestidos para eventos en Zamora",
    "vestidos de noche en Zamora",
    "venta de vestidos en Zamora",
    "bolsas para fiesta en Zamora",
  ],
  authors: [{ name: "Ganom" }],
  creator: "Ganom",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "MamaMía",
    title: "Renta de Vestidos en Zamora | Mamá Mía Luxury Dresses",
    description:
      "Renta y venta de vestidos de fiesta en Zamora de Hidalgo, Michoacán. Encuentra vestidos para eventos y ocasiones especiales, además de bolsas y asesoría personalizada.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mama Mía Luxury Dresses — Renta y venta de vestidos en Zamora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MamaMia — Renta y Venta de Vestidos",
    description: "Encuentra el vestido ideal para tu momento especial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfairDisplay.variable}`}
      >
        <a
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-brand-secondary px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
          href="#main-content"
        >
          Saltar al contenido
        </a>
        {children}
        <LocalBusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
