import { HeartHandshake, ShoppingBag, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { SERVICES } from '@/constants/services'
import { ServiceIcon } from '@/types'
import { SectionTitle } from '@/components/ui/SectionTitle'

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  [ServiceIcon.SPARKLES]: Sparkles,
  [ServiceIcon.SHOPPING_BAG]: ShoppingBag,
  [ServiceIcon.HEART_HANDSHAKE]: HeartHandshake,
}

export const Services = () => (
  <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" id="servicios">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        description="Más que un vestido: una experiencia cuidada de principio a fin."
        eyebrow="Lo que hacemos"
        title="Todo para hacerte sentir única"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SERVICES.map(({ description, icon, title }) => {
          const Icon = SERVICE_ICONS[icon]

          return (
            <article
              className="group rounded-3xl border border-brand-secondary/10 bg-brand-soft/50 p-8 transition-transform duration-300 hover:-translate-y-1"
              key={title}
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary">
                <Icon aria-hidden="true" size={25} />
              </div>
              <h3 className="mt-6 font-display text-2xl text-brand-secondary">{title}</h3>
              <p className="mt-3 leading-7 text-brand-secondary/60">{description}</p>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)
