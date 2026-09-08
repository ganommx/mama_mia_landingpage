"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Handbag,
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/constants/navigation";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import mamaMiaBlack from "@/public/images/mama_mia_black.png";
import { FaWhatsapp } from "react-icons/fa";

const CATALOG_LABEL = "Catálogo";

const CATALOG_OPTIONS = [
  { label: "Vestidos", href: "/catalogo" },
  { label: "Bolsas", href: "/bolsas" },
];

const CatalogOptionIcon = ({ label }: { label: string }) =>
  label === "Vestidos" ? (
    <ShoppingBag
      aria-hidden="true"
      className="text-brand-primary/70"
      size={16}
    />
  ) : (
    <Handbag aria-hidden="true" className="text-brand-primary/70" size={16} />
  );

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogMenuOpen, setIsCatalogMenuOpen] = useState(false);
  const { generateWhatsAppLink } = useWhatsApp();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const desktopCatalogRef = useRef<HTMLDivElement>(null);
  const mobileCatalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeCatalogMenu = () => setIsCatalogMenuOpen(false);

    const handleDocumentPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        !desktopCatalogRef.current?.contains(target) &&
        !mobileCatalogRef.current?.contains(target)
      ) {
        setIsCatalogMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCatalogMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentPointerDown);
    document.addEventListener("touchstart", handleDocumentPointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleDocumentPointerDown);
      document.removeEventListener("touchstart", handleDocumentPointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCatalogButtonClick = () => {
    setIsCatalogMenuOpen((current) => !current);
  };

  const handleCatalogOptionClick = () => {
    setIsCatalogMenuOpen(false);
    setIsMenuOpen(false);
  };

  const resolveHref = (href: string) => {
    if (href === "#catalogo" && !isHome) return "/catalogo";

    if (href === "#inicio" && !isHome) return "/";

    if (!isHome && href.startsWith("#")) {
      return `/${href}`;
    }
    return href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-secondary/10 bg-brand-soft/95 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a className="flex items-center" href={isHome ? "#inicio" : "/"}>
          <Image
            src={mamaMiaBlack}
            alt="Mamá Mía"
            className="h-20 w-auto sm:h-[65px]"
          />
        </a>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {NAVIGATION_ITEMS.map(({ href, label }) =>
            label === CATALOG_LABEL ? (
              <div className="relative" key={href} ref={desktopCatalogRef}>
                <button
                  aria-expanded={isCatalogMenuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-1 text-sm font-medium text-brand-secondary/70 transition-colors hover:text-brand-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCatalogButtonClick();
                  }}
                  type="button"
                >
                  {label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform duration-200",
                      isCatalogMenuOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full z-10 mt-3 w-48 rounded-2xl border border-brand-secondary/10 bg-white p-2 shadow-soft transition-all duration-200",
                    isCatalogMenuOpen
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 opacity-0",
                  )}
                  role="menu"
                >
                  {CATALOG_OPTIONS.map(
                    ({ href: optionHref, label: optionLabel }) => (
                      <a
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-secondary/70 transition-colors hover:bg-brand-accent hover:text-brand-primary"
                        href={optionHref}
                        key={optionHref}
                        onClick={handleCatalogOptionClick}
                        role="menuitem"
                      >
                        <CatalogOptionIcon label={optionLabel} />
                        {optionLabel}
                      </a>
                    ),
                  )}
                </div>
              </div>
            ) : (
              <a
                key={href}
                className="text-sm font-medium text-brand-secondary/70 transition-colors hover:text-brand-primary"
                href={resolveHref(href)}
              >
                {label}
              </a>
            ),
          )}
        </div>

        <div className="hidden lg:block">
          <Button href={generateWhatsAppLink()} target="_blank">
            <FaWhatsapp aria-hidden="true" className="mr-2" size={18} />
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
          "grid overflow-hidden border-t border-brand-secondary/10 bg-brand-soft transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
        id="mobile-navigation"
      >
        <div className="min-h-0">
          <div className="px-5 pb-6 pt-4">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {NAVIGATION_ITEMS.map(({ href, label }) =>
                label === CATALOG_LABEL ? (
                  <div key={href} ref={mobileCatalogRef}>
                    <button
                      aria-expanded={isCatalogMenuOpen}
                      aria-haspopup="menu"
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium hover:bg-brand-accent"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCatalogButtonClick();
                      }}
                      type="button"
                    >
                      {label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform duration-200",
                          isCatalogMenuOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid overflow-hidden transition-all duration-300 ease-in-out",
                        isCatalogMenuOpen
                          ? "grid-rows-[1fr] translate-y-0 opacity-100"
                          : "pointer-events-none grid-rows-[0fr] -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="min-h-0">
                        <div className="flex flex-col gap-1 pt-1" role="menu">
                          {CATALOG_OPTIONS.map(
                            ({ href: optionHref, label: optionLabel }) => (
                              <a
                                className="flex items-center gap-3 rounded-xl px-3 py-3 pl-8 font-medium text-brand-secondary/70 transition-colors hover:bg-brand-accent hover:text-brand-primary"
                                href={optionHref}
                                key={optionHref}
                                onClick={handleCatalogOptionClick}
                                role="menuitem"
                              >
                                <CatalogOptionIcon label={optionLabel} />
                                {optionLabel}
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={href}
                    className="rounded-xl px-3 py-3 font-medium hover:bg-brand-accent"
                    href={resolveHref(href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                ),
              )}

              <Button
                className="mt-3"
                href={generateWhatsAppLink()}
                target="_blank"
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
