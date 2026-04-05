"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const faqs = [
  { q: "OriginAI 和普通 VPN 有什么区别？", a: "OriginAI 只路由 Anthropic 相关流量（claude.ai、api.anthropic.com），不是全局 VPN。您的其他网络活动完全不受影响，延迟更低，也不会触发其他网站的风控检测。我们专注做一件事，把它做到极致。" },
  { q: "你们能看到我的对话内容吗？", a: "不能。您与 Claude 之间的通信是端到端 TLS 加密的，加密发生在您的浏览器或 CLI 中，解密发生在 Anthropic 的服务器上。OriginAI 只在网络层做流量转发，看到的是加密后的密文，技术上无法读取任何对话内容。这是架构保证，不是承诺保证。" },
  { q: "账号会被封禁吗？", a: "我们使用合法购买的账号，配合纯净的美国家庭住宅 IP，使用模式与正常美国用户完全一致，风控风险极低。同时我们持续监控每个账号的健康状态，一旦出现异常会主动处理，确保服务不中断。" },
  { q: "支持哪些使用方式？", a: "支持 Claude.ai 网页版和 Claude Code CLI 命令行工具。安装 OriginAI 桌面客户端后，开启连接即可无缝使用。客户端支持 macOS、Windows 和 Linux 三大桌面平台。" },
  { q: "如何保证使用的是正版模型？", a: "您使用的是 Anthropic 官方账号，所有请求直接发往 Anthropic 官方服务器。我们不做任何 API 转发、请求改写或模型替换。您收到的每一个回复都来自您所选套餐对应的官方模型，与在美国直接使用完全一致。" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-[600px] mx-auto">
        <SectionHeader label="FAQ" title="常见问题" />
        <AnimateOnScroll>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
                >
                  <span className="text-[14px] font-medium text-text group-hover:text-brand transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${openIndex === i ? "text-brand" : "text-text-faint"}`}
                  >
                    <RiArrowDownSLine size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[13px] text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
