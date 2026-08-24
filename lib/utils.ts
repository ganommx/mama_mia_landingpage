/**
 * Une clases condicionales en una sola cadena.
 */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

/**
 * Formatea un precio en pesos mexicanos sin centavos.
 */
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount)
