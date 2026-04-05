"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WhitepaperModal from "./WhitepaperModal";
import { useLocale } from "@/i18n/context";

export default function WhitepaperCard() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      setIsOpen(true);
      const section = (e as CustomEvent).detail;
      if (section) {
        setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    };
    window.addEventListener("open-whitepaper", handleOpen);
    return () => window.removeEventListener("open-whitepaper", handleOpen);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="max-w-[1080px] mx-auto px-6 pb-16"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-6 md:p-7 bg-bg-card border border-border rounded-xl flex items-center gap-6 text-left hover:border-border-strong transition-colors cursor-pointer group"
        >
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] tracking-[2px] text-brand mb-1">
              WHITEPAPER
            </p>
            <h3 className="text-[16px] md:text-[17px] font-medium text-text mb-1 truncate">
              {t.whitepaperCard.title}
            </h3>
            <p className="text-[13px] text-text-muted">
              {t.whitepaperCard.desc}
            </p>
          </div>
          <span className="shrink-0 text-[13px] text-brand group-hover:translate-x-0.5 transition-transform">
            {t.whitepaperCard.readMore}
          </span>
        </button>
      </motion.div>

      <WhitepaperModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
