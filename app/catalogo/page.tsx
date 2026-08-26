import type { Metadata } from "next";

import { DRESSES } from "@/constants/services";
import { DressCard, Footer, Navbar, SectionTitle } from "@/components";

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
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {DRESSES.map((dress) => (
                <DressCard key={dress.id} {...dress} />
              ))}
            </div>
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
