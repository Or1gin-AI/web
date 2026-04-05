"use client";

import { RiShieldKeyholeLine, RiHome4Line, RiLockLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLocale } from "@/i18n/context";

const icons = [RiShieldKeyholeLine, RiHome4Line, RiLockLine];

export default function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label={t.services.label} title={t.services.title} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="bg-bg-card border border-border rounded-xl p-7 text-center hover:border-border-strong transition-colors">
                  <Icon className="mx-auto mb-4 text-brand" size={28} />
                  <h3 className="text-[15px] font-medium text-text mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
                    {service.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
