"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/context";
import EvidenceCard from "@/components/verify/EvidenceCard";
import type { VerifyResult } from "@/app/[locale]/verify/page";

interface VerifyReportProps {
  result: VerifyResult;
  onReset: () => void;
  backendUrl: string;
}

const verdictConfig = {
  real: { icon: "\u2713", color: "text-[#6b8f71]", bg: "bg-[rgba(107,143,113,0.08)]", border: "border-[rgba(107,143,113,0.2)]" },
  suspicious: { icon: "!", color: "text-[#b8944a]", bg: "bg-[rgba(184,148,74,0.08)]", border: "border-[rgba(184,148,74,0.2)]" },
  fake: { icon: "\u2717", color: "text-[#b85c5c]", bg: "bg-[rgba(184,92,92,0.08)]", border: "border-[rgba(184,92,92,0.2)]" },
} as const;

const statusConfig = {
  pass: { bg: "bg-[rgba(107,143,113,0.08)]", icon: "text-[#6b8f71]", symbol: "\u2713" },
  warn: { bg: "bg-[rgba(184,148,74,0.08)]", icon: "text-[#b8944a]", symbol: "!" },
  fail: { bg: "bg-[rgba(184,92,92,0.08)]", icon: "text-[#b85c5c]", symbol: "\u2717" },
  skip: { bg: "", icon: "text-text-faint", symbol: "\u25cb" },
} as const;

export default function VerifyReport({ result, onReset }: VerifyReportProps) {
  const { t } = useLocale();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);

  const vCfg = verdictConfig[result.verdict];
  const phaseNames = t.verify.pipeline.phases;

  const phaseGroups: Record<number, typeof result.results> = {};
  for (const r of result.results) {
    if (!phaseGroups[r.phase]) phaseGroups[r.phase] = [];
    phaseGroups[r.phase].push(r);
  }

  const failCount = result.stats.fail;

  const statItems = [
    { key: "pass" as const, value: result.stats.pass, color: "text-[#6b8f71]" },
    { key: "warn" as const, value: result.stats.warn, color: "text-[#b8944a]" },
    { key: "fail" as const, value: result.stats.fail, color: "text-[#b85c5c]" },
    { key: "skip" as const, value: result.stats.skip, color: "text-text-faint" },
  ];

  const toggleTest = (key: string) => {
    setExpandedTest((prev) => (prev === key ? null : key));
  };

  return (
    <div className="space-y-5">
      {/* Verdict card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`${vCfg.bg} border ${vCfg.border} rounded-xl p-7 text-center`}
      >
        <div className={`text-[32px] font-mono ${vCfg.color} mb-2`}>{vCfg.icon}</div>
        <h2 className={`font-serif text-[18px] ${vCfg.color} mb-1.5`}>
          {t.verify.report[result.verdict]}
        </h2>
        <p className="text-[13px] text-text-muted">
          {t.verify.report.confidence} {result.confidence}%
          {failCount > 0 && (
            <span className="ml-2">&middot; {failCount} {t.verify.report.issues}</span>
          )}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div key={item.key} className="bg-bg-card border border-border rounded-lg p-3 text-center">
            <div className={`font-serif text-[22px] ${item.color}`}>{item.value}</div>
            <div className="text-[11px] text-text-muted mt-0.5">{t.verify.report[item.key]}</div>
          </div>
        ))}
      </div>

      {/* Phase collapsibles */}
      <div className="space-y-2">
        {Object.entries(phaseGroups).map(([phaseStr, phaseTests]) => {
          const phaseNum = Number(phaseStr);
          const isExpanded = expandedPhase === phaseNum;

          const phaseCounts = {
            pass: phaseTests.filter((t) => t.status === "pass").length,
            warn: phaseTests.filter((t) => t.status === "warn").length,
            fail: phaseTests.filter((t) => t.status === "fail").length,
          };

          return (
            <div key={phaseNum} className="bg-bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phaseNum)}
                className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-bg-alt/50 transition-colors"
              >
                <span className="text-[13px] text-text font-medium">
                  {phaseNames[phaseNum - 1] || `Phase ${phaseNum}`}
                </span>
                <div className="flex items-center gap-2">
                  {phaseCounts.pass > 0 && (
                    <span className="text-[11px] font-mono text-[#6b8f71] bg-[rgba(107,143,113,0.08)] px-1.5 py-0.5 rounded">
                      {phaseCounts.pass}
                    </span>
                  )}
                  {phaseCounts.warn > 0 && (
                    <span className="text-[11px] font-mono text-[#b8944a] bg-[rgba(184,148,74,0.08)] px-1.5 py-0.5 rounded">
                      {phaseCounts.warn}
                    </span>
                  )}
                  {phaseCounts.fail > 0 && (
                    <span className="text-[11px] font-mono text-[#b85c5c] bg-[rgba(184,92,92,0.08)] px-1.5 py-0.5 rounded">
                      {phaseCounts.fail}
                    </span>
                  )}
                  <span className={`text-[11px] text-text-faint transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    &darr;
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 space-y-1">
                      {phaseTests.map((test) => {
                        const sCfg = statusConfig[test.status];
                        const testKey = `${test.phase}-${test.test}`;
                        const isTestExpanded = expandedTest === testKey;
                        const hasEvidence = !!test.evidence;

                        return (
                          <div key={testKey}>
                            <div
                              className={`flex items-center justify-between px-3 py-2 rounded-lg ${sCfg.bg} ${
                                hasEvidence ? "cursor-pointer hover:opacity-80" : ""
                              }`}
                              onClick={() => hasEvidence && toggleTest(testKey)}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className={`text-[13px] font-mono w-4 text-center flex-shrink-0 ${sCfg.icon}`}>
                                  {sCfg.symbol}
                                </span>
                                <span className="text-[13px] text-text truncate">{test.name}</span>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                                {test.detail && (
                                  <span className="text-[11px] text-text-muted max-w-[180px] truncate">
                                    {test.detail}
                                  </span>
                                )}
                                {test.duration != null && (
                                  <span className="text-[11px] font-mono text-text-faint">
                                    {test.duration}ms
                                  </span>
                                )}
                                {hasEvidence && (
                                  <span className={`text-[10px] text-text-faint transition-transform ${isTestExpanded ? "rotate-180" : ""}`}>
                                    {"\u25bc"}
                                  </span>
                                )}
                              </div>
                            </div>

                            <AnimatePresence>
                              {isTestExpanded && test.evidence && (
                                <EvidenceCard evidence={test.evidence} status={test.status} />
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onReset}
          className="flex-1 py-2.5 bg-dark text-bg text-[13px] rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          {t.verify.report.rerun}
        </button>
        <button className="flex-1 py-2.5 border border-brand/40 text-text-secondary text-[13px] rounded-lg hover:border-brand transition-colors cursor-pointer">
          {t.verify.report.submitToBoard}
        </button>
      </div>
    </div>
  );
}
