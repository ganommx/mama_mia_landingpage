import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "light";

export interface ButtonProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "_self";
}

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export interface DressCardProps {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  color: string;
  colorHex: string;
  imageUrl: string;
  isAvailable: boolean;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}
