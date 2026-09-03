"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { DRESSES } from "@/constants/services";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { formatCurrency } from "@/lib/utils";
import type { Dress, DressCardProps } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

const HOMEPAGE_DRESS_LIMIT = 6;

export const DressCard = ({
  id,
  name,
  price,
  sizes,
  color,
  imageUrl,
  backImageUrl,
  isAvailable,
  colorHex,
  imageScale = 1.1,
  onCardClick,
  truncateName = true,
}: DressCardProps) => {
  const { generateWhatsAppLink } = useWhatsApp();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const hasBackView = !!backImageUrl;
  const activeImageUrl = hasBackView && showBack ? backImageUrl : imageUrl;
  const message = `Hola, me interesa el vestido ${name} (${id}). ¿Está disponible para mi fecha? También me gustaría conocer su precio de venta.`;

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-soft sm:rounded-3xl" onClick={onCardClick}>
      <button
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-brand-accent sm:rounded-t-3xl"
        onClick={(e) => {
          if (onCardClick) return;
          e.stopPropagation();
          setIsLightboxOpen(true);
        }}
        type="button"
      >
        <div
          aria-hidden={hasBackView && showBack}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            hasBackView && showBack ? "opacity-0" : "opacity-100",
          )}
        >
        <Image
          alt={`Vestido ${name} en color ${color}`}
          className="object-contain transition-transform duration-500 group-hover:scale-[1.07]"
          fill
          quality={100}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          src={imageUrl}
          style={{ transform: `scale(${imageScale})` }}
        />
        </div>
        {hasBackView && (
          <div
            aria-hidden={!showBack}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              showBack ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              alt={`Vestido ${name} en color ${color} (espalda)`}
              className="object-contain transition-transform duration-500 group-hover:scale-[1.07]"
              fill
              quality={100}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
              src={backImageUrl}
              style={{ transform: `scale(${imageScale})` }}
            />
          </div>
        )}
        <Badge className="absolute left-2 top-2 bg-white/90 !px-2 !py-0.5 !text-[10px] normal-case tracking-normal sm:left-4 sm:top-4 sm:!px-3 sm:!py-1 sm:!text-xs">
          {isAvailable ? "Disponible" : "Próximamente"}
        </Badge>
        {hasBackView && (
          <>
            {showBack && (
              <span
                aria-label="Ver frente"
                className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-2.5 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBack(false);
                }}
                role="button"
                tabIndex={0}
              >
                <ChevronLeft size={16} />
              </span>
            )}
            {!showBack && (
              <span
                aria-label="Ver espalda"
                className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-2.5 sm:h-8 sm:w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBack(true);
                }}
                role="button"
                tabIndex={0}
              >
                <ChevronRight size={16} />
              </span>
            )}
          </>
        )}
      </button>
      <div className="p-3 sm:p-6">
        <div className="flex flex-col">
          <div className="flex min-h-[44px] items-start justify-between gap-2 sm:min-h-[64px] sm:gap-3">
            <h3
              className={cn(
                "font-display text-base leading-tight text-brand-secondary sm:text-2xl",
                truncateName && "line-clamp-2",
              )}
            >
              {name}
            </h3>

            <span
              className="mt-0.5 h-5 w-5 shrink-0 overflow-hidden rounded-full border border-brand-secondary/100 shadow-sm sm:mt-1 sm:h-7 sm:w-7"
              style={{ background: colorHex }}
              aria-label={`Color: ${color.join(", ")}`}
              title={color.join(", ")}
            />
          </div>
          <p className="mt-1 text-[11px] text-brand-secondary/55 sm:mt-2 sm:text-sm">
            Tallas {sizes.join(" · ")}
          </p>

          <div className="mt-1.5 flex items-center justify-between sm:mt-3">
            <span className="rounded-md bg-brand-soft px-1.5 py-[3px] text-[10px] text-brand-secondary/55 sm:px-2 sm:py-[5px] sm:text-xs">
              Precio de renta
            </span>

            <span className="whitespace-nowrap text-[13px] font-semibold text-brand-secondary sm:text-base">
              {formatCurrency(price)}
            </span>
          </div>
        </div>
        <div className="contents" onClick={(e) => e.stopPropagation()}>
          <Button
            className="mt-3 flex w-full !min-h-9 items-center justify-center !px-2 !py-1.5 sm:mt-5 sm:!min-h-12 sm:!px-6 sm:!py-3"
            disabled={!isAvailable}
            href={isAvailable ? generateWhatsAppLink(message) : undefined}
            target="_blank"
            variant={isAvailable ? "primary" : "outline"}
          >
            <FaWhatsapp
              aria-hidden="true"
              className="mr-1.5 text-[15px] sm:mr-2 sm:text-[17px]"
            />

            <span className="text-[11px] sm:text-sm">
              {isAvailable ? (
                <>
                  <span className="sm:hidden">Consultar</span>
                  <span className="hidden sm:inline">Consultar por WhatsApp</span>
                </>
              ) : (
                "No disponible"
              )}
            </span>
          </Button>
        </div>
      </div>
      <Lightbox
        alt={`Vestido ${name} en color ${color}`}
        imageUrl={activeImageUrl}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </article>
  );
};

export const Catalog = () => {
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);

  const handleCardModalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedDress(null);
  }, []);

  useEffect(() => {
    if (!selectedDress) return;

    document.addEventListener("keydown", handleCardModalKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleCardModalKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedDress, handleCardModalKeyDown]);

  return (
    <section className="bg-brand-soft px-5 py-20 sm:px-8 sm:py-28" id="catalogo">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          description="Una selección para graduaciones, bodas, XV años y noches que merecen algo extraordinario."
          eyebrow="Colección destacada"
          title="Encuentra el vestido que habla de ti"
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {DRESSES.slice(0, HOMEPAGE_DRESS_LIMIT).map((dress) => (
            <DressCard
              key={dress.id}
              {...dress}
              onCardClick={() => setSelectedDress(dress)}
            />
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

      {selectedDress && (
        <div
          aria-label="Tarjeta del vestido"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedDress(null)}
          role="dialog"
        >
          <button
            aria-label="Cerrar tarjeta del vestido"
            className="absolute right-4 top-4 z-10 hidden rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6 sm:block"
            onClick={() => setSelectedDress(null)}
            type="button"
          >
            <X aria-hidden="true" size={24} />
          </button>
          <div
            className="relative w-full max-w-[21rem] sm:max-w-[24rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar tarjeta del vestido"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/25 sm:hidden"
              onClick={() => setSelectedDress(null)}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <DressCard {...selectedDress} truncateName={false} />
          </div>
        </div>
      )}
    </section>
  );
};
