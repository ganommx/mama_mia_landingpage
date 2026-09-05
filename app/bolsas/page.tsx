import type { Metadata } from "next";

import { Footer, Navbar, ScrollToTopButton, SectionTitle } from "@/components";
import { BagsContent } from "@/components/sections/Bags";

export const metadata: Metadata = {
  title: "Bolsas",
  description:
    "Explora nuestra selección de bolsas elegantes para complementar tu look y darle el toque final a tu evento.",
};

export default function BolsasPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="bg-white px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28"
          id="bolsas"
        >
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              description="Además de nuestros vestidos, contamos con una selección de bolsas ideales para complementar tu look y darle el toque final a tu evento."
              eyebrow="Nuestra colección"
              title="Bolsas para completar tu ocasión"
            />
            <div className="mt-10 sm:mt-12">
              <BagsContent />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton targetId="bolsas" />
    </>
  );
}