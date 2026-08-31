export enum DressCategory {
  EVENING = "evening",
  QUINCEANERA = "quinceanera",
  GRADUATION = "graduation",
  WEDDING = "wedding",
}

export enum ServiceIcon {
  SPARKLES = "sparkles",
  SHOPPING_BAG = "shopping-bag",
  HEART_HANDSHAKE = "heart-handshake",
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
