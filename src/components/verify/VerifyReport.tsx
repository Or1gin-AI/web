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
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(snapRef.current, {
        pixelRatio: 2,
        backgroundColor: "#faf8f5",
        skipFonts: true,
        style: { overflow: "visible" },
      });
      const link = document.createElement("a");
      const now = new Date();
      const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      link.download = `verify-report-${ts}.png`;
      link.href = dataUrl;
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

                {/* Fingerprint + Quality side by side */}
                {/* Fingerprint + Quality side by side */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Fingerprint */}
                  <div className="bg-bg-card border border-border rounded-2xl p-4 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
                        {t.verify.report.fingerprint}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="bg-bg border border-border rounded-xl py-3 text-center mb-2">
                      <div className="text-[20px] font-bold text-[#c53030]">
                        {stats.fail + stats.warn}
                      </div>
                      <div className="text-[10px] text-text-muted mt-0.5">{t.verify.report.issues}</div>
                    </div>

                    {result.results.filter((r) => r.status === "fail" || r.status === "warn").length > 0 ? (
                      <div className="space-y-1 mt-auto">
                        {result.results
                          .filter((r) => r.status === "fail" || r.status === "warn")
                          .map((test) => {
                            const ci = checkIcon[test.status] || checkIcon.skip;
                            return (
                              <div key={`${test.phase}-${test.test}`} className="flex items-center gap-1.5 py-0.5">
                                <span className={`font-mono text-[11px] w-3.5 text-center flex-shrink-0 font-bold ${ci.cls}`}>
                                  {ci.symbol}
                                </span>
                                <span className="text-[11px] text-text-muted truncate">{test.name}</span>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#2d8a56] mt-auto">{t.verify.report.allPassed}</p>
                    )}
                  </div>

                  {/* Quality */}
                  {result.quality && result.quality.dilution >= 0 ? (
                    (() => {
                      const matchRate = 100 - result.quality.dilution;
                      return (
                        <div className="bg-bg-card border border-border rounded-2xl p-4 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
                              {t.verify.report.quality}
                            </span>
                            <div className="flex-1 h-px bg-border" />
                          </div>

                          <div className="bg-bg border border-border rounded-xl py-3 text-center mb-2">
                            <div
                              className="text-[20px] font-bold"
                              style={{
                                color: matchRate >= 85
                                  ? "#2d8a56"
                                  : matchRate >= 65
                                  ? "#d97706"
                                  : "#c53030",
                              }}
                            >
                              {matchRate}%
                            </div>
                            <div className="text-[10px] text-text-muted mt-0.5">{t.verify.report.matchRate}</div>
                          </div>

                          {result.quality.summary && (
                            <p className="text-[11px] text-text-muted leading-relaxed">
                              {result.quality.summary}
                            </p>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center">
                      <span className="text-[11px] text-text-faint">{t.verify.report.quality}</span>
                      <span className="text-[10px] text-text-faint mt-1">—</span>
                    </div>
                  )}
                </div>
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
