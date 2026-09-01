# MamaMia

Landing page profesional para un negocio de renta y venta de vestidos. Está orientada a conversión mediante catálogo, preguntas frecuentes y contacto directo por WhatsApp.

## Stack

- Next.js 15 con App Router
- React 19 y TypeScript strict
- Tailwind CSS v3
- Lucide React
- `next/font`, `next/image` y Metadata API

## Instalación

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Variables de entorno

Configura estos valores en `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=521XXXXXXXXXX
NEXT_PUBLIC_BUSINESS_ADDRESS=Tu dirección aquí
NEXT_PUBLIC_GOOGLE_MAPS_URL=https://www.google.com/maps/embed?pb=...
```

- El número de WhatsApp debe incluir código de país y solo dígitos.
- La URL de Google Maps debe ser la URL de `src` obtenida desde **Compartir > Insertar un mapa**.
- `.env.local` está ignorado por Git. `.env.example` sirve como plantilla sin datos sensibles.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```

## Personalización

- Catálogo y servicios: `constants/services.ts`
- Preguntas frecuentes: `constants/faq.ts`
- Navegación: `constants/navigation.ts`
- Paleta y tipografías: `tailwind.config.ts`
- SEO y Open Graph: `app/layout.tsx`

## Estructura

La página se compone de componentes atómicos en `components/ui`, estructura global en `components/layout` y secciones de conversión en `components/sections`. Los datos, tipos y lógica de WhatsApp están separados en `constants`, `types` y `hooks`.

---

Proyecto desarrollado por **Ganom** para **MamaMia** — Presencia digital que convierte.
