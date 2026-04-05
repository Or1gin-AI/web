# OriginAI Landing Page Design Spec

## Overview

Single-page scrolling landing page for OriginAI — a Claude subscription proxy + relay service targeting Chinese users. Built with Next.js (App Router), pnpm, React Icons, and Framer Motion.

**Visual direction:** Classic luxury brand aesthetic (Aesop/Byredo style). Light warm palette (`#faf8f5` background), serif brand typography (Noto Serif SC for Chinese titles, Georgia for English), muted gold accent (`#9b7b5a`). No "AI-heavy" visual clichés.

**Target audience:** Chinese developers and professionals who need clean, reliable access to Claude.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Package manager:** pnpm
- **Icons:** react-icons (Remix Icon set — `ri` prefix)
- **Animation:** framer-motion (scroll-triggered reveals, Modal transitions)
- **Fonts:** Noto Serif SC (Google Fonts, titles), system sans-serif PingFang SC (body), IBM Plex Mono (labels)
- **Styling:** CSS Modules or Tailwind — TBD at implementation, but the design tokens below are authoritative

## Design Tokens

Carried over from the whitepaper's existing design system:

```
--bg: #faf8f5
--bg-card: #ffffff
--bg-alt: #f3f0eb
--border: rgba(0, 0, 0, 0.06)
--border-strong: rgba(0, 0, 0, 0.10)
--brand: #9b7b5a
--brand-light: rgba(155, 123, 90, 0.08)
--text: #2c2c2c
--text-secondary: #6b6560
--text-muted: #9a9490
--text-faint: #b8b2aa
--font-serif: 'Noto Serif SC', Georgia, serif
--font-sans: -apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif
--font-mono: 'IBM Plex Mono', Menlo, monospace
```

## Page Structure (top to bottom)

### 1. Navigation Bar

- **Fixed/sticky** at top with backdrop blur
- **Left:** OriginAI logo (Georgia serif, regular weight)
- **Right links:** 白皮书 | 服务介绍 | 价格方案 | FAQ
- **Right CTA:** "立即开始" button (dark background `#2c2520`, light text)
- All nav links scroll to corresponding sections smoothly
- Mobile: hamburger menu

### 2. Hero Section

- **English label:** `AUTHENTIC RELAY` — small caps, letter-spacing 5px, brand gold color, Georgia serif
- **Main title:** Large Noto Serif SC, font-weight 300, e.g. "源于官方，忠于原版"
- **Decorative divider:** 40px horizontal line in brand gold
- **Subtitle:** "Claude 订阅代购与中继服务 / 为中国用户提供无缝的 AI 体验" — system sans-serif, muted color
- **Two buttons:**
  - Primary: "立即开始" (dark solid) → waitlist page
  - Secondary: "了解更多" (gold border outline) → scrolls to services section
- **Framer Motion:** Staggered fade-in from bottom on load

### 3. Whitepaper Card (inside Hero area)

- **Wide card** spanning content width, white background, subtle border, rounded corners (12px)
- **No PDF icon** — pure text layout
- **Left side:**
  - Small label: `WHITEPAPER` (mono font, gold, letter-spacing)
  - Title: "OriginAI：纯净的 Claude ��致体验" (bold, dark)
  - Description: one-line summary (muted text)
- **Right side:** "阅读全文 →" (gold text)
- **Click behavior:** Opens a full-screen Modal with the whitepaper content
- **Modal:** Framer Motion `AnimatePresence` + `layoutId` for smooth card-to-modal expansion. Modal contains the full whitepaper HTML rendered as React components. Close button top-right. Scroll within modal. Body scroll locked when open.

### 4. Services Section (服���介绍)

- **Section label:** `SERVICES` (mono, gold, letter-spacing)
- **Section title:** "我们提供什么" (Noto Serif SC)
- **Three-column card grid:**
  1. **合规账号** — Icon: `RiShieldKeyholeLine` — "美国本土信用卡购买 / 1:1 独享，零风控"
  2. **纯净网络** — Icon: `RiHome4Line` — "美国家庭住宅 IP / 非机房，非数据中心"
  3. **零知��隧道** — Icon: `RiLockLine` — "端到端 TLS 加密 / 我们无法读取您的数据"
- Icons rendered from `react-icons/ri`, sized ~28px, brand gold color
- Cards: white bg, subtle border, 12px radius
- **Framer Motion:** Cards stagger-reveal on scroll

### 5. Features Section (优势/特点)

