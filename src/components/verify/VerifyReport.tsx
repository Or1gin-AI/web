"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/context";
import type { VerifyResult, QualityReport } from "@/app/[locale]/verify/page";

interface VerifyReportProps {
  result: VerifyResult;
  onReset: () => void;
  backendUrl: string;
}

const verdictConfig = {
  real: {
    color: "#2d8a56",
    border: "border-l-[#2d8a56]",
    pill: "bg-[rgba(45,138,86,0.12)] text-[#2d8a56]",
    bar: "#2d8a56",
  },
  suspicious: {
    color: "#d97706",
    border: "border-l-[#d97706]",
    pill: "bg-[rgba(217,119,6,0.12)] text-[#d97706]",
    bar: "#d97706",
  },
  fake: {
    color: "#c53030",
    border: "border-l-[#c53030]",
    pill: "bg-[rgba(197,48,48,0.12)] text-[#c53030]",
    bar: "#c53030",
  },
} as const;

const checkIcon: Record<string, { symbol: string; cls: string }> = {
  pass: { symbol: "\u2713", cls: "text-[#2d8a56]" },
  warn: { symbol: "!", cls: "text-[#d97706]" },
  fail: { symbol: "\u2717", cls: "text-[#c53030]" },
  skip: { symbol: "\u25cb", cls: "text-text-faint" },
};

