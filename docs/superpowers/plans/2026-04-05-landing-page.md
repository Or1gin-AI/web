# OriginAI Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrolling landing page for OriginAI with luxury brand aesthetics, Framer Motion animations, and an embedded whitepaper modal.

**Architecture:** Next.js 15 App Router with Tailwind CSS for styling (design tokens as CSS variables + Tailwind config extension). All sections are client components using Framer Motion. The page is a single `page.tsx` composing section components. Whitepaper content is embedded as a React component rendered inside a modal overlay.

**Tech Stack:** Next.js 15, TypeScript, pnpm, Tailwind CSS, framer-motion, react-icons (Remix Icon set)

**Design spec:** `docs/superpowers/specs/2026-04-05-landing-page-design.md`

**Whitepaper source:** `/Users/clck/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_n54uzxmavrrb32_d059/msg/file/2026-04/whitepaper/index.html`

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create Next.js project with pnpm**

```bash
cd /Users/clck/Desktop/Workspace/originai-web
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm
```

Accept defaults. This scaffolds the project with Tailwind CSS and App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
pnpm add framer-motion react-icons
```

- [ ] **Step 3: Verify dev server starts**

```bash
pnpm dev
```

Expected: Dev server starts on `http://localhost:3000` without errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind, framer-motion, react-icons"
```

---

### Task 2: Design Tokens, Fonts, and Base Styles

**Files:**
- Modify: `src/app/globals.css` (replace scaffolded content)
- Modify: `src/app/layout.tsx` (add fonts, metadata)
- Modify: `tailwind.config.ts` (extend with design tokens)

- [ ] **Step 1: Configure Tailwind with design tokens**

Replace `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#faf8f5",
          card: "#ffffff",
          alt: "#f3f0eb",
        },
        border: {
          DEFAULT: "rgba(0, 0, 0, 0.06)",
          strong: "rgba(0, 0, 0, 0.10)",
        },
        brand: {
          DEFAULT: "#9b7b5a",
          light: "rgba(155, 123, 90, 0.08)",
        },
        text: {
          DEFAULT: "#2c2c2c",
          secondary: "#6b6560",
          muted: "#9a9490",
          faint: "#b8b2aa",
        },
        dark: "#2c2520",
      },
      fontFamily: {
        serif: ["'Noto Serif SC'", "Georgia", "serif"],
        sans: ["-apple-system", "'PingFang SC'", "'Helvetica Neue'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "Menlo", "monospace"],
      },
      maxWidth: {
        content: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Set up global CSS**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #faf8f5;
  --color-bg-card: #ffffff;
  --color-bg-alt: #f3f0eb;
  --color-border: rgba(0, 0, 0, 0.06);
  --color-border-strong: rgba(0, 0, 0, 0.10);
  --color-brand: #9b7b5a;
  --color-brand-light: rgba(155, 123, 90, 0.08);
  --color-text: #2c2c2c;
  --color-text-secondary: #6b6560;
  --color-text-muted: #9a9490;
  --color-text-faint: #b8b2aa;
  --color-dark: #2c2520;
  --font-serif: 'Noto Serif SC', Georgia, serif;
  --font-sans: -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif;
  --font-mono: 'IBM Plex Mono', Menlo, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: rgba(155, 123, 90, 0.15);
}
```

- [ ] **Step 3: Configure root layout with fonts and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OriginAI — 纯净的 Claude 极致体验",
  description: "官网原版 Claude 订阅代购与中继服务。合规账号、纯净 IP、全流程托管，为中国用户提供��缝的 AI 体验。",
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
```

- [ ] **Step 4: Set up minimal page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-[1080px] mx-auto px-6 py-24 text-center">
        <p className="text-[11px] tracking-[5px] text-brand font-serif mb-5">
          AUTHENTIC RELAY
        </p>
        <h1 className="font-serif text-4xl font-light text-text leading-relaxed">
          源于官方，忠于原版
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
pnpm dev
```

Open `http://localhost:3000`. Expected: warm white background, "AUTHENTIC RELAY" in gold, serif Chinese title below it.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, fonts, and base styles"
```

---

### Task 3: Reusable Components — SectionHeader and AnimateOnScroll

**Files:**
- Create: `src/components/SectionHeader.tsx`
- Create: `src/components/AnimateOnScroll.tsx`

- [ ] **Step 1: Create AnimateOnScroll wrapper**

Create `src/components/AnimateOnScroll.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create SectionHeader component**

Create `src/components/SectionHeader.tsx`:

```tsx
import AnimateOnScroll from "./AnimateOnScroll";

interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <AnimateOnScroll className="text-center mb-12">
      <p className="font-mono text-[11px] tracking-[4px] text-brand mb-2">
        {label}
      </p>
      <h2 className="font-serif text-[22px] font-light text-text">
        {title}
      </h2>
    </AnimateOnScroll>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionHeader.tsx src/components/AnimateOnScroll.tsx
git commit -m "feat: add SectionHeader and AnimateOnScroll reusable components"
```

---

### Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

const navLinks = [
  { label: "白皮书", href: "#whitepaper" },
  { label: "服务介绍", href: "#services" },
  { label: "价格方案", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-serif text-[15px] text-text font-normal tracking-tight">
          OriginAI
        </a>

        {/* Desktop Links */}
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
          <button
            onClick={() => handleClick("#waitlist")}
            className="text-[12px] px-5 py-2 bg-dark text-bg rounded cursor-pointer hover:opacity-90 transition-opacity"
          >
            立即开始
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <button
                onClick={() => handleClick("#waitlist")}
                className="text-[13px] px-5 py-2.5 bg-dark text-bg rounded w-fit cursor-pointer"
              >
                立即开始
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-[1080px] mx-auto px-6 py-24 text-center">
          <p className="text-[11px] tracking-[5px] text-brand font-serif mb-5">
            AUTHENTIC RELAY
          </p>
          <h1 className="font-serif text-4xl font-light text-text leading-relaxed">
            源于官方，忠于原版
          </h1>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Expected: Sticky nav with OriginAI logo left, links right. Transparent on top, blurred background on scroll. Mobile: hamburger icon that expands.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/page.tsx
git commit -m "feat: add sticky Navbar with smooth scroll and mobile menu"
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="pt-32 pb-12 px-6">
      <motion.div
        className="max-w-[1080px] mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] tracking-[5px] text-brand font-serif mb-6"
        >
          AUTHENTIC RELAY
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-[42px] font-light text-text leading-snug md:leading-relaxed"
        >
          源于官方，忠于原版
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-10 h-px bg-brand mx-auto my-6"
        />

        <motion.p
          variants={fadeUp}
          className="text-[14px] text-text-muted leading-relaxed"
        >
          Claude 订阅代购与中继服务
          <br />
          为中国用户提供无缝的 AI 体验
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex gap-3 justify-center flex-wrap"
        >
          <a
            href="#waitlist"
            className="px-7 py-2.5 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
          >
            立即开始
          </a>
          <a
            href="#services"
            className="px-7 py-2.5 border border-brand/40 text-text-secondary text-[13px] rounded hover:border-brand transition-colors"
          >
            了解更多
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Staggered animation on load — AUTHENTIC RELAY → title → divider → subtitle → buttons appear sequentially.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with staggered entrance animation"
```

---

### Task 6: Whitepaper Card and Modal

**Files:**
- Create: `src/components/WhitepaperCard.tsx`
- Create: `src/components/WhitepaperModal.tsx`
- Create: `src/components/WhitepaperContent.tsx`

This is the most complex task — the card lives below the Hero, and clicking it opens a full-screen modal with the whitepaper rendered as React components.

- [ ] **Step 1: Create WhitepaperContent component**

Create `src/components/WhitepaperContent.tsx`. This converts the whitepaper HTML into React JSX. The content is long, so it lives in its own file. The component contains all 7 sections from the whitepaper source file, styled with Tailwind classes matching the original CSS design tokens.

```tsx
"use client";

export default function WhitepaperContent() {
  return (
    <article className="max-w-[720px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[11px] text-text-faint uppercase tracking-widest mb-3">
          Whitepaper
        </p>
        <h1 className="font-serif text-[clamp(26px,5vw,38px)] font-light leading-tight text-text mb-4">
          OriginAI：纯净的 Claude 极致体验
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-[560px]">
          正本清源，回归正版。合规账号、纯净 IP、全流程托管——让您在自己的电脑上，100% 使用 Claude 官方服务。
        </p>
        <div className="flex gap-6 mt-4 text-[12px] text-text-faint font-mono">
          <span>v1.0</span>
          <span>2025.04</span>
          <span>OriginAI Team</span>
        </div>
      </div>

      <div className="h-px bg-border mb-10" />

      {/* Section 01: Market */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">01</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          用户困境：两条路都走不通
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          随着 Claude 成为开发者和专业人士不可或缺的生产力工具，大量中国用户面临一个现实问题：<strong className="text-text font-medium">想用上纯净的官方 Claude，太难��</strong>。目前市面上的两条路，都充满风险。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">路径一：自己注册 — 充值即封号</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          许多用户尝试自行注册 Claude 账号并充值订阅，但很快发现这条路几乎走不通：
        </p>
        <div className="space-y-3 mb-6">
          {[
            { icon: "💳", title: "支付方式不过关", desc: "Anthropic 对支付来源有严格风控。使用非美国信用卡、虚拟卡或代充值，极易触发风控导致账号被封，充值的钱也打了水漂。" },
            { icon: "🌐", title: "IP 不够干净", desc: "使用机场、共享 VPN 或数据中心 IP 注册和使用，轻则频繁弹出验证码、被限流，重则直接封号。就算侥幸开通，也活不了多久。" },
            { icon: "😰", title: "提心吊胆的体验", desc: "即使账号暂时存活，用户也时刻担心被封、担心降智、担心 IP 被标记。在恐惧中使用 AI，完全无法专注于工作本身。" },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-bg-card border border-border rounded-xl">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-base">{item.icon}</div>
              <div>
                <h4 className="text-[14px] font-medium text-text mb-0.5">{item.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">路径二：中转站 — 一鱼三吃的黑色产业链</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          走不了官方路线，很多用户转向「中转站」寻求替代。然而，这个市场的水比想象中更深。绝大多数中转站运营者采用<strong className="text-text font-medium">「一鱼三吃」</strong>的模式，吃干抹净：
        </p>
        <div className="space-y-3 mb-6">
          {[
            { icon: "💳", title: "第一吃：盗刷信用卡", desc: "使用窃取的信用卡注册 AI 账号。账号随时可能因欺诈检测被封停，用户购买的服务说断就断。" },
            { icon: "🎭", title: "第二吃：倒卖与伪装 API", desc: "将黑号逆向包装成 API 售卖，用中低端模型冒充前沿模型。用户以为在用 Opus，实际可能收到 Haiku 的回复。" },
            { icon: "📡", title: "第三吃：贩卖用户数据", desc: "拦截并记录所有对话数据，转售给第三方做模型蒸馏训练。用户的代码、商业机密和隐私信息完全裸奔。" },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-bg-card border border-border rounded-xl">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-base">{item.icon}</div>
              <div>
                <h4 className="text-[14px] font-medium text-text mb-0.5">{item.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          自己注册，充值就封号；用中转站，安全和隐私全部交出去。用户需要的，是一条真正能走通的第三条路。
        </div>
      </section>

      {/* Section 02: Core Problem */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">02</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          核心问题：支付与 IP 决定一切
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          无论是自行注册还是通过中转站，用户遇到的所有问题，归根结底都指向同一个根源：<strong className="text-text font-medium">支付方式和 IP 地址不够干净</strong>。Anthropic 的风控系统会综合这两个信号判断用户是否���信。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">支付方式的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Anthropic 对支付来源有严格的风控策略。使用非美国信用卡、虚拟卡、礼品卡或代充值服务，极易被判定为高风险交易。<strong className="text-text font-medium">美国本土正规信用卡付款几乎不会触发风控</strong>，而非本土支付方式的封号率远高于此。OriginAI 的所有账号均使用美国本土正规信用卡购买和续费，从支付源头杜绝风控风险。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">IP 质量的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          许多用户通过机场、共享 VPN 或数据中心代理访问 Claude，认为「能打开就行」。但 IP 质量直接影响<strong className="text-text font-medium">账号存活、访问稳定性和使用体���</strong>：
        </p>
        <div className="space-y-2 mb-6">
          {[
            { text: "账号封禁", desc: "使用数据中心 IP、频繁切换 IP、多账号共用同一 IP 段，均会触发 Anthropic 风控系统，导致账号被直接封禁。" },
            { text: "频繁验证与限流", desc: "可疑 IP 会触发更频繁的 Cloudflare 验证、登录二次验证，以及更早触发的速率限制。" },
            { text: "「降智」争议", desc: "中文社区广泛讨论使用脏 IP 后模型回复质量下降的现象。无论是否属实，脏 IP 带来的频繁中断和限流本身就严重影响使用体验。" },
          ].map((item) => (
            <div key={item.text} className="flex gap-3 py-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
              <p className="text-[14px] text-text-secondary leading-relaxed">
                <strong className="text-text font-medium">{item.text}</strong> — {item.desc}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">OriginAI 的解法</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 从<strong className="text-text font-medium">支付和网络两个源头</strong>同时解决问题：
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { value: "美国信用卡", label: "本土正规支付，零风控", accent: true },
            { value: "家庭住宅 IP", label: "非机房，非数据中心", green: true },
            { value: "1:1 独享", label: "一人一号��不共享不超卖" },
          ].map((s) => (
            <div key={s.value} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className={`font-serif text-[24px] font-light ${s.accent ? "text-brand" : s.green ? "text-green-600" : "text-text"}`}>
                {s.value}
              </div>
              <div className="text-[11px] text-text-faint mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          我们不替换模型、不拦截数据、不做任何中间处理。您使用的就是官方的 Claude，我们只负责提供干净的账号和网络环境。
        </div>
      </section>

      {/* Section 03: Technical */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">03</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          技术实现
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 客户端是一个轻量级的开源桌面应用，只做两件事：<strong className="text-text font-medium">转发 Claude 流量</strong>和<strong className="text-text font-medium">自动处理登录验证</strong>。不是 VPN，不是梯子，不代理您的任何其他流量。
        </p>

        {/* Architecture Diagram */}
        <div className="bg-bg-alt rounded-xl p-6 mb-6 font-mono text-[12px] text-text-muted overflow-x-auto">
          <div className="flex items-center justify-center gap-2 flex-nowrap">
            <div className="px-3 py-2 border border-border-strong bg-bg-card rounded-lg text-center min-w-[90px]">
              <span className="text-[11px] font-medium text-text block">💻 用户设备</span>
              <span className="text-[10px] text-text-faint">macOS / Win / Linux</span>
            </div>
            <span className="text-text-faint text-sm">→</span>
            <div className="px-3 py-2 border border-brand bg-brand-light rounded-lg text-center min-w-[90px]">
              <span className="text-[11px] font-medium text-text block">⚡ OriginAI</span>
              <span className="text-[10px] text-text-faint">只转发 Claude 流量</span>
            </div>
            <span className="text-text-faint text-sm">→</span>
            <div className="px-3 py-2 border border-border-strong bg-bg-card rounded-lg text-center min-w-[90px]">
              <span className="text-[11px] font-medium text-text block">🏠 美国家庭节点</span>
              <span className="text-[10px] text-text-faint">住宅 IP</span>
            </div>
            <span className="text-text-faint text-sm">→</span>
            <div className="px-3 py-2 border border-brand bg-brand-light rounded-lg text-center min-w-[90px]">
              <span className="text-[11px] font-medium text-text block">🤖 Claude</span>
              <span className="text-[10px] text-text-faint">Anthropic 官方</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "只转发 Claude 流量", desc: "仅识别 claude.ai 和 api.anthropic.com，其他网络活动完全不经过我们" },
            { title: "客户端开源", desc: "源码完全公开，用户可自行审计验证，杜绝后门" },
            { title: "一键登录", desc: "OAuth 验证链接自动转发，一键完成认证，无需手动处理" },
            { title: "双场景兼容", desc: "同时支持 Claude.ai 网页版和 Claude Code CLI" },
          ].map((item) => (
            <div key={item.title} className="bg-bg-card border border-border rounded-xl p-4">
              <h4 className="text-[13px] font-medium text-text mb-1">{item.title}</h4>
              <p className="text-[12px] text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04: Security */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">04</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          安全与隐私设计
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 的安全设计核心理念是：<strong className="text-text font-medium">「不是我们承诺不看你的数据，而是我们在技术上无法看到你的数据」</strong>。通过架构层面的隔离，从根本上消除数据泄露的可能性。
        </p>

        {/* Security flow */}
        <div className="flex rounded-xl overflow-hidden border border-border mb-6 flex-col sm:flex-row">
          {[
            { icon: "📝", title: "您的对话", desc: "浏览器 / CLI 中\nTLS 加密", tag: "已加密 🔒", tagColor: "green" },
            { icon: "🚇", title: "OriginAI 隧道", desc: "只转发密文\n无法解密读取", tag: "密文通过", tagColor: "muted" },
            { icon: "🤖", title: "Anthropic", desc: "官方服务器\n到达后解密处理", tag: "安全到达 ✓", tagColor: "green" },
          ].map((s, i) => (
            <div key={s.title} className={`flex-1 p-5 text-center bg-bg-card ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-border" : ""}`}>
              <span className="text-xl block mb-2">{s.icon}</span>
              <h4 className="text-[12px] font-medium text-text mb-1">{s.title}</h4>
              <p className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line">{s.desc}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                s.tagColor === "green" ? "bg-green-50 text-green-600" : "bg-bg-alt text-text-muted"
              }`}>{s.tag}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { title: "零知识架构", desc: "隧道传输的是 TLS 加密流量，加密过程发生在用户设备上，解密发生在 Anthropic 服务器上。OriginAI 的节点只看到密文，在技术上无法读取任何对话内容。" },
            { title: "无日志政策", desc: "连接元数据（时间戳、数据量）最多保留 7 天用于故障排查，不记录任何请求内容、URL 路径或对话数据。" },
            { title: "安全凭证存储", desc: "账号凭证加密存储在控制平面，用户无法直接获取。OAuth token 存储在操作系统级安全存储中，定期自动刷新。" },
            { title: "开源透明", desc: "客户端代码完全开源，支持可复现构建（Reproducible Builds），用户可验证分发的二进制文件与源码一致。" },
            { title: "反检测策略", desc: "每个用户分配固定的家庭 IP 地址（非频繁切换），User-Agent 和 TLS 指纹完全透传，使用模式与正常美国用户一致。" },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 py-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand mt-2" />
              <p className="text-[14px] text-text-secondary leading-relaxed">
                <strong className="text-text font-medium">{item.title}</strong> — {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 05: Comparison */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">05</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          OriginAI vs 黑产中转站
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          以下是 OriginAI 与市面上典型黑产中转站在关键维度上的对比。
        </p>
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-bg-alt">
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">对比维度</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">黑产中转站</th>
                <th className="p-3 text-left text-[12px] font-medium text-brand border-b border-border">OriginAI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["账号来源", "❌ 黑卡盗刷注册", "✓ 正规渠道合法购买"],
                ["独享性", "❌ 多人共享 / 超卖", "✓ 1:1 完全独享"],
                ["模型真实性", "❌ 用低端模型冒充", "✓ 官方账号，保证正版"],
                ["数据隐私", "❌ 拦截记录，转售蒸馏", "✓ 零知识隧道，无法读取"],
                ["IP 质量", "❌ 机房 IP / 已被标记", "✓ 纯净美国家庭 IP"],
                ["服务稳定性", "❌ 频繁中断，无保障", "✓ 持续监控，主动维护"],
                ["客户端安全", "❌ 闭源不透明", "✓ 开源可审计"],
              ].map(([dim, bad, good], i) => (
                <tr key={dim} className={i < 6 ? "border-b border-border" : ""}>
                  <td className="p-3 font-medium text-text bg-bg-card">{dim}</td>
                  <td className="p-3 text-red-500 bg-bg-card">{bad}</td>
                  <td className="p-3 text-green-600 bg-bg-card">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 06: Roadmap */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">06</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          发展路线图
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 采用「<strong className="text-text font-medium">小步快跑、持续验证</strong>」的迭代策略。
        </p>
        <div className="space-y-3 mb-6">
          {[
            { num: "1", phase: "Phase 1 · 验证期", title: "产品验证（第 1-2 月）", desc: "少量账号投入运营，发布跨平台桌面客户端 MVP，建立核心种子用户群，收集反馈快速迭代。", tags: ["MVP 客户端", "种子用户"], active: true },
            { num: "2", phase: "Phase 2 · 稳定期", title: "基础设施升级（第 3-4 月）", desc: "部署自动化运维监控体系，账号池扩展至 50 个，实现用户自助开通流程。", tags: ["自动化运维", "自助开通"], active: false },
            { num: "3", phase: "Phase 3 · 增长期", title: "规模化运营（第 5-8 月）", desc: "客户端代码正式开源，扩展 IP 池节点覆盖，上线团队协作方案。", tags: ["代码开源", "IP 池扩展", "团队方案"], active: false },
            { num: "4", phase: "Phase 4 · 成熟期", title: "企业级服务（第 9-12 月）", desc: "提供 SLA 正式保证，引入第三方安全审计，推出企业级定制服务。", tags: ["SLA 保证", "安全审计", "企业版"], active: false },
          ].map((item) => (
            <div key={item.num} className="relative pl-12 p-4 bg-bg-card border border-border rounded-xl">
              <div className={`absolute left-4 top-5 w-6 h-6 rounded-full border-[1.5px] border-brand flex items-center justify-center font-mono text-[10px] font-medium ${
                item.active ? "bg-brand text-white" : "bg-brand-light text-brand"
              }`}>
                {item.num}
              </div>
              <p className="font-mono text-[11px] text-text-faint tracking-wide mb-0.5">{item.phase}</p>
              <h4 className="text-[15px] font-medium text-text mb-1">{item.title}</h4>
              <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-bg-alt rounded-full text-[11px] text-text-muted font-mono">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 07: FAQ */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">07</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          常��问题
        </h2>
        <div className="divide-y divide-border">
          {[
            { q: "OriginAI 和普通 VPN 有什么区别？", a: "OriginAI 只路由 Anthropic 相关流量（claude.ai、api.anthropic.com），不是全局 VPN。您的其他网络活动完全不受影响，延迟更低，也不会触发其他网站的风控检测。" },
            { q: "你们能看到我的对话内容吗？", a: "不能。您与 Claude 之间的通信是端到端 TLS 加密的，加密发生在您的浏览器或 CLI 中，解密发生在 Anthropic 的服务器上。OriginAI 只在网络层做流量转发，看到的是加��后的密文，技术上无法读取任何对话内容。" },
            { q: "账号会被封禁吗？", a: "我们使用合法购买的账号，配合纯净的美国家庭住宅 IP，使用模式与正常美国用户完全一致，风控风险极低。同时我们持续监控每个账号的健康状态，一旦出现异常会主动处理。" },
            { q: "支持哪些使用方式？", a: "支持 Claude.ai ���页版和 Claude Code CLI 命令行工具。安装 OriginAI 桌面客户端后，开启连接即可无缝使用。客户端支持 macOS、Windows 和 Linux。" },
            { q: "如何保证使用的是正版模型？", a: "您使用的是 Anthropic ��方账号，所有请求直接发往 Anthropic 官方服务器。我们不做任何 API 转发、请求改写或模型替换。" },
          ].map((item) => (
            <div key={item.q} className="py-4">
              <h4 className="text-[14px] font-medium text-text mb-2">{item.q}</h4>
              <p className="text-[13px] text-text-secondary leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Create WhitepaperModal component**

Create `src/components/WhitepaperModal.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import WhitepaperContent from "./WhitepaperContent";

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] overflow-y-auto"
          >
            <div className="min-h-full flex items-start justify-center py-8 px-4">
              <div
                className="relative w-full max-w-[800px] bg-bg rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-bg-alt/80 backdrop-blur-sm text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  <RiCloseLine size={20} />
                </button>

                <WhitepaperContent />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create WhitepaperCard component**

Create `src/components/WhitepaperCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WhitepaperModal from "./WhitepaperModal";

export default function WhitepaperCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="max-w-[1080px] mx-auto px-6 pb-16"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-6 md:p-7 bg-bg-card border border-border rounded-xl flex items-center gap-6 text-left hover:border-border-strong transition-colors cursor-pointer group"
        >
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] tracking-[2px] text-brand mb-1">
              WHITEPAPER
            </p>
            <h3 className="text-[16px] md:text-[17px] font-medium text-text mb-1 truncate">
              OriginAI：纯净的 Claude 极致体验
            </h3>
            <p className="text-[13px] text-text-muted">
              正本清源，回归正版。了解我们如何解决 Claude 使用中的核心问题。
            </p>
          </div>
          <span className="shrink-0 text-[13px] text-brand group-hover:translate-x-0.5 transition-transform">
            阅读全文 →
          </span>
        </button>
      </motion.div>

      <WhitepaperModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

- [ ] **Step 4: Add to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify in browser**

Expected: Whitepaper card appears below Hero with subtle hover effect. Clicking opens a large modal with the full whitepaper content. ESC or clicking backdrop closes it. Body scroll is locked when modal is open.

- [ ] **Step 6: Commit**

```bash
git add src/components/WhitepaperCard.tsx src/components/WhitepaperModal.tsx src/components/WhitepaperContent.tsx src/app/page.tsx
git commit -m "feat: add whitepaper card and full-content modal"
```

---

### Task 7: Services Section

**Files:**
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Create Services component**

Create `src/components/Services.tsx`:

```tsx
"use client";

import { RiShieldKeyholeLine, RiHome4Line, RiLockLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  {
    icon: RiShieldKeyholeLine,
    title: "合规账号",
    desc: "美国本土信用卡购买\n1:1 独享，零风控",
  },
  {
    icon: RiHome4Line,
    title: "纯净网络",
    desc: "美国家庭住宅 IP\n非机房，非数据中心",
  },
  {
    icon: RiLockLine,
    title: "零知识隧道",
    desc: "端到端 TLS 加密\n我们无法读取您的数据",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="SERVICES" title="我们提供什么" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.title} delay={i * 0.1}>
              <div className="bg-bg-card border border-border rounded-xl p-7 text-center hover:border-border-strong transition-colors">
                <service.icon className="mx-auto mb-4 text-brand" size={28} />
                <h3 className="text-[15px] font-medium text-text mb-2">
                  {service.title}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed whitespace-pre-line">
                  {service.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page with divider**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Expected: Three cards with Remix icons in gold, stagger-revealing on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.tsx src/app/page.tsx
git commit -m "feat: add Services section with react-icons"
```

---

### Task 8: Features Section

**Files:**
- Create: `src/components/Features.tsx`

- [ ] **Step 1: Create Features component**

Create `src/components/Features.tsx`:

```tsx
"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const features = [
  {
    title: "官网原版体验",
    desc: "直连 Anthropic 官方，不替换模型",
  },
  {
    title: "开源可审计",
    desc: "客户端代码完全公开",
  },
  {
    title: "双场景兼容",
    desc: "Claude.ai 网页版 + Claude Code CLI",
  },
  {
    title: "全流程托管",
    desc: "账号维护、续费、监控全由我们处理",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="ADVANTAGES" title="为什么选择 OriginAI" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={i * 0.08}>
              <div className="bg-bg-card border border-border rounded-xl p-6 flex gap-4 items-start hover:border-border-strong transition-colors">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand mt-2" />
                <div>
                  <h3 className="text-[14px] font-medium text-text mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-text-muted">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Features />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Features.tsx src/app/page.tsx
git commit -m "feat: add Features section"
```

---

### Task 9: Pricing Section

**Files:**
- Create: `src/components/Pricing.tsx`

- [ ] **Step 1: Create Pricing component**

Create `src/components/Pricing.tsx`:

```tsx
"use client";

import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const plans = [
  {
    name: "PRO",
    price: "$20",
    priceNote: "/月 官网价格",
    recommended: true,
    comingSoon: false,
    cta: "选择方案",
  },
  {
    name: "TEAM",
    price: "$30",
    priceNote: "/月 官网价格",
    recommended: false,
    comingSoon: true,
    cta: null,
  },
  {
    name: "MAX",
    price: "$100 / $200",
    priceNote: "/月 官网价格",
    recommended: false,
    comingSoon: false,
    cta: "选择方案",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        <SectionHeader label="PRICING" title="价格方案" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 0.1}>
              <div
                className={`relative bg-bg-card rounded-xl p-8 text-center ${
                  plan.recommended
                    ? "border-2 border-brand"
                    : "border border-border"
                } ${plan.comingSoon ? "opacity-60" : ""}`}
              >
                {plan.recommended && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
                    推荐
                  </span>
                )}
                {plan.comingSoon && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-text-muted text-white text-[10px] px-3 py-0.5 rounded-full tracking-wider">
                    Coming Soon
                  </span>
                )}

                <p className={`text-[11px] tracking-[2px] mb-3 ${
                  plan.recommended ? "text-brand" : "text-text-muted"
                }`}>
                  {plan.name}
                </p>

                <p className="font-serif text-[28px] font-light text-text">
                  {plan.price}
                </p>
                <p className="text-[11px] text-text-muted mt-1">
                  {plan.priceNote}
                </p>
                <p className="text-[10px] text-text-faint mt-2">
                  + 平台服务费
                </p>

                {plan.cta && (
                  <a
                    href="#waitlist"
                    className={`block mt-5 py-2.5 rounded text-[12px] transition-opacity hover:opacity-90 ${
                      plan.recommended
                        ? "bg-dark text-bg"
                        : "border border-brand/40 text-text-secondary"
                    }`}
                  >
                    {plan.cta}
                  </a>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <p className="text-center text-[12px] text-text-faint mt-6">
          具体以结算价格为准 · 所有方案均为 1:1 独享账号
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Features />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Pricing />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.tsx src/app/page.tsx
git commit -m "feat: add Pricing section with Pro/Team/Max plans"
```

---

### Task 10: FAQ Section

**Files:**
- Create: `src/components/FAQ.tsx`

- [ ] **Step 1: Create FAQ component**

Create `src/components/FAQ.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import SectionHeader from "./SectionHeader";
import AnimateOnScroll from "./AnimateOnScroll";

const faqs = [
  {
    q: "OriginAI 和普通 VPN 有什么区别？",
    a: "OriginAI 只路由 Anthropic 相关流量（claude.ai、api.anthropic.com），不是全局 VPN。您的其他网络活动完全不受影响，延迟更低，也不会触发其他网站的风控检测。我们专注做一件事，把它做到极致。",
  },
  {
    q: "你们能看到我的对话内容吗？",
    a: "不能。您与 Claude 之间的通信是端到端 TLS 加密的，加密发生在您的浏览器或 CLI 中，解密发生在 Anthropic 的服务器上。OriginAI ���在网络层做流量转发，看到的是加密后的密文，技术上无法读取任何对话内容。这是架构保证，不是承诺保证。",
  },
  {
    q: "账号会被封禁吗？",
    a: "我们使用合法购买的账号，配合纯净的美国家庭住宅 IP，使用模式与正常美国用户完全一致，风控风险极低。同时���们持续监控每个账号的健康状态，一旦出现���常会主动处理，确保服务不中断。",
  },
  {
    q: "支持哪些使用方式？",
    a: "支持 Claude.ai 网页版和 Claude Code CLI 命令行工具。安装 OriginAI 桌面客户端后，开启连接即可无缝使用。客户端支持 macOS、Windows 和 Linux 三大桌面平台。",
  },
  {
    q: "如何保证使用的是正版模型？",
    a: "您使用的是 Anthropic 官方账号，所有请求直接发往 Anthropic 官方服务器。我们不做任何 API 转发、请求改写或模型替换。您收到的每一个回复都来自您所选套餐对应的官方模型，与在美国直接使用完全一致。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-[600px] mx-auto">
        <SectionHeader label="FAQ" title="常见问题" />
        <AnimateOnScroll>
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
                >
                  <span className="text-[14px] font-medium text-text group-hover:text-brand transition-colors pr-4">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ${openIndex === i ? "text-brand" : "text-text-faint"}`}
                  >
                    <RiArrowDownSLine size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[13px] text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Features />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Pricing />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <FAQ />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQ.tsx src/app/page.tsx
git commit -m "feat: add FAQ accordion section"
```

---

### Task 11: CTA and Footer

**Files:**
- Create: `src/components/CTA.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create CTA component**

Create `src/components/CTA.tsx`:

```tsx
"use client";

import AnimateOnScroll from "./AnimateOnScroll";

export default function CTA() {
  return (
    <section id="waitlist" className="py-20 px-6">
      <AnimateOnScroll className="text-center">
        <h2 className="font-serif text-[24px] font-light text-text">
          准备好了吗？
        </h2>
        <p className="text-[14px] text-text-muted mt-3">
          加入 waitlist，成为首批用户
        </p>
        <a
          href="#waitlist"
          className="inline-block mt-7 px-9 py-3 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
        >
          加入 Waitlist
        </a>
      </AnimateOnScroll>
    </section>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 text-center">
      <p className="font-serif text-[13px] text-text-muted">OriginAI</p>
      <p className="text-[11px] text-text-faint mt-1">
        &copy; 2025 OriginAI. 正本清源，纯净的 Claude 极致体验。
      </p>
    </footer>
  );
}
```

- [ ] **Step 3: Assemble final page**

Update `src/app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhitepaperCard from "@/components/WhitepaperCard";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhitepaperCard />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Services />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Features />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <Pricing />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <FAQ />
        <div className="h-px bg-border mx-auto max-w-[1080px]" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Full page verification**

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify:
- All sections render in correct order
- Scroll animations trigger correctly
- Nav links scroll to sections
- Whitepaper modal opens/closes
- FAQ accordion works
- Mobile responsive: hamburger menu, stacked layouts
- Colors, fonts, spacing match design tokens

- [ ] **Step 5: Commit**

```bash
git add src/components/CTA.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: add CTA, Footer, and assemble complete landing page"
```

---

### Task 12: Cleanup and Polish

**Files:**
- Modify: various files as needed

- [ ] **Step 1: Remove default Next.js assets**

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 2: Add .gitignore entry for brainstorm files**

Append to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 3: Final build test**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: cleanup default assets and finalize project"
```
