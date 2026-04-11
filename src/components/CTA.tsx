"use client";

import AnimateOnScroll from "./AnimateOnScroll";
import { useLocale } from "@/i18n/context";

export default function CTA() {
  const { t } = useLocale();

  const scrollToDownload = () => {
    document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="start" className="py-20 px-6">
      <AnimateOnScroll className="text-center">
        <h2 className="font-serif text-[24px] font-light text-text">
          {t.cta.title}
        </h2>
        <p className="text-[14px] text-text-muted mt-3">
          {t.cta.subtitle}
        </p>
        <button
          onClick={scrollToDownload}
          className="inline-block mt-7 px-9 py-3 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
        >
          {t.cta.button}
        </button>
      </AnimateOnScroll>
    </section>
  );
}
