"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { DRESSES } from "@/constants/services";
import { DressCard } from "@/components";
import {
  CatalogFilters,
  INITIAL_FILTERS,
  type FilterState,
} from "@/components/sections/CatalogFilters";

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

  const filteredDresses = useMemo(() => {
    return DRESSES.filter((dress) => {
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(dress.color)
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
  }, [filters]);

  return (
    <>
      <div className="mt-8">
        <CatalogFilters
          filters={filters}
          onFilterChange={setFilters}
          totalResults={filteredDresses.length}
          totalCount={DRESSES.length}
        />
      </div>

      {filteredDresses.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDresses.map((dress) => (
            <DressCard key={dress.id} {...dress} />
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
    </>
  );
};
