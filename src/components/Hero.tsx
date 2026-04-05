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
    <section className="pt-40 pb-16 px-6">
      <motion.div
        className="max-w-[1080px] mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] tracking-[5px] text-brand font-serif mb-6"
        >
          AUTHENTIC RELAY
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-[42px] font-light text-text leading-snug md:leading-relaxed"
        >
          源于官方，忠于原版
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-10 h-px bg-brand mx-auto my-6"
        />

        <motion.p
          variants={fadeUp}
          className="text-[14px] text-text-muted leading-relaxed"
        >
          为中国用户提供极致的 AI 体验
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex gap-3 justify-center flex-wrap"
        >
          <a
            href="#waitlist"
            className="px-7 py-2.5 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
          >
            立即开始
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
