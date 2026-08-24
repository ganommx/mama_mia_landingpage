'use client'

import { useCallback } from 'react'

interface UseWhatsAppReturn {
  generateWhatsAppLink: (message?: string) => string
}

const DEFAULT_MESSAGE = 'Hola, me gustaría recibir información sobre los vestidos de MamaMia.'

/**
 * Genera enlaces de WhatsApp con mensajes contextuales y un número sanitizado.
 */
export const useWhatsApp = (): UseWhatsAppReturn => {
  const generateWhatsAppLink = useCallback((message = DEFAULT_MESSAGE): string => {
    const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
    const whatsappNumber = configuredNumber.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)

    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  }, [])

  return { generateWhatsAppLink }
}
