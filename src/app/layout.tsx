import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "OriginAI - The Ultimate AI Experience",
  description:
    "Pure by design, authentic by nature. Legitimate accounts, US credit card billing, clean residential IPs — no bans, no middlemen, use Claude like an American.",
  keywords: [
    "OriginAI",
    "Claude",
    "Anthropic",
    "Claude Pro",
    "Claude Max",
    "AI subscription",
    "Claude proxy",
  ],
  authors: [{ name: "OriginAI Team" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "OriginAI - The Ultimate AI Experience",
    description:
      "Pure by design, authentic by nature. Legitimate accounts, US credit card billing, clean residential IPs — no bans, no middlemen, use Claude like an American.",
    url: "https://originai.cn",
    siteName: "OriginAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OriginAI — The Ultimate AI Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OriginAI - The Ultimate AI Experience",
    description:
      "Pure by design, authentic by nature. Legitimate accounts, US credit card billing, clean residential IPs — no bans, no middlemen, use Claude like an American.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
