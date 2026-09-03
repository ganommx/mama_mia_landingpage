import type { Dress } from "@/types";
import { DressCategory } from "@/types";

const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const JUNIOR_SIZES = new Set(["1", "3", "3/4", "5/6", "9/10"]);
const SENORA_SIZES = new Set(["0", "2", "4", "6", "8", "10", "12"]);

const JUNIOR_KEYWORDS = new Set(["junior", "nina", "ninas", "nino", "ninos"]);
const SENORA_KEYWORDS = new Set([
  "senora",
  "senoras",
  "dama",
  "damas",
  "mujer",
  "mujeres",
]);

const CATEGORY_KEYWORDS: Record<string, DressCategory> = {
  noche: DressCategory.EVENING,
  evening: DressCategory.EVENING,
  quinceanera: DressCategory.QUINCEANERA,
  quince: DressCategory.QUINCEANERA,
  xv: DressCategory.QUINCEANERA,
  graduacion: DressCategory.GRADUATION,
  graduaciones: DressCategory.GRADUATION,
  graduation: DressCategory.GRADUATION,
  graduados: DressCategory.GRADUATION,
  boda: DressCategory.WEDDING,
  bodas: DressCategory.WEDDING,
  novia: DressCategory.WEDDING,
  novias: DressCategory.WEDDING,
  wedding: DressCategory.WEDDING,
};

const STOPWORDS = new Set([
  "vestidos",
  "vestido",
  "para",
  "de",
  "en",
  "con",
  "un",
  "una",
  "unos",
  "unas",
  "los",
  "las",
  "el",
  "la",
  "que",
  "y",
  "o",
]);

const COLOR_KEYS = [
  "rosa",
  "rojo",
  "amarillo",
  "negro",
  "azul",
  "verde",
  "purpura",
  "gris",
  "cafe",
  "blanco",
];

const COLOR_LABELS: Record<string, string> = {
  rosa: "Rosa",
  rojo: "Rojo",
  amarillo: "Amarillo",
  negro: "Negro",
  azul: "Azul",
  verde: "Verde",
  purpura: "Púrpura",
  gris: "Gris",
  cafe: "Café",
  blanco: "Blanco",
};

export type SearchCategoryKind = "junior" | "senora" | DressCategory;

export interface Suggestion {
  label: string;
  query: string;
}

const dressHaystack = (dress: Dress): string =>
  [dress.name, dress.category, ...dress.color, ...dress.sizes]
    .map(normalize)
    .join(" ");

const isJunior = (dress: Dress): boolean =>
  dress.sizes.some((s) => JUNIOR_SIZES.has(s));

const isSenora = (dress: Dress): boolean =>
  dress.sizes.some((s) => SENORA_SIZES.has(s));

const getCategoryIntent = (tokens: string[]): { kind: SearchCategoryKind } | null => {
  for (const t of tokens) {
    if (JUNIOR_KEYWORDS.has(t)) return { kind: "junior" };
    if (SENORA_KEYWORDS.has(t)) return { kind: "senora" };
    if (CATEGORY_KEYWORDS[t]) return { kind: CATEGORY_KEYWORDS[t] };
  }
  return null;
};

const isCategoryToken = (t: string): boolean =>
  JUNIOR_KEYWORDS.has(t) ||
  SENORA_KEYWORDS.has(t) ||
  Boolean(CATEGORY_KEYWORDS[t]);

const CATEGORY_VALUES = new Set<DressCategory>([
  DressCategory.EVENING,
  DressCategory.QUINCEANERA,
  DressCategory.GRADUATION,
  DressCategory.WEDDING,
]);

const isDressCategory = (kind: string): kind is DressCategory =>
  CATEGORY_VALUES.has(kind as DressCategory);

export const matchesSearch = (dress: Dress, query: string): boolean => {
  const normalized = normalize(query);
  if (!normalized) return true;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const intent = getCategoryIntent(tokens);

  if (intent) {
    if (intent.kind === "junior" && !isJunior(dress)) return false;
    if (intent.kind === "senora" && !isSenora(dress)) return false;
    if (isDressCategory(intent.kind) && dress.category !== intent.kind)
      return false;

    const haystack = dressHaystack(dress);
    for (const t of tokens) {
      if (STOPWORDS.has(t) || isCategoryToken(t)) continue;
      if (!haystack.includes(t)) return false;
    }
    return true;
  }

  const haystack = dressHaystack(dress);
  for (const t of tokens) {
    if (STOPWORDS.has(t)) continue;
    if (!haystack.includes(t)) return false;
  }
  return true;
};

export const getSuggestions = (query: string): Suggestion[] => {
  const normalized = normalize(query);
  if (!normalized || normalized.length < 2) return [];

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const intent = getCategoryIntent(tokens);
  const suggestions: Suggestion[] = [];

  if (intent) {
    if (intent.kind === "junior") {
      suggestions.push({ label: "Vestidos junior", query: "junior" });
    } else if (intent.kind === "senora") {
      suggestions.push({ label: "Vestidos para señora", query: "señora" });
    } else if (isDressCategory(intent.kind)) {
      suggestions.push({
        label: `Vestidos de ${categoryLabel(intent.kind)}`,
        query: query,
      });
    }
  }

  const colorToken = tokens.find(
    (t) => !isCategoryToken(t) && COLOR_KEYS.includes(t),
  );
  if (colorToken) {
    suggestions.push({
      label: `Vestidos color ${COLOR_LABELS[colorToken] ?? colorToken}`,
      query: colorToken,
    });
  }

  suggestions.push({
    label: `Vestidos que contengan "${query.trim()}"`,
    query: normalized,
  });

  const seen = new Set<string>();
  return suggestions.filter((s) => {
    const key = s.query;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const categoryLabel = (category: DressCategory): string => {
  switch (category) {
    case DressCategory.EVENING:
      return "noche";
    case DressCategory.QUINCEANERA:
      return "quinceañera";
    case DressCategory.GRADUATION:
      return "graduación";
    case DressCategory.WEDDING:
      return "novia";
  }
};
