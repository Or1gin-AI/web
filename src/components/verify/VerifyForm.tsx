"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLocale } from "@/i18n/context";

interface VerifyFormProps {
  onStart: (baseUrl: string, apiKey: string, model: string, mode: "full" | "quick") => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function VerifyForm({ onStart }: VerifyFormProps) {
  const { t } = useLocale();
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("claude-opus-4-6-20260401");

  const disabled = !baseUrl.trim() || !apiKey.trim();

  return (
    <motion.div
      className="bg-bg-card border border-border rounded-xl p-7"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-5">
        {/* Base URL */}
        <div>
          <label className="text-[11px] font-medium text-text-secondary block mb-1.5">
            {t.verify.form.baseUrl}
          </label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.example.com"
            className="w-full px-3 py-2.5 border border-border-strong rounded-lg text-[13px] font-mono text-text bg-bg outline-none focus:border-brand transition-colors"
          />
        </div>

        {/* API Key */}
        <div>
          <label className="text-[11px] font-medium text-text-secondary block mb-1.5">
            {t.verify.form.apiKey}
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2.5 border border-border-strong rounded-lg text-[13px] font-mono text-text bg-bg outline-none focus:border-brand transition-colors"
          />
          <p className="text-[11px] text-text-faint mt-1">
            {t.verify.form.apiKeyHint}
          </p>
        </div>

        {/* Model */}
        <div>
          <label className="text-[11px] font-medium text-text-secondary block mb-1.5">
            {t.verify.form.model}
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2.5 border border-border-strong rounded-lg text-[13px] font-mono text-text bg-bg outline-none focus:border-brand transition-colors"
          />
          <p className="text-[11px] text-text-faint mt-1">
            {t.verify.form.modelHint}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            disabled={disabled}
            onClick={() => onStart(baseUrl, apiKey, model, "full")}
            className="flex-1 py-2.5 bg-dark text-bg text-[13px] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.verify.form.fullAudit}
          </button>
          <button
            disabled={disabled}
            onClick={() => onStart(baseUrl, apiKey, model, "quick")}
            className="flex-1 py-2.5 border border-brand/40 text-text-secondary text-[13px] rounded-lg hover:border-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.verify.form.quickScan}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
