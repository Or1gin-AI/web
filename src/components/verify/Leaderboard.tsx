"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/i18n/context";

interface LeaderboardProps {
  backendUrl: string;
}

interface ShameEntry {
  domain: string;
  claimedModel: string;
  verifiedAt: string;
  issues: string[];
  score: number;
}

interface HonorEntry {
  domain: string;
  claimedModel: string;
  verifiedAt: string;
  passCount: number;
  totalCount: number;
  score: number;
}

interface LeaderboardData {
  entries: ShameEntry[] | HonorEntry[];
  total: number;
}

const tagStyles: Record<string, string> = {
  "\u6a21\u578b\u66ff\u6362": "bg-[rgba(197,48,48,0.08)] text-[#c53030]",
  "\u9690\u85cf\u6ce8\u5165": "bg-[rgba(217,119,6,0.08)] text-[#d97706]",
  "\u4e0a\u4e0b\u6587\u622a\u65ad": "bg-[rgba(197,48,48,0.08)] text-[#c53030]",
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "\u4eca\u5929";
  if (diffDays < 7) return `${diffDays} \u5929`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} \u5468`;
  return `${Math.floor(diffDays / 30)} \u6708`;
}

function isShameEntry(
  entry: ShameEntry | HonorEntry,
  tab: "shame" | "honor"
): entry is ShameEntry {
  return tab === "shame";
}

export default function Leaderboard({ backendUrl }: LeaderboardProps) {
  const { t } = useLocale();
  const [tab, setTab] = useState<"shame" | "honor">("shame");
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${backendUrl}/api/verify/leaderboard?tab=${tab}&limit=20`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: LeaderboardData) => {
        if (!cancelled && json?.entries) {
          setData(json);
          setLoading(false);
        } else if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [tab, backendUrl]);

  const isShame = tab === "shame";

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="bg-bg-alt rounded-lg p-1 flex">
        <button
          onClick={() => setTab("shame")}
          className={`flex-1 text-[13px] py-2 rounded-md transition-all cursor-pointer ${
            isShame
              ? "bg-bg-card shadow-sm text-[#c53030] font-medium"
              : "text-text-muted hover:text-text"
          }`}
        >
          {t.verify.leaderboard.shameTab}
        </button>
        <button
          onClick={() => setTab("honor")}
          className={`flex-1 text-[13px] py-2 rounded-md transition-all cursor-pointer ${
            !isShame
              ? "bg-bg-card shadow-sm text-[#2d8a56] font-medium"
              : "text-text-muted hover:text-text"
          }`}
        >
          {t.verify.leaderboard.honorTab}
        </button>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isShame ? "bg-[#c53030]" : "bg-[#2d8a56]"
          }`}
        />
        <span className="text-[13px] text-text">
          {isShame
            ? t.verify.leaderboard.shameTitle
            : t.verify.leaderboard.honorTitle}
        </span>
      </div>

      {/* Entries */}
      {loading ? (
        <div className="text-[13px] text-text-faint py-8 text-center">
          Loading...
        </div>
      ) : !data || data.entries.length === 0 ? (
        <div className="text-[13px] text-text-faint py-8 text-center">
          --
        </div>
      ) : (
        <div className="space-y-2">
          {data.entries.map((entry, i) => (
            <motion.div
              key={`${tab}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="bg-bg-card border border-border rounded-lg px-4 py-3"
            >
              {/* Domain */}
              <div className="font-mono text-[13px] text-text mb-1">
                {entry.domain}
              </div>

              {/* Meta line */}
              <div className="text-[11px] text-text-muted mb-2">
                {t.verify.leaderboard.claimed} {entry.claimedModel} &middot;{" "}
                {t.verify.leaderboard.verifiedAgo(timeAgo(entry.verifiedAt))}
              </div>

              {/* Tags or pass count */}
              {isShameEntry(entry, tab) ? (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {entry.issues.map((issue, j) => (
                    <span
                      key={j}
                      className={`text-[11px] px-2 py-0.5 rounded ${
                        tagStyles[issue] ||
                        "bg-[rgba(197,48,48,0.08)] text-[#c53030]"
                      }`}
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mb-2">
                  <span className="text-[11px] text-[#2d8a56] bg-[rgba(45,138,86,0.08)] px-2 py-0.5 rounded">
                    {t.verify.leaderboard.passCount(
                      (entry as HonorEntry).passCount,
                      (entry as HonorEntry).totalCount
                    )}
                  </span>
                </div>
              )}

              {/* Score bar */}
              <div className="h-[2px] bg-bg-alt rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isShame ? "bg-[#c53030]" : "bg-[#2d8a56]"
                  }`}
                  style={{ width: `${Math.min(entry.score, 100)}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer */}
      {data && data.total > 0 && (
        <p className="text-[11px] text-text-faint text-center pt-2">
          {t.verify.leaderboard.totalScans(data.total)}
        </p>
      )}
    </div>
  );
}
