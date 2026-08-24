import type { BadgeProps } from '@/types'
import { cn } from '@/lib/utils'

export const Badge = ({ children, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary',
      className,
    )}
  >
    {children}
  </span>
)
