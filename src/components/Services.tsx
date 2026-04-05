"use client";

import { RiShieldKeyholeLine, RiHome4Line, RiLockLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  {
    icon: RiShieldKeyholeLine,
    title: "合规账号",
    desc: "美国本土信用卡购买\n1:1 独享，零风控",
  },
  {
    icon: RiHome4Line,
    title: "纯净网络",
    desc: "美国家庭住宅 IP\n非机房，非数据中心",
  },
  {
    icon: RiLockLine,
    title: "零知识隧道",
    desc: "端到端 TLS 加密\n我们无法读取您的数据",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="SERVICES" title="我们提供什么" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.title} delay={i * 0.1}>
              <div className="bg-bg-card border border-border rounded-xl p-7 text-center hover:border-border-strong transition-colors">
                <service.icon className="mx-auto mb-4 text-brand" size={28} />
                <h3 className="text-[15px] font-medium text-text mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
                  {service.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
