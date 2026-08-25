import { DressCategory, ServiceIcon } from "@/types";
import type { Dress, ProcessStep, Service } from "@/types";

export const SERVICES: Service[] = [
  {
    title: "Renta de vestidos",
    description:
      "Diseños inolvidables para tu evento, sin comprometer tu presupuesto.",
    icon: ServiceIcon.SPARKLES,
  },
  {
    title: "Venta de vestidos",
    description:
      "Encuentra esa pieza especial que querrás conservar para siempre.",
    icon: ServiceIcon.SHOPPING_BAG,
  },
  {
    title: "Asesoría personalizada",
    description:
      "Te ayudamos a elegir el corte, color y talla que mejor realzan tu estilo.",
    icon: ServiceIcon.HEART_HANDSHAKE,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Elige tu vestido",
    description: "Explora nuestros estilos y guarda tus favoritos.",
  },
  {
    number: "02",
    title: "Escríbenos",
    description: "Confirma disponibilidad y recibe asesoría por WhatsApp.",
  },
  {
    number: "03",
    title: "Aparta tu fecha",
    description: "Agenda tu prueba y asegura el vestido para tu evento.",
  },
  {
    number: "04",
    title: "Luce espectacular",
    description: "Recibe tu vestido listo para hacer de tu noche algo único.",
  },
];

export const DRESSES: Dress[] = [
  {
    id: "rojo-1",
    name: "Rojo intenso",
    price: 850,
    sizes: ["CH", "M"],
    color: "champagne",
    imageUrl: "/images/dresses/1.jpg",
    category: DressCategory.EVENING,
    isAvailable: true,
  },
  {
    id: "oro-rosa",
    name: "Oro rosa",
    price: 850,
    sizes: ["M", "G"],
    color: "verde esmeralda",
    imageUrl: "/images/dresses/2.jpg",
    category: DressCategory.GRADUATION,
    isAvailable: true,
  },
  {
    id: "negro-cuero",
    name: "Negro cuero",
    price: 850,
    sizes: ["XS", "CH", "M"],
    color: "rosa empolvado",
    imageUrl: "/images/dresses/3.jpg",
    category: DressCategory.QUINCEANERA,
    isAvailable: true,
  },
  {
    id: "purpura-bizantino",
    name: "Púrpura bizantino",
    price: 850,
    sizes: ["M", "G", "XG"],
    color: "negro",
    imageUrl: "/images/dresses/4.jpg",
    category: DressCategory.EVENING,
    isAvailable: true,
  },
  {
    id: "azul-crepusculo",
    name: "Azul Crepúsculo",
    price: 850,
    sizes: ["CH", "M"],
    color: "marfil",
    imageUrl: "/images/dresses/5.jpg",
    category: DressCategory.WEDDING,
    isAvailable: true,
  },
  {
    id: "cuarzo-rosa",
    name: "Cuarzo rosa",
    price: 850,
    sizes: ["CH", "M", "G"],
    color: "rojo vino",
    imageUrl: "/images/dresses/6.jpg",
    category: DressCategory.GRADUATION,
    isAvailable: true,
  },
];
