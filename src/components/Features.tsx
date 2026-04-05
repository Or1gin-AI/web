"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  { title: "官网原版体验", desc: "直连 Anthropic 官方，不替换模型" },
  { title: "开源可审计", desc: "客户端代码完全公开" },
  { title: "双场景兼容", desc: "Claude.ai 网页版 + Claude Code CLI" },
  { title: "全流程托管", desc: "账号维护、续费、监控全由我们处理" },
];

export default function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="ADVANTAGES" title="为什么选择 OriginAI" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={i * 0.08}>
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
