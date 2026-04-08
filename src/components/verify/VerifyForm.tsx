"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLocale } from "@/i18n/context";

interface VerifyFormProps {
  onStart: (baseUrl: string, apiKey: string, model: string, mode: "full" | "quick") => void;
  loading?: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const MODEL_PRESETS = [
  { label: "Opus 4.6", value: "claude-opus-4-6-20260401" },
  { label: "Sonnet 4.6", value: "claude-sonnet-4-6" },
  { label: "Haiku 4.5", value: "claude-haiku-4-5" },
];

const inputCls =
  "w-full px-3.5 py-3 border border-border-strong rounded-xl text-[14px] font-mono text-text bg-bg outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(217,119,87,0.1)] transition-all placeholder:text-text-faint";

export default function VerifyForm({ onStart, loading }: VerifyFormProps) {
  const { t } = useLocale();
  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("claude-opus-4-6-20260401");

  const disabled = !baseUrl.trim() || !apiKey.trim() || !!loading;

  return (
    <motion.div
      className="bg-bg-card border border-border rounded-2xl p-6"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-5">
        {/* Security notice */}
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-[#fef9f0] border border-[#f5e6c8] text-[12px] text-[#92400e] leading-relaxed">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            <strong>{t.verify.form.securityTip}</strong>{" "}
            {t.verify.form.apiKeyHint}
          </span>
        </div>

        {/* 2-col: URL + API Key */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] text-text-muted block mb-1.5">
              {t.verify.form.baseUrl}
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.example.com"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[12px] text-text-muted block mb-1.5">
              {t.verify.form.apiKey}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className={inputCls}
            />
          </div>
        </div>

        {/* Model */}
        <div>
          <label className="text-[12px] text-text-muted block mb-2">
            {t.verify.form.model}
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {MODEL_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setModel(preset.value)}
                className={`px-3 py-1.5 text-[12px] rounded-full border transition-all cursor-pointer ${
                  model === preset.value
                    ? "bg-brand-light border-brand text-brand font-medium"
                    : "border-border text-text-muted hover:border-brand hover:text-brand"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={inputCls}
          />
          <p className="text-[11px] text-text-faint mt-1.5">
            {t.verify.form.modelHint}
          </p>
        </div>

        {/* Button */}
        <div className="pt-1">
          <button
            disabled={disabled}
            onClick={() => onStart(baseUrl, apiKey, model, "full")}
            className="w-full py-3 bg-brand text-white text-[14px] font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? t.verify.form.connecting : t.verify.form.detect}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
