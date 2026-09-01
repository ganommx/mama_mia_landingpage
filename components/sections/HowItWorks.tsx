import { CalendarCheck2, Check, Package, Shirt } from "lucide-react";

import { SectionTitle } from "@/components/ui/SectionTitle";

type Step = {
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Elige tu vestido",
    description:
      "Explora nuestros estilos y encuentra el vestido ideal para tu evento.",
  },
  {
    number: "02",
    title: "Confirma disponibilidad",
    description:
      "Escríbenos por WhatsApp con tu fecha y el vestido que te interesa.",
  },
  {
    number: "03",
    title: "Agenda tu prueba",
    description:
      "Visítanos con anticipación para confirmar tu elección y realizar ajustes básicos si son necesarios.",
  },
  {
    number: "04",
    title: "¡Lista para tu evento!",
    description:
      "Recoge tu vestido un día antes y disfruta de tu ocasión especial.",
  },
];

const REQUIREMENTS = [
  {
    icon: Shirt,
    text: "Asistir al menos 6 días antes de tu evento por posibles ajustes de costura básica.",
  },
  {
    icon: Check,
    text: "Presentar INE vigente.",
  },
  {
    icon: Check,
    text: "Presentar comprobante de domicilio vigente.",
  },
  {
    icon: Check,
    text: "Dejar un depósito de $500 pesos.",
  },
  {
    icon: Package,
    text: "Recoger el vestido un día antes de tu evento.",
  },
  {
    icon: CalendarCheck2,
    text: "Entregar el vestido el lunes posterior a tu evento.",
  },
  {
    icon: CalendarCheck2,
    text: "Si la renta es entre semana, la entrega del vestido será el día posterior a tu evento.",
  },
  {
    icon: Check,
    text: "Por cada día de retraso en la entrega, se aplicará un cargo de $100.",
  },
];

export const HowItWorks = () => (
  <section
    className="bg-brand-secondary px-5 py-20 sm:px-8 sm:py-28"
    id="como-funciona"
  >
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        description="Cuatro pasos simples entre tú y el vestido que estabas buscando."
        eyebrow="Así de fácil"
        light
        title="Tu look listo, sin complicaciones"
      />
      <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ description, number, title }, index) => (
          <li className="relative border-t border-white/15 pt-7" key={number}>
            <span className="font-display text-5xl text-brand-primary/55">
              {number}
            </span>
            <h3 className="mt-5 font-display text-2xl text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">
              {description}
            </p>
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-4 top-6 hidden text-brand-primary/50 lg:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-[2rem] border border-white/20 bg-white/[0.04] p-7 sm:p-10">
        <h3 className="text-center font-display text-2xl text-white sm:text-3xl">
          Antes de rentar
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-white/60 sm:text-base">
          Revisa los requisitos y condiciones importantes antes de realizar tu
          renta.
        </p>
        <ul className="mt-9 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {REQUIREMENTS.map(({ icon: Icon, text }) => (
            <li
              className="flex items-start gap-3 border-b border-white/10 pb-5 text-sm leading-6 text-white/75 sm:text-[15px]"
              key={text}
            >
              <Icon
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-brand-primary"
                size={18}
              />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
