"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchX, X } from "lucide-react";

import { DRESSES } from "@/constants/services";
import { DressCard } from "@/components";
import type { Dress } from "@/types";
import { matchesSearch } from "@/lib/searchCatalog";
import {
  CatalogFilters,
  INITIAL_FILTERS,
  type FilterState,
} from "@/components/sections/CatalogFilters";
import { CatalogSearch } from "@/components/sections/CatalogSearch";

const matchesPriceRange = (price: number, range: string): boolean => {
  switch (range) {
    case "0-799":
      return price < 800;
    case "800-999":
      return price >= 800 && price <= 999;
    case "1000+":
      return price >= 1000;
    default:
      return true;
  }
};

export const CatalogoContent = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [search, setSearch] = useState("");
  const [selectedDress, setSelectedDress] = useState<Dress | null>(null);

  const handleCardModalKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedDress(null);
  }, []);

  useEffect(() => {
    if (!selectedDress) return;

    document.addEventListener("keydown", handleCardModalKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleCardModalKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedDress, handleCardModalKeyDown]);

  const filteredDresses = useMemo(() => {
    return DRESSES.filter((dress) => {
      if (!matchesSearch(dress, search)) {
        return false;
      }

      if (
        filters.colors.length > 0 &&
        !dress.color.some((color) => filters.colors.includes(color))
      ) {
        return false;
      }

      if (
        filters.sizes.length > 0 &&
        !dress.sizes.some((s) => filters.sizes.includes(s))
      ) {
        return false;
      }

      if (!matchesPriceRange(dress.price, filters.priceRange)) {
        return false;
      }

      if (filters.availability === "available" && !dress.isAvailable) {
        return false;
      }

      if (filters.availability === "unavailable" && dress.isAvailable) {
        return false;
      }

      return true;
    });
  }, [filters, search]);

  return (
    <>
      <div className="mt-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="ms-auto w-full max-w-xl lg:ms-0 lg:order-2 lg:w-96 lg:shrink-0">
            <CatalogSearch query={search} onQueryChange={setSearch} />
          </div>
          <div className="lg:order-1 lg:min-w-0 lg:flex-1">
            <div className="mt-5 lg:mt-0">
              <CatalogFilters
                filters={filters}
                onFilterChange={setFilters}
                totalResults={filteredDresses.length}
                totalCount={DRESSES.length}
              />
            </div>
          </div>
        </div>
      </div>

      {filteredDresses.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDresses.map((dress) => (
            <DressCard
              key={dress.id}
              {...dress}
              onCardClick={() => setSelectedDress(dress)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center py-12 text-center">
          <SearchX
            className="mb-4 text-brand-secondary/25"
            size={56}
            strokeWidth={1.2}
          />
          <h3 className="font-display text-xl text-brand-secondary sm:text-2xl">
            No se encontraron vestidos
          </h3>
          <p className="mt-2 max-w-sm text-sm text-brand-secondary/55">
            No hay vestidos que coincidan con los filtros seleccionados. Prueba
            con otros criterios o restablece los filtros.
          </p>
        </div>
      )}
      {selectedDress && (
        <div
          aria-label="Tarjeta del vestido"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedDress(null)}
          role="dialog"
        >
          <button
            aria-label="Cerrar tarjeta del vestido"
            className="absolute right-4 top-4 z-10 hidden rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6 sm:block"
            onClick={() => setSelectedDress(null)}
            type="button"
          >
            <X aria-hidden="true" size={24} />
          </button>
          <div
            className="relative w-full max-w-[21rem] sm:max-w-[24rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar tarjeta del vestido"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/25 sm:hidden"
              onClick={() => setSelectedDress(null)}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <DressCard {...selectedDress} truncateName={false} />
          </div>
        </div>
      )}
    </>
  );
};
