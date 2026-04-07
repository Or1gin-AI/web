"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLocale } from "@/i18n/context";
import VerifyForm from "@/components/verify/VerifyForm";
import VerifyPipeline from "@/components/verify/VerifyPipeline";
import VerifyReport from "@/components/verify/VerifyReport";
import Leaderboard from "@/components/verify/Leaderboard";

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
  }[];
}

type VerifyState =
  | { step: "form" }
  | { step: "running"; sessionId: string }
  | { step: "report"; result: VerifyResult };

const BACKEND_URL = "";

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
      const data = await res.json();
      setState({ step: "running", sessionId: data.sessionId });
    } catch {
      // TODO: error handling
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
      <div className="max-w-[1080px] mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center mb-14"
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
            className="font-serif text-3xl md:text-[42px] font-light text-text leading-snug md:leading-relaxed"
          >
            {t.verify.title}
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="w-10 h-px bg-brand mx-auto my-6"
          />
          <motion.p
            variants={fadeUp}
            className="text-[14px] text-text-muted leading-relaxed"
          >
            {t.verify.subtitle}
          </motion.p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column — sticky */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
                {t.verify.label}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="md:sticky md:top-24">
              {state.step === "form" && <VerifyForm onStart={handleStart} />}
              {state.step === "running" && (
                <VerifyPipeline
                  sessionId={state.sessionId}
                  backendUrl={BACKEND_URL}
                  onComplete={handleComplete}
                />
              )}
              {state.step === "report" && (
                <VerifyReport
                  result={state.result}
                  onReset={handleReset}
                  backendUrl={BACKEND_URL}
                />
              )}
            </div>
          </div>

          {/* Right column — leaderboard */}
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
      </div>
    </section>
  );
}