export default function VerifyReport({ result, onReset, backendUrl }: VerifyReportProps) {
  const { t } = useLocale();
  const v = verdictConfig[result.verdict];
  const { stats } = result;
  const snapRef = useRef<HTMLDivElement>(null);
  const [snapping, setSnapping] = useState(false);
  const [open, setOpen] = useState(true);

  const totalNonSkip = stats.pass + stats.warn + stats.fail;
  const score =
    totalNonSkip > 0 ? Math.round((stats.pass / totalNonSkip) * 100) : 0;

  const circumference = 2 * Math.PI * 40;
  const ringOffset = circumference - (score / 100) * circumference;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Auto-submit to leaderboard
  useEffect(() => {
    fetch(`${backendUrl}/api/verify/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verdict: result.verdict,
        confidence: result.confidence,
        stats: result.stats,
      }),
    }).catch(() => {});
  }, [backendUrl, result]);

  const handleClose = () => {
    setOpen(false);
    onReset();
  };

  const saveSnapshot = async () => {
    if (!snapRef.current || snapping) return;
    setSnapping(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(snapRef.current, {
        scale: 2,
        backgroundColor: "#faf8f5",
        useCORS: true,
        logging: false,
        scrollY: 0,
        windowHeight: snapRef.current.scrollHeight,
        height: snapRef.current.scrollHeight,
      });
      const link = document.createElement("a");
      const now = new Date();
      const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      link.download = `verify-report-${ts}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // silent
    } finally {
      setSnapping(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[rgba(26,26,26,0.25)] backdrop-blur-[8px]" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[520px] max-h-[90vh] bg-bg rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.12),0_0_0_1px_var(--color-border)] overflow-hidden flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-bg-alt text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div ref={snapRef}>
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="font-mono text-[10px] tracking-[3px] text-brand mb-1.5">
                    {t.verify.label}
                  </div>
                  <h2 className="font-serif text-[20px] text-text">
                    {t.verify.report.checks}
                  </h2>
                </div>

                {/* Score ring + verdict */}
                <div className="flex items-center justify-center gap-5 mb-5">
                  <div className="relative w-[80px] h-[80px] flex-shrink-0">
                    <svg
                      viewBox="0 0 96 96"
                      className="w-full h-full"
                      style={{ transform: "rotate(-90deg)" }}
                    >
                      <circle cx="48" cy="48" r="40" fill="none" stroke="var(--color-bg-alt)" strokeWidth="7" />
                      <motion.circle
                        cx="48" cy="48" r="40"
                        fill="none" stroke={v.color} strokeWidth="7" strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: ringOffset }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[22px] font-extrabold leading-none" style={{ color: v.color }}>
                        {score}
                      </span>
                      <span className="text-[10px] text-text-muted mt-0.5">
                        {t.verify.report.score}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[13px] font-semibold ${v.pill} mb-1.5`}>
                      {t.verify.report[result.verdict]}
                    </span>
                    <div className="text-[12px] text-text-muted">
                      {t.verify.report.confidence} {result.confidence}%
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  <div className="bg-bg-card border border-border rounded-xl py-3 text-center">
                    <div className="text-[20px] font-bold text-[#2d8a56]">{stats.pass}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{t.verify.report.pass}</div>
                  </div>
                  <div className="bg-bg-card border border-border rounded-xl py-3 text-center">
                    <div className="text-[20px] font-bold text-[#c53030]">{stats.fail + stats.warn}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{t.verify.report.fail}</div>
                  </div>
                  <div className="bg-bg-card border border-border rounded-xl py-3 text-center">
                    <div className="text-[20px] font-bold text-brand">{totalNonSkip}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{t.verify.report.total}</div>
                  </div>
                </div>

                {/* Check list */}
                <div className={`bg-bg-card border border-border border-l-[3px] ${v.border} rounded-2xl p-4`}>
                  {/* Progress bar */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-text-muted">{t.verify.report.checks}</span>
                    <span className="text-[11px] text-text-muted">
                      {t.verify.report.passedOf(stats.pass, totalNonSkip)}
                    </span>
                  </div>
                  <div className="h-1 bg-bg-alt rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ backgroundColor: v.bar }}
                    />
                  </div>

                  {/* Items */}
                  <div className="space-y-0.5">
                    {result.results.map((test) => {
                      const ci = checkIcon[test.status] || checkIcon.skip;
                      return (
                        <div
                          key={`${test.phase}-${test.test}`}
                          className="flex items-center justify-between py-1.5 px-1"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`font-mono text-[13px] w-4 text-center flex-shrink-0 font-bold ${ci.cls}`}>
                              {ci.symbol}
                            </span>
                            <span className="text-[13px] text-text truncate">
                              {test.name}
                            </span>
                          </div>
                          {test.duration != null && (
                            <span className="text-[11px] font-mono text-text-faint flex-shrink-0 ml-2">
                              {test.duration}ms
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quality Report — Phase 5 */}
                {result.quality && result.quality.dilution >= 0 && (
                  <div className="mt-4 bg-bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
                        输出质量
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Dilution + Predicted Model */}
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <div className="bg-bg border border-border rounded-xl py-3 text-center">
                        <div
                          className="text-[20px] font-bold"
                          style={{
                            color: result.quality.dilution < 15
                              ? "#2d8a56"
                              : result.quality.dilution < 35
                              ? "#d97706"
                              : "#c53030",
                          }}
                        >
                          {result.quality.dilution}%
                        </div>
                        <div className="text-[10px] text-text-muted mt-0.5">掺水率</div>
                      </div>
                      <div className="bg-bg border border-border rounded-xl py-3 text-center">
                        <div className="text-[13px] font-bold text-text truncate px-2">
                          {result.quality.predictedModel}
                        </div>
                        <div className="text-[10px] text-text-muted mt-0.5">
                          推测模型 ({result.quality.modelConfidence}%)
                        </div>
                      </div>
                    </div>

                    {/* Similarity bars */}
                    <div className="space-y-1.5 mb-3">
                      {Object.entries(result.quality.similarities)
                        .sort(([, a], [, b]) => b - a)
                        .map(([model, sim]) => (
                          <div key={model} className="flex items-center gap-2">
                            <span className="text-[11px] text-text-muted w-[140px] truncate flex-shrink-0">
                              {model}
                            </span>
                            <div className="flex-1 h-1.5 bg-bg-alt rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.max(sim * 100, 0)}%`,
                                  backgroundColor:
                                    model.includes("opus")
                                      ? "#2d8a56"
                                      : model.includes("sonnet")
                                      ? "#3b82f6"
                                      : model.includes("haiku")
                                      ? "#8b5cf6"
                                      : "#6b7280",
                                }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-text-faint w-[40px] text-right flex-shrink-0">
                              {(sim * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* Summary */}
                    {result.quality.summary && (
                      <p className="text-[12px] text-text-muted leading-relaxed border-t border-border pt-3">
                        {result.quality.summary}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer buttons — fixed at bottom */}
            <div className="border-t border-border p-4 space-y-3 bg-bg">
              <div className="text-center">
                <button
                  onClick={saveSnapshot}
                  disabled={snapping}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, var(--color-brand), #c4956e)",
                    boxShadow: "0 2px 10px rgba(155,123,90,0.25)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  {snapping ? "..." : t.verify.report.snapshot}
                </button>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-brand text-white text-[13px] font-semibold rounded-full hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t.verify.report.rerun}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
