"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLocale } from "@/i18n/context";

export default function Features() {
  const { t } = useLocale();

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label={t.features.label} title={t.features.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.features.items.map((feature, i) => (
            <AnimateOnScroll key={i} delay={i * 0.08}>
              <div className="bg-bg-card border border-border rounded-xl p-6 flex gap-4 items-start hover:border-border-strong transition-colors">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand mt-2" />
                <div>
                  <h3 className="text-[14px] font-medium text-text mb-1">{feature.title}</h3>
                  <p className="text-[13px] text-text-muted">{feature.desc}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
