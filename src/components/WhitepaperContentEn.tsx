"use client";

import {
  RiChatSmileLine,
  RiBankCardLine,
  RiGlobalLine,
  RiEmotionUnhappyLine,
  RiSpyLine,
  RiBaseStationLine,
  RiKeyLine,
  RiBox3Line,
  RiFlashlightLine,
  RiRobot2Line,
} from "react-icons/ri";

export default function WhitepaperContentEn() {
  return (
    <article className="max-w-[720px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[11px] text-text-faint uppercase tracking-widest mb-3">
          Whitepaper
        </p>
        <h1 className="font-serif text-[clamp(26px,5vw,38px)] font-light leading-tight text-text mb-4">
          OriginAI: The Definitive Claude Experience
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-[560px]">
          Authentic access, done right. Compliant accounts, pristine IPs, fully managed infrastructure — use Claude's official services, 100%, on your own machine.
        </p>
        <div className="flex gap-6 mt-4 text-[12px] text-text-faint font-mono">
          <span>v1.0</span>
          <span>2026.04</span>
          <span>OriginAI Team</span>
        </div>
      </div>

      {/* Why Claude */}
      <section className="mb-10 text-center">
        <p className="text-[13px] text-text-muted mb-1">Why Claude?</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-1 leading-snug">
          The World's Most Acclaimed AI Model
        </h2>
        <p className="text-[13px] text-text-secondary max-w-[560px] mx-auto mb-6">
          Anthropic's annual revenue exceeds $14B, with 10x growth for three consecutive years. Claude Opus 4.6 holds the top two positions on Chatbot Arena's human blind evaluation, and leads the industry on SWE-bench software engineering scores.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { value: "$14B", label: "Annual Revenue", sub: "Fastest-growing AI company globally" },
            { value: "#1 #2", label: "Chatbot Arena", sub: "Opus 4.6 holds top two spots", accent: true },
            { value: "76.8%", label: "SWE-bench", sub: "Highest resolution rate in the industry" },
            { value: "Top 5", label: "Code Arena", sub: "All swept by Claude", green: true },
          ].map((s) => (
            <div key={s.label} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className={`font-serif text-[28px] font-light ${s.accent ? "text-brand" : s.green ? "text-green-600" : "text-text"}`}>
                {s.value}
              </div>
              <div className="text-[11px] text-text-faint mt-1">
                <strong className="text-text block text-[12px]">{s.label}</strong>
                <span className="text-green-600 text-[10px]">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-text-faint">
          Sources: Anthropic official announcement (2026.02), Chatbot Arena (arena.ai), SWE-bench official leaderboard
        </p>
      </section>

      <div className="h-px bg-border mb-10" />

      {/* Section 01: Market */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">01</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          The User's Dilemma: Neither Path Works
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          As Claude becomes an indispensable productivity tool for developers and professionals, a large number of users in China face a stark reality: <strong className="text-text font-medium">getting clean, official access to Claude is prohibitively difficult</strong>. The two available paths are both fraught with risk.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Path One: Self-Registration — Pay and Get Banned</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Many users attempt to register a Claude account and subscribe on their own, only to find this path virtually impassable:
        </p>
        <div className="space-y-3 mb-6">
          {[
            { Icon: RiBankCardLine, title: "Payment method rejected", desc: "Anthropic enforces strict payment risk controls. Using non-US credit cards, virtual cards, or third-party top-up services easily triggers fraud detection, resulting in account bans — and the subscription fee is lost." },
            { Icon: RiGlobalLine, title: "IP address not clean enough", desc: "A suboptimal network environment (datacenter IPs, shared exit nodes, frequent node switching) leads to constant CAPTCHAs and rate limiting at best, and outright account bans at worst. Even accounts that slip through rarely survive long." },
            { Icon: RiEmotionUnhappyLine, title: "An anxiety-ridden experience", desc: "Even when an account temporarily survives, users live in constant fear — fear of bans, fear of degraded model quality, fear of IP flagging. Using AI under such stress makes it impossible to focus on actual work." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-bg-card border border-border rounded-xl">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand"><item.Icon size={18} /></div>
              <div>
                <h4 className="text-[14px] font-medium text-text mb-0.5">{item.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Path Two: Relay Services — Triple Exploitation</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Unable to go the official route, many users turn to black-market relay services as an alternative. However, the vast majority of relay operators employ a model of <strong className="text-text font-medium">triple exploitation</strong>:
        </p>
        <div className="space-y-3 mb-6">
          {[
            { Icon: RiBankCardLine, title: "Exploitation #1: Stolen credit cards", desc: "Accounts are registered using stolen credit cards. These accounts can be suspended at any time due to fraud detection, and the service users paid for vanishes without warning." },
            { Icon: RiSpyLine, title: "Exploitation #2: Reselling & model impersonation", desc: "Fraudulent accounts are reverse-engineered into APIs for resale, with low-tier models masquerading as frontier models. Users think they're using Opus, but may actually be receiving Haiku responses." },
            { Icon: RiBaseStationLine, title: "Exploitation #3: Selling user data", desc: "All conversation data is intercepted and logged, then resold to third parties for model distillation training. Users' code, trade secrets, and private information are fully exposed." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-4 bg-bg-card border border-border rounded-xl">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand"><item.Icon size={18} /></div>
              <div>
                <h4 className="text-[14px] font-medium text-text mb-0.5">{item.title}</h4>
                <p className="text-[13px] text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          Self-register and get banned the moment you pay; use a relay service and surrender your security and privacy entirely. What users need is a genuine third path that actually works.
        </div>
      </section>

      {/* Section 02: Core Problem + Solution */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">02</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">The Root Cause: Payment & IP Determine Everything</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Whether self-registering or going through relay services, every problem users encounter ultimately traces back to the same root cause: <strong className="text-text font-medium">payment methods and IP addresses that aren't clean enough</strong>.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">The Impact of Payment Methods</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Anthropic enforces strict risk controls on payment sources. <strong className="text-text font-medium">Payments from legitimate US domestic credit cards almost never trigger fraud detection</strong>. All OriginAI accounts are purchased and renewed using legitimate US domestic credit cards, eliminating payment-related risk at the source.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">The Impact of IP Quality</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Many users' network environments are far from ideal. Yet IP quality directly affects <strong className="text-text font-medium">account survival, access stability, and overall experience</strong>:
        </p>
        <div className="space-y-2 mb-6">
          {[
            { text: "Account bans", desc: "Using datacenter IPs, frequently switching IPs, or sharing IP ranges across multiple accounts all trigger Anthropic's risk control systems." },
            { text: "Frequent verification & rate limiting", desc: "Suspicious IPs trigger more frequent Cloudflare challenges, secondary login verification, and earlier rate limit thresholds." },
            { text: "\"Degraded intelligence\" controversy", desc: "The frequent interruptions and rate limiting caused by dirty IPs severely degrade the user experience in and of themselves." },
          ].map((item) => (
            <div key={item.text} className="flex gap-3 py-2">
              <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
              <p className="text-[14px] text-text-secondary leading-relaxed">
                <strong className="text-text font-medium">{item.text}</strong> — {item.desc}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">The OriginAI Solution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { value: "US Credit Cards", label: "Legitimate domestic payment, zero risk flags", color: "text-brand" },
            { value: "Residential IPs", label: "Not datacenter, not colocation", color: "text-green-600" },
            { value: "1:1 Dedicated", label: "One account per user, never shared or oversold", color: "text-text" },
            { value: "100% Official", label: "Claude.ai / Claude Code", color: "text-brand" },
          ].map((s) => (
            <div key={s.value} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className={`font-serif text-[22px] font-light ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-text-faint mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">How It Works</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {[
            { num: "1", Icon: RiBox3Line, title: "Install the OriginAI client", desc: "Download the open-source client\nmacOS / Windows / Linux", tag: "One-click install", highlight: false },
            { num: "2", Icon: RiFlashlightLine, title: "Activate acceleration", desc: "Smart network optimization\nAutomatic OAuth login", tag: "Fully automatic", highlight: false },
            { num: "3", Icon: RiRobot2Line, title: "Use official Claude", desc: "Claude.ai\nClaude Code · 100% official", tag: "Get started", highlight: true },
          ].map((step, i) => (
            <div key={step.num} className="contents">
              {i > 0 && <div className="hidden sm:flex items-center text-text-faint text-sm justify-center">&rarr;</div>}
              <div className={`flex-1 rounded-xl border p-4 text-center ${step.highlight ? "border-brand bg-brand-light" : "border-border bg-bg-card"}`}>
                <div className="w-[22px] h-[22px] rounded-full bg-brand text-white text-[11px] font-mono font-medium flex items-center justify-center mx-auto mb-2">
                  {step.num}
                </div>
                <div className="mb-2 flex justify-center text-brand"><step.Icon size={24} /></div>
                <div className="text-[13px] font-semibold text-text mb-1">{step.title}</div>
                <div className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line mb-2">{step.desc}</div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${step.highlight ? "bg-green-50 text-green-600" : "bg-brand-light text-brand"}`}>
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[13px] text-text-muted mt-4">
          You log into your account through Claude's official web and desktop clients — 100% Anthropic official services. We never substitute models, intercept data, or perform any intermediary processing.
        </p>
      </section>

      {/* Section 03: Technical */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">03</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">Technical Implementation</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          The OriginAI client is a lightweight, open-source desktop application that works like a game accelerator — <strong className="text-text font-medium">intelligently identifying Claude traffic and automatically optimizing the network environment</strong>, ensuring all Claude requests route through premium US residential IP endpoints. All other network activity remains completely unaffected.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Network Layer: Dedicated Claude Acceleration</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          The client runs a lightweight local proxy service that uses domain-based rules to precisely match Claude-related traffic (<code className="text-[13px] font-mono bg-bg-alt px-1 py-0.5 rounded">claude.ai</code>, <code className="text-[13px] font-mono bg-bg-alt px-1 py-0.5 rounded">api.anthropic.com</code>, etc.), routing it to US residential IP nodes. Non-Claude traffic never passes through our network — zero latency impact.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Authentication Layer: OAuth, SMS & Email Management</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Claude's login flow involves OAuth authorization, SMS verification codes, and email verification. The OriginAI client <strong className="text-text font-medium">automatically proxies OAuth authentication requests</strong>, while our backend manages SMS and email reception services. The entire verification process is fully transparent to the user — click "Log in" and everything completes automatically, with no manual verification codes or inbox checks required.
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Account Layer: Fully Managed, Zero Maintenance</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Every account is purchased and renewed by OriginAI using legitimate US domestic credit cards. Account credentials are encrypted and stored on our control plane. The client obtains OAuth tokens through a secure channel and stores them in the operating system's native secure storage, with automatic periodic refresh. Users never need to worry about account maintenance, renewals, or password management — <strong className="text-text font-medium">it feels like using your own account, but without any operational overhead</strong>.
        </p>

      </section>

      {/* Section 04: Security */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">04</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">Security & Privacy</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          You communicate directly with Anthropic's servers through the official Claude clients (Claude.ai, Claude Code). OriginAI only optimizes the network environment — <strong className="text-text font-medium">we never handle, relay, or store any of your data</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "100% Official Communication", desc: "You talk directly to Anthropic's servers. We only accelerate the network. Data is encrypted end-to-end — we are technically unable to access your content" },
            { title: "End-to-End Encryption", desc: "Data is encrypted on your device and decrypted at Anthropic. We only ever see ciphertext" },
            { title: "Open-Source Client", desc: "Source code is fully public. Anyone can audit and verify that there are no backdoors" },
            { title: "Fully Managed Service", desc: "Account maintenance, renewals, OAuth login, and verification code handling are all taken care of by us. Just connect with one click — zero operational overhead" },
          ].map((item) => (
            <div key={item.title} className="bg-bg-card border border-border rounded-xl p-4">
              <h4 className="text-[13px] font-medium text-text mb-1">{item.title}</h4>
              <p className="text-[12px] text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 05: Comparison */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">05</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">OriginAI vs. Black-Market Relay Services</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Behind rock-bottom prices, it's often your security and privacy footing the bill.
        </p>
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-bg-alt">
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Dimension</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Black-Market Relays</th>
                <th className="p-3 text-left text-[12px] font-medium text-brand border-b border-border">OriginAI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Account Source", "❌ Registered with stolen cards", "✓ Legitimately purchased through proper channels"],
                ["Exclusivity", "❌ Shared / oversold across users", "✓ 1:1 fully dedicated"],
                ["Model Authenticity", "❌ Low-tier models disguised as premium", "✓ Official account, guaranteed authentic"],
                ["Data Privacy", "❌ Intercepted, logged, resold for distillation", "✓ Zero-knowledge encryption, unable to read"],
                ["IP Quality", "❌ Datacenter IPs / already flagged", "✓ Clean US residential IPs"],
                ["Service Reliability", "❌ Frequent outages, no guarantees", "✓ Continuous monitoring, proactive maintenance"],
                ["Client Security", "❌ Closed-source, opaque", "✓ Open-source, auditable"],
              ].map(([dim, bad, good], i, arr) => (
                <tr key={dim} className={i < arr.length - 1 ? "border-b border-border" : ""}>
                  <td className="p-3 font-medium text-text bg-bg-card">{dim}</td>
                  <td className="p-3 text-red-500 bg-bg-card">{bad}</td>
                  <td className="p-3 text-green-600 bg-bg-card">{good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          For professionals handling <strong className="text-text font-medium">proprietary code, trade secrets, or sensitive information</strong>, the cost of a single data breach far exceeds months of service fees.
        </p>

      </section>

      {/* Section 06: OriginAI vs OpenRouter */}
      <section id="openrouter" className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">06</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">OriginAI vs OpenRouter</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Assuming an input-to-output ratio of roughly 1:4, if you use Claude 4.6 Opus for deep reasoning or coding, API-generated &quot;thinking tokens&quot; can push your effective cost to $21 per million. By contrast, Claude Max 20x compresses output cost to <strong className="text-text font-medium">$0.20</strong> — ideal for professional developers who need the model to &quot;think without limits.&quot;
        </p>
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-bg-alt">
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Plan Tier</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Monthly Fee</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Est. Monthly Throughput<br /><span className="text-[10px] text-text-faint">(1:4 ratio)</span></th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Eff. Input Price<br /><span className="text-[10px] text-text-faint">(per million)</span></th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">Eff. Output Price<br /><span className="text-[10px] text-text-faint">(per million)</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["OpenRouter API", "Pay-as-you-go", "N/A", "$5.00", "$25.00", true],
                ["Claude Pro", "$20", "~50M Tokens", "$0.08", "$0.40", false],
                ["Max 5x", "$100", "~250M Tokens", "$0.08", "$0.40", false],
                ["Max 20x", "$200", "~1B+ Tokens", "$0.04", "$0.20", false],
              ].map(([plan, fee, volume, input, output, isApi], i, arr) => (
                <tr key={plan as string} className={`${i < arr.length - 1 ? "border-b border-border" : ""} ${isApi ? "bg-red-50/50" : ""}`}>
                  <td className="p-3 font-medium text-text bg-bg-card">{plan}</td>
                  <td className="p-3 text-text-secondary bg-bg-card">{fee}</td>
                  <td className="p-3 text-text-secondary bg-bg-card">{volume}</td>
                  <td className={`p-3 bg-bg-card ${isApi ? "text-red-500" : "text-green-600"}`}>{input}</td>
                  <td className={`p-3 bg-bg-card ${isApi ? "text-red-500" : "text-green-600"}`}>{output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-4 bg-bg-card border border-border rounded-xl">
            <h4 className="text-[13px] font-medium text-text mb-1">Thinking Token Billing</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              Per Anthropic&apos;s February 2026 release notes, Claude 4.6 Opus enables &quot;deep thinking&quot; mode by default. Even if your prompt is only a few hundred words, the reasoning and code computation performed under the hood generates Thinking Tokens — all billed as output.
            </p>
          </div>
          <div className="p-4 bg-bg-card border border-border rounded-xl">
            <h4 className="text-[13px] font-medium text-text mb-1">The API Billing Trap</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              On API channels like OpenRouter, these invisible &quot;thinking tokens&quot; are billed at the premium $25/M output rate. A simple prompt (input) often triggers thinking processes and final replies (output) several times its size.
            </p>
          </div>
          <div className="p-4 bg-bg-card border border-border rounded-xl">
            <h4 className="text-[13px] font-medium text-text mb-1">Long-Form Generation</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              Opus users typically generate long documents, full project architectures, or complex bug fixes — scenarios where output vastly exceeds input. In API mode, once context exceeds 200K tokens, OpenRouter&apos;s input price often doubles (jumping to $10/M). Subscription plans (especially the Max tier) support up to 1M context with no surcharge — a decisive cost advantage for users working with entire codebases.
            </p>
          </div>
        </div>
      </section>

      {/* Section 07: Roadmap */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">07</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">Roadmap</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI follows a "<strong className="text-text font-medium">move fast, validate continuously</strong>" iteration strategy.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { num: "1", phase: "Phase 1 · Validation", title: "Product Validation (Months 1-2)", desc: "Deploy a small batch of accounts, release cross-platform desktop client MVP, build a core seed user community, and iterate rapidly on feedback.", tags: ["MVP Client", "Seed Users"], active: true },
            { num: "2", phase: "Phase 2 · Stabilization", title: "Infrastructure Upgrade (Months 3-4)", desc: "Deploy automated operations monitoring, scale account pool to 50, and implement self-service user onboarding.", tags: ["Automated Ops", "Self-Service"], active: false },
            { num: "3", phase: "Phase 3 · Growth", title: "Scaled Operations (Months 5-8)", desc: "Open-source the client codebase, expand IP pool node coverage, launch additional AI services, and explore lighter, more efficient system architectures.", tags: ["Open Source", "IP Pool Expansion", "More AI Services"], active: false },
            { num: "4", phase: "Phase 4 · Maturity", title: "Enterprise-Grade Service (Months 9-12)", desc: "Provide formal SLA guarantees, introduce third-party security audits, and launch enterprise-grade custom services.", tags: ["SLA Guarantee", "Security Audit", "Enterprise Edition"], active: false },
          ].map((item) => (
            <div key={item.num} className="relative pl-12 p-4 bg-bg-card border border-border rounded-xl">
              <div className={`absolute left-4 top-5 w-6 h-6 rounded-full border-[1.5px] border-brand flex items-center justify-center font-mono text-[10px] font-medium ${item.active ? "bg-brand text-white" : "bg-brand-light text-brand"}`}>
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

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">Current Progress</h3>
        <div className="space-y-3">
          {[
            { label: "Core Architecture Design", pct: 100, color: "bg-brand" },
            { label: "Backend Development", pct: 50, color: "bg-brand" },
            { label: "macOS Client Development", pct: 30, color: "bg-brand" },
            { label: "Windows Client Development", pct: 30, color: "bg-brand" },
            { label: "US Node Deployment", pct: 100, color: "bg-brand" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-text font-medium">{item.label}</span>
                <span className="text-text-faint font-mono text-[12px]">{item.pct}%</span>
              </div>
              <div className="h-2 bg-bg-alt rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 08: Vision */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">08</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">Vision</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI starts with Claude, but this is only the beginning.
        </p>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          We believe that <strong className="text-text font-medium">every user deserves barrier-free access to the world's most advanced AI tools</strong>. Regardless of location or technical background, no one should be shut out by payment barriers, network restrictions, or information asymmetry.
        </p>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Our long-term goal is to become the <strong className="text-text font-medium">unified gateway for premium, clean AI services</strong> — from Claude to more world-class AI platforms, delivering unrestricted, uncompromised, and fully transparent access. Let users focus on creation itself, not wrestling with infrastructure.
        </p>
        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          Authentic access, beyond Claude. Our vision is to bring the best AI within everyone's reach.
        </div>
      </section>
    </article>
  );
}
