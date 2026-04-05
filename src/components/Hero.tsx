"use client";

import { motion, Variants } from "framer-motion";

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="flex items-center justify-center px-6 py-12 md:py-20">
      <motion.div
        className="max-w-[1080px] mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-[42px] font-light text-text leading-snug md:leading-relaxed"
        >
          AI 界的头等舱
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-10 h-px bg-brand mx-auto my-6"
        />

        <motion.p
          variants={fadeUp}
          className="text-[14px] text-text-muted leading-relaxed"
        >
          正规邮箱账号 · 美国信用卡订阅 · 纯净家庭 IP
          <br />
          告别封号，告别中转站，像美国人一样使用 Claude
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex gap-3 justify-center flex-wrap"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-whitepaper"))}
            className="px-7 py-2.5 border border-brand/40 text-text-secondary text-[13px] rounded hover:border-brand transition-colors cursor-pointer"
          >
            阅读白皮书
          </button>
          <a
            href="https://wt.ls/origin-ai" target="_blank" rel="noopener noreferrer"
            className="px-7 py-2.5 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
          >
            抢先体验
          </a>
          <a
            href="#services"
            className="px-7 py-2.5 border border-brand/40 text-text-secondary text-[13px] rounded hover:border-brand transition-colors"
          >
            了解更多
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
