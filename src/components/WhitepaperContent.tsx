"use client";

import { useLocale } from "@/i18n/context";
import WhitepaperContentZh from "./WhitepaperContentZh";
import WhitepaperContentEn from "./WhitepaperContentEn";

export default function WhitepaperContent() {
  const { locale } = useLocale();
  return locale === "zh" ? <WhitepaperContentZh /> : <WhitepaperContentEn />;
}
