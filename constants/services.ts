import { DressCategory, ServiceIcon } from '@/types'
import type { Dress, ProcessStep, Service } from '@/types'

export const SERVICES: Service[] = [
  {
    title: 'Renta de vestidos',
    description: 'Diseños inolvidables para tu evento, sin comprometer tu presupuesto.',
    icon: ServiceIcon.SPARKLES,
  },
  {
    title: 'Venta de vestidos',
    description: 'Encuentra esa pieza especial que querrás conservar para siempre.',
    icon: ServiceIcon.SHOPPING_BAG,
  },
  {
    title: 'Asesoría personalizada',
    description: 'Te ayudamos a elegir el corte, color y talla que mejor realzan tu estilo.',
    icon: ServiceIcon.HEART_HANDSHAKE,
  },
]

export const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Elige tu vestido', description: 'Explora nuestros estilos y guarda tus favoritos.' },
  { number: '02', title: 'Escríbenos', description: 'Confirma disponibilidad y recibe asesoría por WhatsApp.' },
  { number: '03', title: 'Aparta tu fecha', description: 'Agenda tu prueba y asegura el vestido para tu evento.' },
  { number: '04', title: 'Luce espectacular', description: 'Recibe tu vestido listo para hacer de tu noche algo único.' },
]

export const DRESSES: Dress[] = [
  {
    id: 'aurora-dorada',
    name: 'Aurora Dorada',
    price: 1850,
    sizes: ['CH', 'M', 'G'],
    color: 'champagne',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.EVENING,
    isAvailable: true,
  },
  {
    id: 'esmeralda',
    name: 'Esmeralda',
    price: 2100,
    sizes: ['M', 'G'],
    color: 'verde esmeralda',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.GRADUATION,
    isAvailable: true,
  },
  {
    id: 'romance-rosa',
    name: 'Romance Rosa',
    price: 2300,
    sizes: ['XS', 'CH', 'M'],
    color: 'rosa empolvado',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.QUINCEANERA,
    isAvailable: true,
  },
  {
    id: 'noche-estelar',
    name: 'Noche Estelar',
    price: 1950,
    sizes: ['M', 'G', 'XG'],
    color: 'negro',
    imageUrl: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.EVENING,
    isAvailable: false,
  },
  {
    id: 'perla',
    name: 'Perla',
    price: 2800,
    sizes: ['CH', 'M'],
    color: 'marfil',
    imageUrl: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.WEDDING,
    isAvailable: true,
  },
  {
    id: 'rubí',
    name: 'Rubí',
    price: 2200,
    sizes: ['CH', 'M', 'G'],
    color: 'rojo vino',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=85',
    category: DressCategory.GRADUATION,
    isAvailable: true,
  },
]
