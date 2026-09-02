"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [panelSize, setPanelSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setVisible(false);
      setOpenKey((k) => k + 1);
      setPanelSize(null);

      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setVisible(false);
    const timer = setTimeout(() => setMounted(false), 350);
    return () => clearTimeout(timer);
  }, [isOpen]);

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
        className={cn(
          "relative overflow-hidden rounded-2xl",
          panelSize ? undefined : "h-full max-h-[85vh] w-full max-w-3xl",
        )}
        key={openKey}
        onClick={(e) => e.stopPropagation()}
        style={panelSize ? { width: panelSize.width, height: panelSize.height } : undefined}
      >
        <Image
          alt={alt}
          className="animate-[lightbox-zoom_400ms_ease-out] object-contain rounded-2xl"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          src={imageUrl}
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (!naturalWidth || !naturalHeight) return;
            const padding = window.innerWidth >= 640 ? 64 : 40;
            const scale = Math.min(
              (window.innerWidth - padding) / naturalWidth,
              (window.innerHeight * 0.85) / naturalHeight,
            );
            setPanelSize({
              width: Math.max(1, Math.round(naturalWidth * scale)),
              height: Math.max(1, Math.round(naturalHeight * scale)),
            });
          }}
        />
      </div>
    </div>
  );
};