"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { X } from "lucide-react";

import type { LightboxProps } from "@/types";
import { cn } from "@/lib/utils";

export const Lightbox = ({
  isOpen,
  onClose,
  imageUrl,
  alt,
}: LightboxProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openKey, setOpenKey] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setVisible(false);
      setOpenKey((k) => k + 1);

      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setVisible(false);
    const timer = setTimeout(() => setMounted(false), 350);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!mounted || !isOpen) return;
    const box = boxRef.current;
    if (!box) return;

    box.style.transition = "none";
    box.style.opacity = "0.85";
    box.style.transform = "scale(0.97)";
    void box.offsetWidth;

    box.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";

    const raf = requestAnimationFrame(() => {
      box.style.opacity = "1";
      box.style.transform = "scale(1)";
    });
    return () => cancelAnimationFrame(raf);
  }, [mounted, openKey, isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!mounted) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mounted, handleKeyDown]);

  if (!mounted) return null;

  return (
    <div
      aria-label="Visor de imagen"
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center p-5 sm:p-8",
        "bg-black/80 backdrop-blur-sm",
        "transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
      role="dialog"
    >
      <button
        aria-label="Cerrar visor de imagen"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
        onClick={onClose}
        type="button"
      >
        <X aria-hidden="true" size={24} />
      </button>

      <div
        className="relative h-full max-h-[85vh] w-full max-w-3xl"
        key={openKey}
        onClick={(e) => e.stopPropagation()}
        ref={boxRef}
      >
        <Image
          alt={alt}
          className="object-contain"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          src={imageUrl}
        />
      </div>
    </div>
  );
};
