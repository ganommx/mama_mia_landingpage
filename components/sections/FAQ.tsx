"use client";

import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { FAQ_ITEMS } from "@/constants/faq";
import { SectionTitle } from "@/components/ui/SectionTitle";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export const FAQ = () => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const getMaxHeight = (id: string) => {
    const el = contentRefs.current[id];
    return el ? `${el.scrollHeight}px` : "0px";
  };

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
                    <span
                      className="shrink-0 transition-transform duration-300"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {isOpen ? (
                        <Minus aria-hidden="true" size={20} />
                      ) : (
                        <Plus aria-hidden="true" size={20} />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  aria-labelledby={`faq-button-${id}`}
                  className="overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out"
                  style={{
                    maxHeight: isOpen ? getMaxHeight(id) : "0px",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                    transitionTimingFunction: EASE,
                  }}
                >
                  <div
                    className="pb-6 pr-10 leading-7 text-brand-secondary/65"
                    ref={(el) => {
                      contentRefs.current[id] = el;
                    }}
                  >
                    {answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
