"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DRESSES } from "@/constants/services";

export interface FilterState {
  colors: string[];
  sizes: string[];
  priceRange: string;
  availability: string;
}

export const INITIAL_FILTERS: FilterState = {
  colors: [],
  sizes: [],
  priceRange: "all",
  availability: "all",
};

export const COLOR_GROUPS = [
  { key: "rosa", label: "Rosa", hex: "#F03595" },
  { key: "rojo", label: "Rojo", hex: "#D01B30" },
  { key: "amarillo", label: "Amarillo", hex: "#EAB308" },
  { key: "negro", label: "Negro", hex: "#2D2D2D" },
  { key: "azul", label: "Azul", hex: "#045D90" },
  { key: "verde", label: "Verde", hex: "#16A34A" },
  { key: "púrpura", label: "Púrpura", hex: "#9F3383" },
  { key: "gris", label: "Gris", hex: "#ACABBF" },
  { key: "café", label: "Café", hex: "#A55F2A" },
  { key: "varios", label: "Varios", hex: "#BA9248" },
];

const LETTER_INDEX: Record<string, number> = { S: 0, M: 1 };

const sizeSortKey = (size: string): number => {
  const numeric = size.match(/^\d+/);
  if (numeric) return Number(numeric[0]);
  return 1000 + (LETTER_INDEX[size] ?? 999);
};

export const SIZE_OPTIONS = Array.from(
  new Set(DRESSES.flatMap((dress) => dress.sizes).filter((s) => s.trim() !== "")),
).sort((a, b) => {
  const diff = sizeSortKey(a) - sizeSortKey(b);
  return diff !== 0 ? diff : a.length - b.length;
});

export const PRICE_RANGES = [
  { key: "all", label: "Todos" },
  { key: "0-799", label: "Menos de $800" },
  { key: "800-999", label: "$800 – $999" },
  { key: "1000+", label: "$1,000 o más" },
];

export const AVAILABILITY_OPTIONS = [
  { key: "all", label: "Todos" },
  { key: "available", label: "Disponibles" },
  { key: "unavailable", label: "No disponibles" },
];

type SectionKey = "color" | "size" | "price" | "availability";

/* ──────────────────────────────────────────────
   Shared building blocks (outside CatalogFilters)
   ────────────────────────────────────────────── */

