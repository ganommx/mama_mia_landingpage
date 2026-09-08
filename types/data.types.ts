export enum DressCategory {
  EVENING = "evening",
  QUINCEANERA = "quinceanera",
  GRADUATION = "graduation",
  WEDDING = "wedding",
}

export enum ServiceIcon {
  SPARKLES = "SPARKLES",
  SHOPPING_BAG = "SHOPPING_BAG",
  HEART_HANDSHAKE = "HEART_HANDSHAKE",
  ACCESSORIES = "ACCESSORIES",
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Dress {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  color: string[];
  colorHex: string;
  imageUrl: string;
  backImageUrl?: string;
  category: DressCategory;
  isAvailable: boolean;
  imageScale?: number;
}

export interface Bag {
  id: string;
  name?: string;
  color?: string[];
  colorHex?: string;
  price?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  imageScale?: number;
  imageOffsetY?: number;
}
export interface Testimonial {
  id: string;
  name: string;
  occasion: string;
  quote: string;
  rating: number;
  imageUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
