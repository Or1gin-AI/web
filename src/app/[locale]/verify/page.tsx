"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLocale } from "@/i18n/context";
import VerifyForm from "@/components/verify/VerifyForm";
import VerifyPipeline from "@/components/verify/VerifyPipeline";
import VerifyReport from "@/components/verify/VerifyReport";
import VerifyError from "@/components/verify/VerifyError";
import Leaderboard from "@/components/verify/Leaderboard";

export interface EvidenceItem {
  label: string;
  expected: string;
  actual: string;
  correct: boolean;
}

export interface TestEvidence {
  expected: string;
  actual: string;
  raw?: string;
  items?: EvidenceItem[];
}

export interface QualityReport {
  dilution: number;
  predictedModel: string;
  modelConfidence: number;
  similarities: Record<string, number>;
  summary: string;
  probeResults: {
    probeId: string;
    similarities: Record<string, number>;
    mostSimilar: string;
    targetResponse: string;
  }[];
}

export interface VerifyResult {
  verdict: "real" | "suspicious" | "fake";
  confidence: number;
  stats: { pass: number; warn: number; fail: number; skip: number };
  results: {
    phase: number;
    test: number;
    name: string;
    status: "pass" | "warn" | "fail" | "skip";
    detail: string;
    duration: number;
    evidence?: TestEvidence;
  }[];
  quality?: QualityReport;
}

type VerifyState =
  | { step: "form" }
  | { step: "running"; sessionId: string }
  | { step: "report"; result: VerifyResult }
  | { step: "error"; message: string };

const BACKEND_URL = "https://verify.originai.cc";

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function VerifyPage() {
  const { t } = useLocale();
  const [state, setState] = useState<VerifyState>({ step: "form" });

  const handleStart = async (
    baseUrl: string,
    apiKey: string,
    model: string,
    mode: "full" | "quick"
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/verify/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseUrl, apiKey, model, mode }),
      });

      const raw = await res.text();
      let data: { sessionId?: string; message?: string | string[] } | null = null;

      if (raw) {
        try {
          data = JSON.parse(raw) as { sessionId?: string; message?: string | string[] };
        } catch {
          data = null;
        }
      }

      if (!res.ok) {
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || raw || `验证服务返回 ${res.status}`;
        throw new Error(message);
      }

      if (!data?.sessionId) {
        throw new Error("验证服务未返回有效 sessionId");
      }

      setState({ step: "running", sessionId: data.sessionId });
    } catch (err: any) {
      setState({ step: "error", message: err.message || "无法连接到验证服务" });
    }
  };

  const handleComplete = (result: VerifyResult) => {
    setState({ step: "report", result });
  };

  const handleReset = () => {
    setState({ step: "form" });
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-[680px] mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center mb-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] tracking-[4px] text-brand mb-3"
          >
            {t.verify.label}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-3xl md:text-[38px] font-light text-text leading-snug"
          >
            {t.verify.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[13px] text-text-muted leading-relaxed mt-4 max-w-md mx-auto"
          >
            {t.verify.subtitle}
          </motion.p>
        </motion.div>

        {/* Form — always visible */}
        <div className="mb-5">
          <VerifyForm onStart={handleStart} loading={state.step === "running"} />
        </div>

        {/* Pipeline / Result / Error — below form */}
        <div className="mb-20">
          {state.step === "running" && (
            <VerifyPipeline
              sessionId={state.sessionId}
              backendUrl={BACKEND_URL}
              onComplete={handleComplete}
              onError={(msg) => setState({ step: "error", message: msg })}
            />
          )}
          {state.step === "report" && (
            <VerifyReport
              result={state.result}
              onReset={handleReset}
              backendUrl={BACKEND_URL}
            />
          )}
          {state.step === "error" && (
            <VerifyError
              message={state.message}
              onRetry={handleReset}
            />
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
              {t.verify.leaderboard.label}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <Leaderboard backendUrl={BACKEND_URL} />
        </div>
      </div>
    </section>
  );
}
