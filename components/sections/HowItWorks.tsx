import { PROCESS_STEPS } from '@/constants/services'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const HowItWorks = () => (
  <section className="bg-brand-secondary px-5 py-20 sm:px-8 sm:py-28" id="como-funciona">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        description="Cuatro pasos simples entre tú y el vestido que estabas buscando."
        eyebrow="Así de fácil"
        light
        title="Tu look listo, sin complicaciones"
      />
      <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map(({ description, number, title }, index) => (
          <li className="relative border-t border-white/15 pt-7" key={number}>
            <span className="font-display text-5xl text-brand-primary/55">{number}</span>
            <h3 className="mt-5 font-display text-2xl text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{description}</p>
            {index < PROCESS_STEPS.length - 1 && (
              <span aria-hidden="true" className="absolute -right-4 top-6 hidden text-brand-primary/50 lg:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  </section>
)