- **Section label:** `ADVANTAGES` (mono, gold)
- **Section title:** "为什么选择 OriginAI" (Noto Serif SC)
- **2x2 grid of feature items:**
  1. 官网原版体验 — 直连 Anthropic 官方，不替换模型
  2. 开源可审计 — 客户端代码完全公开
  3. 双场景兼容 — Claude.ai 网页��� + Claude Code CLI
  4. 全流程托管 — 账号���护、续费、监控全由我们处理
- Each item: white card, small brand-gold dot indicator, title + description
- **Framer Motion:** Stagger reveal

### 6. Pricing Section (价格方案)

- **Section label:** `PRICING` (mono, gold)
- **Section title:** "价格方案" (Noto Serif SC)
- **Three-column pricing cards:**
  1. **Pro** — `$20/月 官网价格` — **推荐**（highlighted with brand border + "推荐" badge）— CTA: "选择方案"
  2. **Team** — `$30/月 官网价格` — **Coming Soon** badge, dimmed/disabled state — no CTA button
  3. **Max** — `$100 or $200/月 官网价格` — CTA: "选���方案"
- All cards show "+ 平台服务费" in faint small text
- Bottom note: "具体以结算价格为准 · 所有方案均为 1:1 独享账号"
- **Framer Motion:** Cards stagger reveal

### 7. FAQ Section

- **Section label:** `FAQ` (mono, gold)
- **Section title:** "常见问题" (Noto Serif SC)
- **Accordion** with questions from whitepaper:
  1. OriginAI 和普通 VPN 有什么区别？
  2. 你们能看到我���对话内容吗？
  3. 账号会被封禁吗？
  4. 支持哪些使用方式？
  5. 如何保证使用的是正版模型？
- Expand/collapse with Framer Motion `AnimatePresence` height animation
- One open at a time
- Chevron icon rotates on open

### 8. Bottom CTA Section

- **Title:** "准���好了吗？" (Noto Serif SC)
- **Subtitle:** "加入 waitlist，成为首批用户"
- **Button:** "加入 Waitlist" → waitlist page (wt.ls component, TBD)
- **Framer Motion:** Fade in on scroll

### 9. Footer

- Minimal footer
- OriginAI logo (Georgia serif)
- Copyright: "© 2025 OriginAI. 正本清源���纯净的 Claude 极致体验。"

## Whitepaper Modal

The whitepaper content is embedded directly in the app (not loaded externally). The existing `index.html` whitepaper will be converted to React components preserving the same structure and styling:

- 7 sections: 用户困境 → 核心问题 → 技术实现 → 安全与隐私 → 对比表 → 路线图 → FAQ
- All original CSS design tokens are shared with the landing page
- Modal opens with `framer-motion` `layoutId` animation from the card
- Close via X button or clicking backdrop
- Body scroll locked when modal is open

## Component Structure

```
src/
  app/
    layout.tsx          — root layout, fonts, metadata
    page.tsx            — landing page (assembles all sections)
    globals.css         — design tokens, base styles
  components/
    Navbar.tsx          — sticky nav with smooth scroll links
    Hero.tsx            — hero + whitepaper card
    WhitepaperModal.tsx — full-screen modal with whitepaper content
    Services.tsx        — 3-column service cards
    Features.tsx        — 2x2 feature grid
    Pricing.tsx         — 3-column pricing cards
    FAQ.tsx             — accordion
    CTA.tsx             ��� bottom call-to-action
    Footer.tsx          — minimal footer
    SectionHeader.tsx   — reusable section label + title
    AnimateOnScroll.tsx — reusable framer-motion scroll reveal wrapper
```

## Animations (Framer Motion)

- **Page load:** Hero content staggers in (label → title → divider → subtitle → buttons), 0.1s delay between each
- **Scroll reveal:** Each section fades in + translates up 20px when entering viewport. Uses `whileInView` with `once: true`
- **Whitepaper modal:** `layoutId` shared with the card for smooth expand/collapse. Backdrop fades in.
- **FAQ accordion:** `AnimatePresence` with height animation for expand/collapse
- **Nav:** Backdrop blur appears on scroll past hero

## Responsive Behavior

- **Desktop:** Full layout as described (max-width ~1080px content area, centered)
- **Tablet:** Services and pricing stack to 2 columns, features stay 2x2
- **Mobile:** Everything stacks to single column. Nav collapses to hamburger. Whitepaper modal goes full-screen. Pricing cards stack vertically.

## Waitlist Integration

CTA buttons ("立即开始", "加入 Waitlist", pricing "选择方案") will link to a waitlist page. The wt.ls component will be provided by the user and integrated later. For now, buttons link to `#waitlist` as placeholder.
