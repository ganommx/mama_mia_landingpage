"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

import { DRESSES } from "@/constants/services";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { formatCurrency } from "@/lib/utils";
import type { DressCardProps } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionTitle } from "@/components/ui/SectionTitle";

const HOMEPAGE_DRESS_LIMIT = 6;

export const DressCard = ({
  id,
  name,
  price,
  sizes,
  color,
  imageUrl,
  isAvailable,
  colorHex,
}: DressCardProps) => {
  const { generateWhatsAppLink } = useWhatsApp();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const message = `Hola, me interesa el vestido ${name} (${id}). ¿Está disponible para mi fecha? También me gustaría conocer su precio de venta.`;

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-soft">
      <button
        className="relative block aspect-[4/5] w-full overflow-hidden bg-brand-accent"
        onClick={() => setIsLightboxOpen(true)}
        type="button"
      >
        <Image
          alt={`Vestido ${name} en color ${color}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={imageUrl}
        />
        <Badge className="absolute left-4 top-4 bg-white/90 normal-case tracking-normal">
          {isAvailable ? "Disponible" : "Próximamente"}
        </Badge>
      </button>
      <div className="p-6">
        <div className="flex flex-col">
          <div className="flex min-h-[64px] items-start justify-between gap-3">
            <h3 className="font-display text-2xl leading-tight text-brand-secondary">
              {name}
            </h3>

            <span
              className="mt-1 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-brand-secondary/100 shadow-sm"
              style={{ background: colorHex }}
              aria-label={`Color: ${color}`}
              title={color}
            />
          </div>

          <p className="mt-[-20px] text-sm text-brand-secondary/55">
            Tallas {sizes.join(" · ")}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="rounded-md bg-brand-soft px-2 py-[5px] text-xs text-brand-secondary/55">
              Precio de renta
            </span>

            <span className="whitespace-nowrap font-semibold text-brand-secondary">
              {formatCurrency(price)}
            </span>
          </div>
        </div>
        <Button
          className="mt-5 w-full"
          disabled={!isAvailable}
          href={isAvailable ? generateWhatsAppLink(message) : undefined}
          target="_blank"
          variant={isAvailable ? "primary" : "outline"}
        >
          <MessageCircle aria-hidden="true" className="mr-2" size={17} />
          {isAvailable ? "Consultar por WhatsApp" : "No disponible"}
        </Button>
      </div>
      <Lightbox
        alt={`Vestido ${name} en color ${color}`}
        imageUrl={imageUrl}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </article>
  );
};

export const Catalog = () => (
  <section className="bg-brand-soft px-5 py-20 sm:px-8 sm:py-28" id="catalogo">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        description="Una selección para graduaciones, bodas, XV años y noches que merecen algo extraordinario."
        eyebrow="Colección destacada"
        title="Encuentra el vestido que habla de ti"
      />
      <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {DRESSES.slice(0, HOMEPAGE_DRESS_LIMIT).map((dress) => (
          <DressCard key={dress.id} {...dress} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/catalogo" variant="secondary">
          Ver catálogo completo
          <ArrowRight aria-hidden="true" className="ml-2" size={17} />
        </Button>
      </div>
      <p className="mt-8 text-center text-sm text-brand-secondary/55">
        Los precios mostrados corresponden únicamente a la renta de los
        vestidos. Para consultar el precio de venta y disponibilidad,
        contáctanos por WhatsApp.
      </p>
    </div>
  </section>
);
