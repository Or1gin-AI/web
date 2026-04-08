"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/context";
import type { TestEvidence } from "@/app/[locale]/verify/page";

interface EvidenceCardProps {
  evidence: TestEvidence;
  status: "pass" | "warn" | "fail" | "skip";
}

const borderColors = {
  pass: "border-[#2d8a56]",
  warn: "border-[#d97706]",
  fail: "border-[#c53030]",
  skip: "border-border",
} as const;

export default function EvidenceCard({ evidence, status }: EvidenceCardProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="pt-2 pb-1 px-1 space-y-3">
        {/* Expected vs Actual comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[rgba(45,138,86,0.06)] border border-[rgba(45,138,86,0.2)] rounded-xl p-3">
            <div className="text-[10px] font-mono tracking-wider text-[#2d8a56] mb-1.5">
              {t.verify.evidence.expected}
            </div>
            <div className="text-[12px] text-text leading-relaxed">
              {evidence.expected}
            </div>
          </div>
          <div
            className={`bg-[rgba(197,48,48,0.04)] border ${borderColors[status]} rounded-xl p-3`}
          >
            <div
              className={`text-[10px] font-mono tracking-wider mb-1.5 ${
                status === "pass"
                  ? "text-[#2d8a56]"
                  : status === "warn"
                    ? "text-[#d97706]"
                    : "text-[#c53030]"
              }`}
            >
              {t.verify.evidence.actual}
            </div>
            <div className="text-[12px] text-text leading-relaxed">
              {evidence.actual}
            </div>
          </div>
        </div>

        {/* Evidence items (for multi-item tests) */}
        {evidence.items && evidence.items.length > 0 && (
          <div className="space-y-1">
            {evidence.items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] ${
                  item.correct
                    ? "bg-[rgba(45,138,86,0.05)]"
                    : "bg-[rgba(197,48,48,0.05)]"
                }`}
              >
                <span
                  className={`font-mono w-3 text-center flex-shrink-0 ${
                    item.correct ? "text-[#2d8a56]" : "text-[#c53030]"
                  }`}
                >
                  {item.correct ? "\u2713" : "\u2717"}
                </span>
                <span className="font-mono text-text-muted w-20 flex-shrink-0">
                  {item.label}
                </span>
                <span className="text-text-muted truncate">{item.actual}</span>
              </div>
            ))}
          </div>
        )}

        {/* Raw output */}
        {evidence.raw && (
          <div className="bg-[#f5f3f0] rounded-xl p-3">
            <div className="text-[10px] font-mono tracking-wider text-text-faint mb-1.5">
              {t.verify.evidence.rawOutput}
            </div>
            <pre className="text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-all leading-relaxed">
              {evidence.raw}
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
}
