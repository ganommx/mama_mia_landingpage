"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSuggestions } from "@/lib/searchCatalog";

interface CatalogSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export const CatalogSearch = ({ query, onQueryChange }: CatalogSearchProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const suggestions = useMemo(() => getSuggestions(query), [query]);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const handleSelect = (value: string) => {
    onQueryChange(value);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleSubmit = () => {
    if (!hasQuery) return;
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Enter") handleSubmit();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex].query);
      } else {
        handleSubmit();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search
            aria-hidden="true"
            className="text-brand-secondary/35"
            size={18}
            strokeWidth={1.8}
          />
        </div>
        <input
          aria-label="Buscar vestidos"
          className="w-full rounded-full border border-brand-secondary/20 bg-white py-3 pl-11 pr-12 text-sm text-brand-secondary shadow-sm outline-none transition-colors placeholder:text-brand-secondary/35 hover:border-brand-primary focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/10"
          onBlur={() => setOpen(false)}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="¿Qué vestido estás buscando?"
          type="text"
          value={query}
        />
        {hasQuery && (
          <button
            aria-label="Limpiar búsqueda"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => handleSelect("")}
            type="button"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-brand-secondary/60 transition-colors hover:bg-brand-secondary/10 hover:text-brand-secondary">
              <X size={15} strokeWidth={2} />
            </span>
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-brand-secondary/10 bg-white p-1.5 shadow-soft">
          {suggestions.map((s, i) => (
            <li key={`${s.query}-${i}`}>
              <button
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-brand-secondary transition-colors",
                  activeIndex === i
                    ? "bg-brand-soft text-brand-secondary"
                    : "hover:bg-brand-soft/70",
                )}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => handleSelect(s.query)}
                type="button"
              >
                <Search
                  aria-hidden="true"
                  className="shrink-0 text-brand-primary"
                  size={14}
                  strokeWidth={1.8}
                />
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
