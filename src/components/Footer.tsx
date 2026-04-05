"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-serif text-[13px] text-text-muted">OriginAI</p>
      <p className="text-[11px] text-text-faint mt-1">
        &copy; {new Date().getFullYear()} OriginAI. 享受极致的 AI 体验。
      </p>
    </footer>
  );
}
