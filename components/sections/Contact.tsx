"use client";

import { Clock3, MapPin, MessageCircle } from "lucide-react";

import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FaWhatsapp } from "react-icons/fa";

const FALLBACK_MAP_URL = "https://www.google.com/maps?q=Mexico&output=embed";

export const Contact = () => {
  const { generateWhatsAppLink } = useWhatsApp();
  const address =
    process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "Tu dirección aquí";
  const configuredMapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "";
  const mapUrl = configuredMapUrl.includes("...")
    ? FALLBACK_MAP_URL
    : configuredMapUrl;

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" id="contacto">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-brand-secondary lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <SectionTitle
            align="left"
            description="Cuéntanos la fecha y el tipo de evento. Te ayudaremos a encontrar opciones disponibles para ti."
            eyebrow="Hablemos de tu evento"
            light
            title="Tu vestido ideal está a un mensaje"
          />
          <Button
            className="mt-8 w-full sm:w-fit"
            href={generateWhatsAppLink(
              "Hola, quiero agendar una asesoría para encontrar mi vestido ideal.",
            )}
            target="_blank"
          >
            <FaWhatsapp aria-hidden="true" className="mr-2" size={19} />
            Escribir por WhatsApp
          </Button>
          <div className="mt-10 space-y-4 border-t border-white/10 pt-7 text-sm text-white/65">
            <p className="flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand-primary"
                size={18}
              />
              {address}
            </p>
            <div className="flex items-start gap-3">
              <Clock3
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand-primary"
                size={18}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">Horario de atención</p>
                <dl className="mt-3 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-white">
                      Lunes – Viernes
                    </dt>
                    <dd className="text-right leading-relaxed">
                      10:30 a. m. – 2:30 p. m.
                      <br />
                      5:00 p. m. – 8:30 p. m.
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-white">Sábado</dt>
                    <dd className="text-right">
                      11:00 a. m. – 3:00 p. m.
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-medium text-white">Domingo</dt>
                    <dd className="text-right">Cerrado</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-96 bg-brand-accent">
          <iframe
            allowFullScreen
            className="h-full min-h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl || FALLBACK_MAP_URL}
            title="Ubicación de MamáMía en Google Maps"
          />
        </div>
      </div>
    </section>
  );
};
