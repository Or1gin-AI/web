"use client";

import AnimateOnScroll from "./AnimateOnScroll";
import { useLocale } from "@/i18n/context";

export default function CTA() {
  const { t } = useLocale();
  return (
    <section id="waitlist" className="py-20 px-6">
      <AnimateOnScroll className="text-center">
        <h2 className="font-serif text-[24px] font-light text-text">
          {t.cta.title}
        </h2>
        <p className="text-[14px] text-text-muted mt-3">
          {t.cta.subtitle}
        </p>
        <a
          href="https://wt.ls/origin-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-7 px-9 py-3 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
        >
          {t.cta.button}
        </a>
      </AnimateOnScroll>
    </section>
  );
}
