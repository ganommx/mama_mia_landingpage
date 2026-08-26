import type { Metadata } from "next";

import { Footer, Navbar, SectionTitle } from "@/components";
import { CatalogoContent } from "./CatalogoContent";

export const metadata: Metadata = {
  title: "Catálogo completo",
  description:
    "Explora nuestra colección completa de vestidos para graduaciones, bodas, XV años y noches especiales.",
};

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="bg-brand-soft px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              description="Explora todos nuestros vestidos disponibles para renta y venta. Encuentra la pieza perfecta para tu ocasión especial."
              eyebrow="Nuestra colección"
              title="Catálogo completo"
            />
            <CatalogoContent />
            <p className="mt-10 text-center text-sm text-brand-secondary/55">
              Los precios mostrados corresponden únicamente a la renta de los
              vestidos. Para consultar el precio de venta y disponibilidad,
              contáctanos por WhatsApp.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
