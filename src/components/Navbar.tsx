"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import Image from "next/image";
import { useLocale } from "@/i18n/context";

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.whitepaper, href: "#whitepaper" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.faq, href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href === "#whitepaper") {
      window.dispatchEvent(new CustomEvent("open-whitepaper"));
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLocale = () => setLocale(locale === "en" ? "zh" : "en");

  const LocaleToggle = () => (
    <div className="flex items-center bg-border/40 rounded-full p-[2px]">
      <button
        onClick={toggleLocale}
        className={`text-[11px] px-2.5 py-[3px] rounded-full transition-all duration-200 cursor-pointer ${
          locale === "en"
            ? "bg-dark text-bg"
            : "text-text-muted hover:text-text"
        }`}
      >
        EN
      </button>
      <button
        onClick={toggleLocale}
        className={`text-[11px] px-2.5 py-[3px] rounded-full transition-all duration-200 cursor-pointer ${
          locale === "zh"
            ? "bg-dark text-bg"
            : "text-text-muted hover:text-text"
        }`}
      >
        中
      </button>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image src="/icon-transparent.png" alt="OriginAI" width={28} height={28} />
          <span className="font-serif text-[15px] text-text font-normal tracking-tight">
            OriginAI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-[13px] text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wt.ls/origin-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] px-5 py-2 bg-dark text-bg rounded cursor-pointer hover:opacity-90 transition-opacity"
          >
            {t.nav.cta}
          </a>
          <LocaleToggle />
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-[14px] text-text-muted hover:text-text transition-colors text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wt.ls/origin-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] px-5 py-2.5 bg-dark text-bg rounded w-fit cursor-pointer"
              >
                {t.nav.cta}
              </a>
              <div className="pt-2 border-t border-border">
                <LocaleToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
