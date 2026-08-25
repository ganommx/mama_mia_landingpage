"use client";

import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import mamaMiaBlack from "@/public/images/mama_mia_black.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { generateWhatsAppLink } = useWhatsApp();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-secondary/10 bg-brand-soft/95 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a className="flex items-center" href="#inicio">
          <Image
            src={mamaMiaBlack}
            alt="Mamá Mía"
            className="h-20 w-auto sm:h-[65px]"
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              className="text-sm font-medium text-brand-secondary/70 transition-colors hover:text-brand-primary"
              href={href}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href={generateWhatsAppLink()} target="_blank">
            <MessageCircle aria-hidden="true" className="mr-2" size={18} />
            Contactar por WhatsApp
          </Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          className="rounded-full p-2 text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-brand-secondary/10 bg-brand-soft px-5 pb-6 pt-4 lg:hidden",
          !isMenuOpen && "hidden",
        )}
        id="mobile-navigation"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <a
              key={href}
              className="rounded-xl px-3 py-3 font-medium hover:bg-brand-accent"
              href={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Button
            className="mt-3"
            href={generateWhatsAppLink()}
            target="_blank"
          >
            Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
};
