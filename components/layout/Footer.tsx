"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Users } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import mamaMiaBlack from "@/public/images/mama_mia_black.png";
import { NAVIGATION_ITEMS } from "@/constants/navigation";

export const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

  const resolveHref = (href: string) => {
    if (isHome) return href;

    if (href === "#inicio") return "/";

    if (href.startsWith("#")) {
      return `/${href}`;
    }

    return href;
  };

  return (
    <footer className="bg-[#232323] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
        <div>
          <a className="flex items-center" href={resolveHref("#inicio")}>
            <Image
              alt="Mamá Mía"
              className="h-16 w-auto brightness-0 invert sm:h-[60px]"
              src={mamaMiaBlack}
            />
          </a>

          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            Vestidos para celebrar cada versión de ti en los momentos que nunca
            se olvidan.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Links rápidos
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {NAVIGATION_ITEMS.map(({ href, label }) => (
              <a
                key={href}
                className="text-sm text-white/65 hover:text-white"
                href={resolveHref(href)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:text-right">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Síguenos
          </h2>

          <div className="mt-4 flex gap-3 md:justify-end">
            <a
              aria-label="Instagram de MamáMía"
              className="rounded-full border border-white/15 p-3 hover:border-brand-primary hover:text-brand-primary"
              href="https://www.instagram.com/mamamia.337/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram aria-hidden="true" size={18} />
            </a>

            <a
              aria-label="Facebook de MamáMía"
              className="rounded-full border border-white/15 p-3 hover:border-brand-primary hover:text-brand-primary"
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebook aria-hidden="true" size={18} />
            </a>
          </div>
          {contactEmail && (
            <a
              className="mt-3 block w-fit md:ml-auto text-sm text-white/65 transition-colors hover:text-brand-primary"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} MamáMía. Todos los derechos reservados.
        </p>

        <p>
          Proyecto desarrollado por Ganom — Presencia digital que convierte.
        </p>
      </div>
    </footer>
  );
};
