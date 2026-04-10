"use client";

import { useState, useEffect } from "react";
import { FaApple, FaWindows, FaLinux, FaTelegramPlane } from "react-icons/fa";
import AnimateOnScroll from "./AnimateOnScroll";
import SectionHeader from "./SectionHeader";
import { useLocale } from "@/i18n/context";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface PlatformDownloads {
  macArm?: string;
  macX64?: string;
  win?: string;
  linuxDeb?: string;
  linuxAppImage?: string;
}

type OS = "mac" | "win" | "linux";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "win";
  if (ua.includes("linux")) return "linux";
  return "mac";
}

function parseAssets(assets: ReleaseAsset[]): PlatformDownloads {
  const dl: PlatformDownloads = {};
  for (const { name, browser_download_url: url } of assets) {
    if (name.endsWith(".blockmap") || name.endsWith(".yml") || name.endsWith(".zip")) continue;
    if (name.includes("mac-arm64") && name.endsWith(".dmg")) dl.macArm = url;
    else if (name.includes("mac-x64") && name.endsWith(".dmg")) dl.macX64 = url;
    else if (name.includes("win") && name.endsWith(".exe")) dl.win = url;
    else if (name.endsWith(".deb")) dl.linuxDeb = url;
    else if (name.endsWith(".AppImage")) dl.linuxAppImage = url;
  }
  return dl;
}

const RELEASES_URL = "https://github.com/Or1gin-AI/app/releases";
const RELEASES_LATEST = `${RELEASES_URL}/latest`;

export default function Download() {
  const { t } = useLocale();
  const [version, setVersion] = useState("");
  const [downloads, setDownloads] = useState<PlatformDownloads>({});
  const [currentOS, setCurrentOS] = useState<OS>("mac");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCurrentOS(detectOS());
    fetch("https://api.github.com/repos/Or1gin-AI/app/releases/latest")
      .then((r) => r.json())
      .then((data) => {
        setVersion(data.tag_name || "");
        setDownloads(parseAssets(data.assets || []));
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const platforms: {
    id: OS;
    name: string;
    icon: typeof FaApple;
    buttons: { label: string; url?: string }[];
  }[] = [
    {
      id: "mac",
      name: "macOS",
      icon: FaApple,
      buttons: [
        { label: "Apple Silicon", url: downloads.macArm },
        { label: "Intel", url: downloads.macX64 },
      ],
    },
    {
      id: "win",
      name: "Windows",
      icon: FaWindows,
      buttons: [{ label: t.download.download, url: downloads.win }],
    },
    {
      id: "linux",
      name: "Linux",
      icon: FaLinux,
      buttons: [
        { label: ".deb", url: downloads.linuxDeb },
        { label: "AppImage", url: downloads.linuxAppImage },
      ],
    },
  ];

  return (
    <section id="download" className="py-20 px-6">
      <SectionHeader label={t.download.label} title={t.download.title} />

      {version && (
        <AnimateOnScroll className="text-center -mt-8 mb-10">
          <a
            href={RELEASES_LATEST}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[11px] text-text-muted border border-border rounded-full px-3 py-1 hover:border-brand/40 hover:text-brand transition-colors"
          >
            {version}
          </a>
        </AnimateOnScroll>
      )}

      <div className="max-w-[680px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform, i) => {
          const active = platform.id === currentOS;
          const Icon = platform.icon;
          return (
            <AnimateOnScroll
              key={platform.id}
              delay={i * 0.08}
              className={[
                "relative rounded-lg border p-6 text-center transition-all duration-300",
                active
                  ? "border-brand/30 bg-brand-light"
                  : "border-border bg-bg-card hover:border-border-strong",
              ].join(" ")}
            >
              {active && (
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-brand" />
              )}
              <Icon
                className={[
                  "mx-auto text-[26px] mb-3 transition-colors",
                  active ? "text-brand" : "text-text-secondary",
                ].join(" ")}
              />
              <p className="font-serif text-[15px] text-text mb-4">
                {platform.name}
              </p>
              <div className="flex flex-col gap-2">
                {platform.buttons.map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.url || RELEASES_LATEST}
                    className={[
                      "block py-2 px-4 text-[12px] rounded transition-all duration-200",
                      active
                        ? "bg-dark text-bg hover:opacity-90"
                        : "border border-border text-text-secondary hover:border-brand/40 hover:text-brand",
                    ].join(" ")}
                  >
                    {ready ? btn.label : "…"}
                  </a>
                ))}
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      <AnimateOnScroll className="text-center mt-8 flex flex-col items-center gap-2.5">
        <a
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-text-muted hover:text-brand transition-colors"
        >
          {t.download.allReleases} ↗
        </a>
        <a
          href="https://t.me/origin_ai_2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] text-text-muted hover:text-brand transition-colors"
        >
          <FaTelegramPlane className="text-[13px]" />
          {t.download.telegram}
        </a>
      </AnimateOnScroll>
    </section>
  );
}
