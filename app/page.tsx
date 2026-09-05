import {
  Bags,
  Catalog,
  Contact,
  FAQ,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Services,
} from "@/components";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowItWorks />
        <Catalog />
        <Bags />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
