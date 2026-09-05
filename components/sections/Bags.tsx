"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Handbag, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { BAGS } from "@/constants/bags";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { formatCurrency } from "@/lib/utils";
import type { Bag, BagCardProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionTitle } from "@/components/ui/SectionTitle";

const BAG_PREVIEW_LIMIT = 3;

const BagCard = ({ id, name, price, imageUrl, onCardClick }: BagCardProps) => {
  const { generateWhatsAppLink } = useWhatsApp();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const message = name
    ? `Hola, me interesa la bolsa "${name}" (${id}). ¿Está disponible y cuál es su precio?`
    : "Hola, me interesa conocer las bolsas disponibles para complementar mi look.";

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-secondary/10 bg-white shadow-soft sm:rounded-3xl"
      onClick={onCardClick}
    >
      <button
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-brand-accent sm:rounded-t-3xl"
        onClick={(e) => {
          if (onCardClick) return;
          e.stopPropagation();
          if (imageUrl) setIsLightboxOpen(true);
        }}
        type="button"
      >
        {imageUrl ? (
          <Image
            alt={name || `Bolsa ${id}`}
            className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
            fill
            quality={100}
            sizes="(max-width: 640px) 50vw, 33vw"
            src={imageUrl}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <Handbag
              aria-hidden="true"
              className="text-brand-secondary/25"
              size={44}
              strokeWidth={1}
            />
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="line-clamp-2 font-display text-base leading-tight text-brand-secondary sm:text-xl">
          {name}
        </h3>

        <div className="mt-auto pt-4 sm:pt-5">
          {typeof price === "number" && (
            <span className="text-[13px] font-bold text-brand-secondary sm:text-base">
              {formatCurrency(price)}
            </span>
          )}
          <Button
            className="mt-3 flex w-full !min-h-9 items-center justify-center !px-2 !py-1.5 sm:mt-5 sm:!min-h-12 sm:!px-6 sm:!py-3"
            href={generateWhatsAppLink(message)}
            target="_blank"
            variant="primary"
          >
            <FaWhatsapp
              aria-hidden="true"
              className="mr-1.5 text-[15px] sm:mr-2 sm:text-[17px]"
            />
            <span className="text-[11px] sm:text-sm">
              <span className="sm:hidden">Consultar</span>
              <span className="hidden sm:inline">Consultar por WhatsApp</span>
            </span>
          </Button>
        </div>
      </div>

      {imageUrl && (
        <Lightbox
          alt={name || `Bolsa ${id}`}
          imageUrl={imageUrl}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </article>
  );
};

interface BagsContentProps {
  preview?: boolean;
}

export const BagsContent = ({ preview = false }: BagsContentProps) => {
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

  const handleCardModalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedBag(null);
  }, []);

  useEffect(() => {
    if (!selectedBag) return;

    document.addEventListener("keydown", handleCardModalKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleCardModalKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedBag, handleCardModalKeyDown]);

  const visibleBags = preview ? BAGS.slice(0, BAG_PREVIEW_LIMIT) : BAGS;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {visibleBags.map((bag, index) => (
          <div
            key={bag.id}
            className={
              preview && index === BAG_PREVIEW_LIMIT - 1
                ? "col-span-2 w-[calc(50%_-_6px)] justify-self-center sm:col-span-1 sm:w-auto sm:justify-self-auto"
                : undefined
            }
          >
            <BagCard {...bag} onCardClick={() => setSelectedBag(bag)} />
          </div>
        ))}
      </div>

      {selectedBag && (
        <div
          aria-label="Tarjeta de la bolsa"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedBag(null)}
          role="dialog"
        >
          <button
            aria-label="Cerrar tarjeta de la bolsa"
            className="absolute right-4 top-4 z-10 hidden rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6 sm:block"
            onClick={() => setSelectedBag(null)}
            type="button"
          >
            <X aria-hidden="true" size={24} />
          </button>

          <div
            className="catalog-card-modal relative w-full max-w-[21rem] sm:max-w-[24rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar tarjeta de la bolsa"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/25 sm:hidden"
              onClick={() => setSelectedBag(null)}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <BagCard {...selectedBag} />
          </div>
        </div>
      )}
    </>
  );
};

export const Bags = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20" id="bolsas">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          description="Además de nuestros vestidos, contamos con una selección de bolsas ideales para complementar tu look y darle el toque final a tu evento."
          eyebrow="Complementa tu look"
          title="Bolsas para completar tu ocasión"
        />
        <div className="mt-10 sm:mt-12">
          <BagsContent preview />
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/bolsas" variant="secondary">
            Ver catálogo completo
            <ArrowRight aria-hidden="true" className="ml-2" size={17} />
          </Button>
        </div>
      </div>
    </section>
  );
};