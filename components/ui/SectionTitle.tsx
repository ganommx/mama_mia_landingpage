import type { SectionTitleProps } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) => (
  <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
    {eyebrow && (
      <p className="inline-flex rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
        {eyebrow}
      </p>
    )}
    <h2
      className={cn(
        "mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl",
        light ? "text-white" : "text-brand-secondary",
      )}
    >
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-4 leading-7",
          light ? "text-white/70" : "text-brand-secondary/65",
        )}
      >
        {description}
      </p>
    )}
  </div>
);
