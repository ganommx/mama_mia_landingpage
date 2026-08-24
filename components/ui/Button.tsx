import type { ButtonProps, ButtonVariant } from '@/types'
import { cn } from '@/lib/utils'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-brand-secondary hover:bg-[#b9985d]',
  secondary: 'bg-brand-secondary text-white hover:bg-black',
  outline: 'border border-brand-secondary/25 bg-transparent text-brand-secondary hover:border-brand-primary hover:text-brand-primary',
  light: 'bg-white text-brand-secondary hover:bg-brand-accent',
}

export const Button = ({
  children,
  href,
  variant = 'primary',
  className,
  ariaLabel,
  target = '_self',
  type = 'button',
  ...buttonProps
}: ButtonProps) => {
  const classes = cn(
    'inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    VARIANT_CLASSES[variant],
    className,
  )

  if (href) {
    return (
      <a
        aria-label={ariaLabel}
        className={classes}
        href={href}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        target={target}
      >
        {children}
      </a>
    )
  }

  return (
    <button aria-label={ariaLabel} className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
