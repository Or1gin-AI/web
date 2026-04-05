"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const plans = [
  { name: "PRO", price: "$20", priceNote: "/月 官网价格", recommended: true, comingSoon: false, cta: "选择方案" },
  { name: "TEAM", price: "$30", priceNote: "/月 官网价格", recommended: false, comingSoon: true, cta: null },
  { name: "MAX", price: "$100 / $200", priceNote: "/月 官网价格", recommended: false, comingSoon: false, cta: "选择方案" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="PRICING" title="价格方案" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 0.1}>
              <div className={`relative bg-bg-card rounded-xl p-8 text-center ${
                plan.recommended ? "border-2 border-brand" : "border border-border"
              } ${plan.comingSoon ? "opacity-60" : ""}`}>
                {plan.recommended && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
                    推荐
                  </span>
                )}
                {plan.comingSoon && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-text-muted text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
                    Coming Soon
                  </span>
                )}
                <p className={`text-[11px] tracking-[2px] mb-3 ${plan.recommended ? "text-brand" : "text-text-muted"}`}>
                  {plan.name}
                </p>
                <p className="font-serif text-[28px] font-light text-text">{plan.price}</p>
                <p className="text-[11px] text-text-muted mt-1">{plan.priceNote}</p>
                <p className="text-[10px] text-text-faint mt-2">+ 平台服务费</p>
                {plan.cta && (
                  <a href="#waitlist" className={`block mt-5 py-2.5 rounded text-[12px] transition-opacity hover:opacity-90 ${
                    plan.recommended ? "bg-dark text-bg" : "border border-brand/40 text-text-secondary"
                  }`}>
                    {plan.cta}
                  </a>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <p className="text-center text-[12px] text-text-faint mt-6">
          具体以结算价格为准 · 所有方案均为 1:1 独享账号
        </p>
      </div>
    </section>
  );
}
