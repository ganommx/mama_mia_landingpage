"use client";

import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";

import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DRESSES } from "@/constants/services";

export const Hero = () => {
  const { generateWhatsAppLink } = useWhatsApp();

  return (
    <section
      className="overflow-hidden bg-brand-soft pb-16 pt-28 sm:pb-24 sm:pt-32"
      id="inicio"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.88fr]">
        <div className="relative z-10">
          <Badge>Renta y venta de vestidos</Badge>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.04] text-brand-secondary sm:text-6xl lg:text-7xl">
            El vestido perfecto para tu{" "}
            <span className="italic text-brand-primary">momento especial</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-secondary/65">
            Diseños que celebran tu estilo, asesoría cercana y una experiencia
            sencilla para que solo te preocupes por disfrutar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#catalogo" variant="secondary">
              Ver catálogo
              <ArrowDown aria-hidden="true" className="ml-2" size={17} />
            </Button>
            <Button
              href={generateWhatsAppLink(
                "Hola, quiero rentar un vestido para mi próximo evento.",
              )}
              target="_blank"
              variant="outline"
            >
              <MessageCircle aria-hidden="true" className="mr-2" size={18} />
              Rentar ahora por WhatsApp
            </Button>
          </div>
          <div className="mt-10 flex gap-8 border-t border-brand-secondary/10 pt-6 text-sm text-brand-secondary/60">
            <p>
              <strong className="block text-xl text-brand-secondary">
                150+
              </strong>{" "}
              clientas felices
            </p>
            <p>
              <strong className="block text-xl text-brand-secondary">
                5/5
              </strong>{" "}
              en atención
            </p>
            <p>
              <strong className="block text-xl text-brand-secondary">
                XS–XG
              </strong>{" "}
              tallas
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-6 rounded-[3rem] border border-brand-primary/30 sm:-inset-8" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-soft">
            <Image
              alt="Mujer luciendo un elegante vestido de noche color dorado"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              src={DRESSES[5].imageUrl}
            />
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white px-5 py-4 shadow-soft sm:-left-10">
            <p className="font-display text-lg">Tu ocasión, tu estilo</p>
            <p className="mt-1 text-xs text-brand-secondary/55">
              Asesoría incluida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