function AccordionHeader({
  isOpen,
  count,
  label,
  onClick,
  compact,
}: {
  isOpen: boolean;
  count: number;
  label: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 transition-colors duration-200",
        compact
          ? "w-full justify-between rounded-xl px-1 py-1.5 text-sm font-medium text-brand-secondary hover:bg-brand-soft/60"
          : cn(
              "rounded-full border px-4 py-2 text-sm font-medium",
              isOpen
                ? "border-brand-secondary bg-brand-secondary text-white"
                : "border-brand-secondary/20 bg-white text-brand-secondary hover:border-brand-primary",
            ),
      )}
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center gap-2">
        {label}
        {count > 0 && (
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
              isOpen && !compact
                ? "bg-white/25 text-white"
                : "bg-brand-primary text-brand-secondary",
            )}
          >
            {count}
          </span>
        )}
      </span>
      <ChevronDown
        size={compact ? 16 : 14}
        className={cn(
          "shrink-0 transition-transform duration-300",
          !compact && isOpen && "text-white/60",
          !compact && !isOpen && "text-brand-secondary/40",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

function AccordionPanel({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const [height, setHeight] = useState(0);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const callbackRef = useCallback((node: HTMLDivElement | null) => {
    nodeRef.current = node;
    if (node) setHeight(node.scrollHeight);
  }, []);

  useEffect(() => {
    if (isOpen && nodeRef.current) {
      setHeight(nodeRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
    >
      <div ref={callbackRef} className="flex w-full flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
        active
          ? "border-brand-secondary bg-brand-secondary text-white"
          : "border-brand-secondary/20 bg-white text-brand-secondary/70 hover:border-brand-primary hover:text-brand-secondary",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function SizeGuide() {
  return (
    <div className="w-full">
      <div className="border-t border-brand-secondary/10 pt-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-primary">
          Guía de tallas
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-brand-secondary/55">
          Junior: 1, 3, 3/4, 5/6, 9/10, etc.
          <br />
          Señora: 0, 2, 4, 6, 8, 10 y 12.
          <br />
          Algunos modelos también están disponibles en tallas S y M.
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   CatalogFilters
   ────────────────────────────────────────────── */

interface CatalogFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  totalCount: number;
}

export const CatalogFilters = ({
  filters,
  onFilterChange,
  totalResults,
  totalCount,
}: CatalogFiltersProps) => {
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCount =
    filters.colors.length +
    filters.sizes.length +
    (filters.priceRange !== "all" ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0);

  const hasActiveFilters = activeCount > 0;

  const toggleSection = (key: SectionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const toggleArrayFilter = (key: "colors" | "sizes", value: string) => {
    onFilterChange({
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    });
  };

  const setScalarFilter = (
    key: "priceRange" | "availability",
    value: string,
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => onFilterChange(INITIAL_FILTERS);

  const getActiveCount = (key: SectionKey): number => {
    switch (key) {
      case "color":
        return filters.colors.length;
      case "size":
        return filters.sizes.length;
      case "price":
        return filters.priceRange !== "all" ? 1 : 0;
      case "availability":
        return filters.availability !== "all" ? 1 : 0;
    }
  };

  /* ── Filter option renderers ── */

  const renderColorOptions = () =>
    COLOR_GROUPS.map((c) => (
      <button
        key={c.key}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors duration-200",
          filters.colors.includes(c.key)
            ? "border-brand-secondary bg-brand-secondary text-white"
            : "border-brand-secondary/20 bg-white text-brand-secondary/70 hover:border-brand-primary",
        )}
        onClick={() => toggleArrayFilter("colors", c.key)}
        title={c.label}
        type="button"
      >
        <span
          className="inline-block h-3 w-3 shrink-0 rounded-full border border-black/10"
          style={{ background: c.hex }}
        />
        {c.label}
      </button>
    ));

  const renderSizeOptions = () =>
    SIZE_OPTIONS.map((s) => (
      <FilterPill
        key={s}
        active={filters.sizes.includes(s)}
        onClick={() => toggleArrayFilter("sizes", s)}
      >
        {s}
      </FilterPill>
    ));

  const renderPriceOptions = () =>
    PRICE_RANGES.map((r) => (
      <FilterPill
        key={r.key}
        active={filters.priceRange === r.key}
        onClick={() => setScalarFilter("priceRange", r.key)}
      >
        {r.label}
      </FilterPill>
    ));

  const renderAvailabilityOptions = () =>
    AVAILABILITY_OPTIONS.map((o) => (
      <FilterPill
        key={o.key}
        active={filters.availability === o.key}
        onClick={() => setScalarFilter("availability", o.key)}
      >
        {o.label}
      </FilterPill>
    ));

  return (
    <>
      {/* ══════════ Desktop ══════════ */}
      <div className="hidden sm:block">
        {/* Category headers */}
        <div className="flex flex-wrap items-center gap-3">
          <AccordionHeader
            isOpen={openSection === "color"}
            count={getActiveCount("color")}
            label="Color"
            onClick={() => toggleSection("color")}
          />
          <AccordionHeader
            isOpen={openSection === "size"}
            count={getActiveCount("size")}
            label="Talla"
            onClick={() => toggleSection("size")}
          />
          <AccordionHeader
            isOpen={openSection === "price"}
            count={getActiveCount("price")}
            label="Precio"
            onClick={() => toggleSection("price")}
          />
          <AccordionHeader
            isOpen={openSection === "availability"}
            count={getActiveCount("availability")}
            label="Estado"
            onClick={() => toggleSection("availability")}
          />

          {hasActiveFilters && (
            <button
              className="ml-auto flex items-center gap-1.5 text-xs font-medium text-brand-primary transition-colors hover:text-[#b9985d]"
              onClick={clearAll}
              type="button"
            >
              <X size={13} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Accordion panels */}
        <div className="mt-2 space-y-2">
          <AccordionPanel isOpen={openSection === "color"}>
            {renderColorOptions()}
          </AccordionPanel>
          <AccordionPanel isOpen={openSection === "size"}>
            {renderSizeOptions()}
            <SizeGuide />
          </AccordionPanel>
          <AccordionPanel isOpen={openSection === "price"}>
            {renderPriceOptions()}
          </AccordionPanel>
          <AccordionPanel isOpen={openSection === "availability"}>
            {renderAvailabilityOptions()}
          </AccordionPanel>
        </div>

        {/* Results */}
        <p className="mt-3 text-sm text-brand-secondary/55">
          Mostrando{" "}
          <span className="font-semibold text-brand-secondary">
            {totalResults}
          </span>{" "}
          de {totalCount} vestidos
        </p>
      </div>

      {/* ══════════ Mobile ══════════ */}
      <div className="sm:hidden">
        {/* Toggle bar */}
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2 rounded-full border border-brand-secondary/20 bg-white px-4 py-2 text-sm font-medium text-brand-secondary transition-colors hover:border-brand-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeCount > 0 && (
              <span className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-brand-secondary">
                {activeCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              className="flex items-center gap-1 text-xs font-medium text-brand-primary"
              onClick={clearAll}
              type="button"
            >
              <X size={13} />
              Limpiar
            </button>
          )}
        </div>

        <p className="mt-2 text-xs text-brand-secondary/55">
          Mostrando{" "}
          <span className="font-semibold text-brand-secondary">
            {totalResults}
          </span>{" "}
          de {totalCount} vestidos
        </p>

        {/* Mobile expandable panel */}
        <MobileFilterPanel
          open={mobileOpen}
          footer={
            <button
              className="w-full rounded-full border border-brand-secondary/20 py-2 text-xs font-medium text-brand-secondary/60 transition-colors hover:border-brand-secondary/40 hover:text-brand-secondary"
              onClick={() => setMobileOpen(false)}
              type="button"
            >
              Cerrar
            </button>
          }
        >
          <AccordionHeader
            isOpen={openSection === "color"}
            count={getActiveCount("color")}
            label="Color"
            onClick={() => toggleSection("color")}
            compact
          />
          <AccordionPanel isOpen={openSection === "color"}>
            <div className="flex flex-wrap gap-2 px-1 pb-1 pt-2">
              {renderColorOptions()}
            </div>
          </AccordionPanel>

          <AccordionHeader
            isOpen={openSection === "size"}
            count={getActiveCount("size")}
            label="Talla"
            onClick={() => toggleSection("size")}
            compact
          />
          <AccordionPanel isOpen={openSection === "size"}>
            <div className="px-1 pb-1 pt-2">
              {renderSizeOptions()}
              <SizeGuide />
            </div>
          </AccordionPanel>

          <AccordionHeader
            isOpen={openSection === "price"}
            count={getActiveCount("price")}
            label="Precio"
            onClick={() => toggleSection("price")}
            compact
          />
          <AccordionPanel isOpen={openSection === "price"}>
            <div className="px-1 pb-1 pt-2">{renderPriceOptions()}</div>
          </AccordionPanel>

          <AccordionHeader
            isOpen={openSection === "availability"}
            count={getActiveCount("availability")}
            label="Estado"
            onClick={() => toggleSection("availability")}
            compact
          />
          <AccordionPanel isOpen={openSection === "availability"}>
            <div className="px-1 pb-1 pt-2">{renderAvailabilityOptions()}</div>
          </AccordionPanel>
        </MobileFilterPanel>
      </div>
    </>
  );
};

/* ── Mobile outer panel wrapper ── */

function MobileFilterPanel({
  open,
  children,
  footer,
}: {
  open: boolean;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div
      className="w-full overflow-hidden transition-[max-height] duration-300 ease-in-out"
      style={{ maxHeight: open ? "70vh" : "0px" }}
    >
      <div className="flex max-h-[70vh] flex-col rounded-2xl border border-brand-secondary/10 bg-white p-4 shadow-sm">
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        <div className="shrink-0 pt-3">{footer}</div>
      </div>
    </div>
  );
}
