"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/context";
import EvidenceCard from "@/components/verify/EvidenceCard";
import type { VerifyResult, TestEvidence } from "@/app/[locale]/verify/page";

interface TestEntry {
  phase: number;
  test: number;
  name: string;
  status: "running" | "pass" | "warn" | "fail" | "skip";
  detail?: string;
  duration?: number;
  evidence?: TestEvidence;
}

interface VerifyPipelineProps {
  sessionId: string;
  backendUrl: string;
  onComplete: (result: VerifyResult) => void;
  onError?: (message: string) => void;
}

const statusConfig = {
  pass: { bg: "bg-[rgba(107,143,113,0.08)]", icon: "text-[#6b8f71]", symbol: "\u2713" },
  warn: { bg: "bg-[rgba(184,148,74,0.08)]", icon: "text-[#b8944a]", symbol: "!" },
  fail: { bg: "bg-[rgba(184,92,92,0.08)]", icon: "text-[#b85c5c]", symbol: "\u2717" },
  running: { bg: "bg-brand-light", icon: "text-brand animate-pulse", symbol: "\u25cf" },
  skip: { bg: "", icon: "text-text-faint", symbol: "\u25cb" },
} as const;

export default function VerifyPipeline({
  sessionId,
  backendUrl,
  onComplete,
  onError,
}: VerifyPipelineProps) {
  const { t } = useLocale();
  const [tests, setTests] = useState<TestEntry[]>([]);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [totalPhases] = useState(4);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource(
      `${backendUrl}/api/verify/${sessionId}/stream`
    );
    esRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "test-start": {
            setTests((prev) => [
              ...prev,
              { phase: data.phase, test: data.test, name: data.name, status: "running" },
            ]);
            setCurrentPhase(data.phase);
            break;
          }
          case "test-result": {
            setTests((prev) =>
              prev.map((t) =>
                t.phase === data.phase && t.test === data.test
                  ? {
                      ...t,
                      status: data.status,
                      detail: data.detail,
                      duration: data.duration,
                      evidence: data.evidence,
                    }
                  : t
              )
            );
            break;
          }
          case "phase-done": {
            setCurrentPhase(data.phase + 1);
            break;
          }
          case "complete": {
            es.close();
            onComplete({
              verdict: data.verdict,
              confidence: data.confidence,
              stats: data.stats,
              results: data.results,
            });
            break;
          }
        }
      } catch {
        // ignore malformed messages
      }
    };

    es.onerror = () => {
      es.close();
      onError?.("SSE 连接中断，请重试");
    };

    return () => {
      es.close();
    };
  }, [sessionId, backendUrl, onComplete, onError]);

  const phaseGroups: Record<number, TestEntry[]> = {};
  for (const test of tests) {
    if (!phaseGroups[test.phase]) phaseGroups[test.phase] = [];
    phaseGroups[test.phase].push(test);
  }

  const totalTests = tests.length;
  const completedTests = tests.filter((t) => t.status !== "running").length;
  const progress = totalTests > 0 ? (completedTests / totalTests) * 100 : 0;
  const phaseNames = t.verify.pipeline.phases;

  const toggleExpand = (key: string) => {
    setExpandedTest((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl p-7">
      <div className="flex items-center justify-between mb-4">
        <span className="font-serif text-[15px] text-text">
          {t.verify.pipeline.verifying}
        </span>
        <span className="font-mono text-[11px] text-text-muted">
          {t.verify.pipeline.phase(Math.min(currentPhase, totalPhases), totalPhases)}
        </span>
      </div>

      <div className="h-[3px] bg-bg-alt rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-brand rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="space-y-5">
        {Array.from({ length: totalPhases }, (_, i) => i + 1).map((phaseIndex) => {
          const isActive = phaseIndex === currentPhase;
          const isFuture = phaseIndex > currentPhase;
          const phaseTests = phaseGroups[phaseIndex] || [];

          return (
            <div key={phaseIndex}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-mono text-[10px] tracking-[1.5px] uppercase ${
                    isActive ? "text-brand" : "text-text-faint"
                  }`}
                >
                  {phaseNames[phaseIndex - 1] || `Phase ${phaseIndex}`}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {isFuture && phaseTests.length === 0 ? (
                <p className="text-[12px] text-text-faint pl-1">
                  {t.verify.pipeline.pending(0)}
                </p>
              ) : (
                <AnimatePresence mode="popLayout">
                  {phaseTests.map((test) => {
                    const cfg = statusConfig[test.status];
                    const testKey = `${test.phase}-${test.test}`;
                    const isExpanded = expandedTest === testKey;
                    const hasEvidence = test.evidence && test.status !== "running";

                    return (
                      <div key={testKey}>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg mb-1 ${cfg.bg} ${
                            hasEvidence ? "cursor-pointer hover:opacity-80" : ""
                          }`}
                          onClick={() => hasEvidence && toggleExpand(testKey)}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`text-[13px] font-mono w-4 text-center flex-shrink-0 ${cfg.icon}`}>
                              {cfg.symbol}
                            </span>
                            <span className="text-[13px] text-text truncate">
                              {test.name}
                            </span>
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
                              <span className={`text-[10px] text-text-faint transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                                {"\u25bc"}
                              </span>
                            )}
                          </div>
                        </motion.div>

                        <AnimatePresence>
                          {isExpanded && test.evidence && (
                            <EvidenceCard
                              evidence={test.evidence}
                              status={test.status as "pass" | "warn" | "fail" | "skip"}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
