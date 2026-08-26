"use client";

import { useCallback, useEffect } from "react";
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
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      aria-label="Visor de imagen"
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center p-5 sm:p-8",
        "bg-black/80 backdrop-blur-sm",
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
        onClick={(e) => e.stopPropagation()}
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
