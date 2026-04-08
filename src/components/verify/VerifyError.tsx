"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

interface VerifyErrorProps {
  message: string;
  onRetry: () => void;
}

export default function VerifyError({ message, onRetry }: VerifyErrorProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[rgba(184,92,92,0.06)] border border-[rgba(184,92,92,0.2)] rounded-xl p-7 text-center"
    >
      <div className="text-[28px] font-mono text-[#b85c5c] mb-3">{"\u2717"}</div>
      <h3 className="font-serif text-[16px] text-text mb-2">
        {t.verify.error.title}
      </h3>
      <p className="text-[13px] text-text-muted mb-5">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 bg-dark text-bg text-[13px] rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
      >
        {t.verify.error.retry}
      </button>
    </motion.div>
  );
}
