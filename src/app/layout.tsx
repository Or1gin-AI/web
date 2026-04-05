import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OriginAI — 极致的 Claude 体验",
  description:
    "源于官方，忠于原版。OriginAI 为中国用户提供合规账号、纯净家庭 IP、全流程托管的 Claude 订阅服务，享受无缝的 AI 体验。",
  keywords: [
    "OriginAI",
    "Claude",
    "Anthropic",
    "Claude Pro",
    "Claude Max",
    "AI 订阅",
    "Claude 代购",
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
    title: "OriginAI — 极致的 Claude 体验",
    description:
      "源于官方，忠于原版。合规账号、纯净家庭 IP、全流程托管，为中国用户提供无缝的 AI 体验。",
    url: "https://originai.cn",
    siteName: "OriginAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OriginAI — 享受极致的 AI 体验",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OriginAI — 极致的 Claude 体验",
    description:
      "源于官方，忠于原版。合规账号、纯净家庭 IP、全流程托管，为中国用户提供无缝的 AI 体验。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
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
      <body>{children}</body>
    </html>
  );
}
