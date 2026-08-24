import Image from 'next/image'
import { Quote, Star } from 'lucide-react'

import { TESTIMONIALS } from '@/constants/testimonials'
import { SectionTitle } from '@/components/ui/SectionTitle'

export const Testimonials = () => (
  <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" id="testimonios">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        description="La confianza de nuestras clientas es la mejor parte de cada historia."
        eyebrow="Ellas ya vivieron la experiencia"
        title="Momentos que dejaron huella"
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map(({ id, imageUrl, name, occasion, quote, rating }) => (
          <figure className="relative rounded-3xl border border-brand-secondary/10 p-7" key={id}>
            <Quote aria-hidden="true" className="absolute right-7 top-7 text-brand-primary/25" size={36} />
            <div aria-label={`${rating} de 5 estrellas`} className="flex gap-1 text-brand-primary">
              {Array.from({ length: rating }, (_, index) => (
                <Star aria-hidden="true" fill="currentColor" key={index} size={16} />
              ))}
            </div>
            <blockquote className="mt-5 leading-7 text-brand-secondary/70">
              “{quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-brand-secondary/10 pt-5">
              <Image
                alt={`Retrato de ${name}, clienta de MamaMia`}
                className="size-11 rounded-full object-cover"
                height={44}
                src={imageUrl}
                width={44}
              />
              <div>
                <p className="font-semibold text-brand-secondary">{name}</p>
                <p className="text-xs text-brand-secondary/50">{occasion}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
)
