"use client";

import { useLocale } from "@/i18n/context";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-serif text-[13px] text-text-muted">OriginAI</p>
      <p className="text-[11px] text-text-faint mt-1">
        &copy; {new Date().getFullYear()} OriginAI. {t.footer.tagline}
      </p>
    </footer>
  );
}
