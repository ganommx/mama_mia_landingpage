import type { Dress } from "@/types";
import { DressCategory } from "@/types";

const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

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
  "del",
  "color",
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

export interface Suggestion {
  label: string;
  query: string;
}

const dressHaystack = (dress: Dress): string =>
  [dress.name, dress.category, ...dress.color, ...dress.sizes]
    .map(normalize)
    .join(" ");

const getCategoryIntent = (tokens: string[]): { kind: DressCategory } | null => {
  for (const t of tokens) {
    if (CATEGORY_KEYWORDS[t]) return { kind: CATEGORY_KEYWORDS[t] };
  }
  return null;
};

const isCategoryToken = (t: string): boolean => Boolean(CATEGORY_KEYWORDS[t]);

const getTermCandidates = (word: string): string[] => {
  const candidates = new Set<string>([word]);
  if (word.length > 2) {
    if (word.endsWith("es")) candidates.add(word.slice(0, -2));
    if (word.endsWith("s")) candidates.add(word.slice(0, -1));
  }
  return [...candidates];
};

const termMatches = (haystack: string, term: string): boolean =>
  getTermCandidates(term).some((candidate) => haystack.includes(candidate));

export const matchesSearch = (dress: Dress, query: string): boolean => {
  const normalized = normalize(query);
  if (!normalized) return true;

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const intent = getCategoryIntent(tokens);

  if (intent) {
    if (dress.category !== intent.kind) return false;

    const haystack = dressHaystack(dress);
    for (const t of tokens) {
      if (STOPWORDS.has(t) || isCategoryToken(t)) continue;
      if (!termMatches(haystack, t)) return false;
    }
    return true;
  }

  const haystack = dressHaystack(dress);
  for (const t of tokens) {
    if (STOPWORDS.has(t)) continue;
    if (!termMatches(haystack, t)) return false;
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
    suggestions.push({
      label: `Vestidos de ${categoryLabel(intent.kind)}`,
      query: query,
    });
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
