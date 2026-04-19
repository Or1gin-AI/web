"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLocale } from "@/i18n/context";

const plans = [
  { name: "CLAUDE PRO", price: "$20", recommended: false },
  { name: "CLAUDE MAX 5×", price: "$100", recommended: false },
  { name: "CLAUDE MAX 20×", price: "$200", recommended: true },
] as const;

export default function Pricing() {
  const { t } = useLocale();

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label={t.pricing.label} title={t.pricing.title} />

        <AnimateOnScroll>
          <div className="relative bg-bg-card border-2 border-brand rounded-xl p-8 text-center max-w-[560px] mx-auto mb-10">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
              {t.pricing.limitedTag}
            </span>
            <p className="text-[11px] tracking-[2px] mb-2 text-brand">
              {t.pricing.serviceFeeLabel}
            </p>
            <div className="flex items-baseline justify-center gap-3">
              <p className="font-serif text-[36px] font-light text-text">$10</p>
              <p className="font-serif text-[20px] font-light text-text-faint line-through">$20</p>
            </div>
            <p className="text-[11px] text-text-muted mt-1">{t.pricing.serviceFeeNote}</p>
            <p className="text-[11px] text-text-faint mt-3">{t.pricing.serviceFeeDesc}</p>
          </div>
        </AnimateOnScroll>

        <p className="text-center text-[12px] text-text-muted mb-4 tracking-wider">
          {t.pricing.plusClaude}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 0.1}>
              <div className={`relative bg-bg-card rounded-xl p-8 text-center ${
                plan.recommended ? "border-2 border-brand" : "border border-border"
              }`}>
                {plan.recommended && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
                    {t.pricing.recommended}
                  </span>
                )}
                <p className={`text-[11px] tracking-[2px] mb-2 ${plan.recommended ? "text-brand" : "text-text-muted"}`}>
                  {plan.name}
                </p>
                <p className="font-serif text-[28px] font-light text-text">{plan.price}</p>
                <p className="text-[11px] text-text-muted mt-1">{t.pricing.priceNote}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <p className="text-center text-[12px] text-text-faint mt-6">
          {t.pricing.disclaimer}
        </p>
        <p className="text-center text-[12px] text-text-faint mt-2">
          {t.pricing.openRouterNote}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-whitepaper", { detail: "openrouter" }))}
            className="text-brand hover:underline cursor-pointer"
          >
            {t.pricing.openRouterLink}
          </button>
        </p>
      </div>
    </section>
  );
}
