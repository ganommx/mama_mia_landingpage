"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 500;

export const ScrollToTopButton = () => {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    document
      .getElementById("catalogo")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isVisible = scrolled && !footerVisible;

  return (
    <button
      aria-label="Volver arriba"
      className={cn(
        "fixed bottom-[92px] right-[26px] z-[140] flex h-11 w-11 items-center justify-center rounded-full text-white",
        "bg-brand-secondary shadow-[0_8px_24px_rgba(45,45,45,0.25)]",
        "transition-all duration-300 ease-out",
        "hover:bg-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        "sm:bottom-[100px] sm:right-[34px]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      onClick={handleClick}
      type="button"
    >
      <ArrowUp aria-hidden="true" className="text-xl" />
    </button>
  );
};