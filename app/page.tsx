import {
  Catalog,
  Contact,
  FAQ,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
  Services,
  Testimonials,
} from '@/components'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <HowItWorks />
        <Catalog />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
