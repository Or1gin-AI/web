import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/context";
import type { Locale } from "@/i18n/context";

const validLocales: Locale[] = ["en", "zh"];

function isValidLocale(value: string): value is Locale {
  return validLocales.includes(value as Locale);
}

export function generateStaticParams() {
  return validLocales.map((locale) => ({ locale }));
}

const meta: Record<Locale, { title: string; description: string; alt: string; htmlLang: string }> = {
  en: {
    title: "OriginAI - The Ultimate AI Experience",
    description:
      "Pure by design, authentic by nature. Legitimate accounts, US credit card billing, clean residential IPs — no bans, no middlemen, use Claude like an American.",
    alt: "OriginAI — The Ultimate AI Experience",
    htmlLang: "en",
  },
  zh: {
    title: "OriginAI - AI 界的头等舱",
    description:
      "AI 界的头等舱。正规邮箱账号、美国信用卡订阅、纯净家庭 IP，告别封号，告别中转站，像美国人一样使用 Claude。",
    alt: "OriginAI — AI 界的头等舱",
    htmlLang: "zh-CN",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[isValidLocale(locale) ? locale : "en"];

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: "https://originai.cc",
      siteName: "OriginAI",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: m.alt }],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <LocaleProvider initialLocale={locale}>
      {children}
    </LocaleProvider>
  );
}
