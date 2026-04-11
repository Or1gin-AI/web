"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/i18n/context";

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
  const { t } = useLocale();

  const scrollToDownload = () => {
    document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex items-center justify-center px-6 py-24 md:py-36">
      <motion.div
        className="max-w-[1080px] mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-[11px] tracking-[4px] text-brand mb-3"
        >
          ORIGINAI
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-[42px] font-light text-text leading-snug md:leading-relaxed"
        >
          {t.hero.title}
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-10 h-px bg-brand mx-auto my-6"
        />

        <motion.p
          variants={fadeUp}
          className="text-[14px] text-text-muted leading-relaxed"
        >
          {t.hero.subtitle1}
          <br />
          {t.hero.subtitle2}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex gap-3 justify-center items-center flex-wrap"
        >
          <button
            onClick={scrollToDownload}
            className="px-7 py-2.5 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
          >
            {t.hero.primaryCta}
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-whitepaper"))}
            className="px-7 py-2.5 border border-brand/40 bg-white text-text-secondary text-[13px] rounded hover:border-brand transition-colors cursor-pointer"
          >
            {t.hero.secondaryCta}
          </button>
          <Link
            href="/docs"
            className="px-7 py-2.5 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
          >
            {t.hero.docsCta}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
