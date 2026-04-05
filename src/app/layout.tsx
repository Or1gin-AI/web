import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OriginAI — 纯净的 Claude 极致体验",
  description: "官网原版 Claude 订阅代购与中继服务。合规账号、纯净 IP、全流程托管，为中国用户提供无缝的 AI 体验。",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
