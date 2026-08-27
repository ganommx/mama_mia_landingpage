"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { FAQ_ITEMS } from "@/constants/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const FAQ = () => {
  const [openItemId, setOpenItemId] = useState<string | null>(
    FAQ_ITEMS[0]?.id ?? null,
  );

  return (
    <section
      className="bg-brand-soft px-5 py-10 sm:px-8 sm:py-10"
      id="preguntas"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle
          align="left"
          description="Si no encuentras lo que buscas, escríbenos. Estamos para acompañarte."
          eyebrow="Preguntas frecuentes"
          title="Todo claro antes de tu evento"
        />
        <div className="divide-y divide-brand-secondary/10 border-y border-brand-secondary/10">
          {FAQ_ITEMS.map(({ answer, id, question }) => {
            const isOpen = openItemId === id;
            const panelId = `faq-panel-${id}`;

            return (
              <div key={id}>
                <h3>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-xl text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    id={`faq-button-${id}`}
                    onClick={() => setOpenItemId(isOpen ? null : id)}
                    type="button"
                  >
                    {question}
                    {isOpen ? (
                      <Minus aria-hidden="true" size={20} />
                    ) : (
                      <Plus aria-hidden="true" size={20} />
                    )}
                  </button>
                </h3>
                <div
                  aria-labelledby={`faq-button-${id}`}
                  className="pb-6 pr-10 leading-7 text-brand-secondary/65"
                  hidden={!isOpen}
                  id={panelId}
                  role="region"
                >
                  {answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
