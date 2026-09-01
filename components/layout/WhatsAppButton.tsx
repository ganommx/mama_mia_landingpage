"use client";

import { FaWhatsapp } from "react-icons/fa";

import { useWhatsApp } from "@/hooks/useWhatsApp";
import { cn } from "@/lib/utils";

export const WhatsAppButton = () => {
  const { generateWhatsAppLink } = useWhatsApp();

  return (
    <a
      aria-label="Contactar por WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-[150] flex h-14 w-14 items-center justify-center rounded-full",
        "bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)]",
        "transition-colors duration-300 ease-out",
        "md:hover:bg-brand-accent md:hover:text-brand-secondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        "sm:bottom-7 sm:right-7",
      )}
      href={generateWhatsAppLink()}
      rel="noopener noreferrer"
      target="_blank"
    >
      <FaWhatsapp aria-hidden="true" className="text-2xl" />
    </a>
  );
};
