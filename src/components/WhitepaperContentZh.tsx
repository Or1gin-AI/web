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

export default function WhitepaperContent() {
  return (
    <article className="max-w-[720px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[11px] text-text-faint uppercase tracking-widest mb-3">
          Whitepaper
        </p>
        <h1 className="font-serif text-[clamp(26px,5vw,38px)] font-light leading-tight text-text mb-4">
          OriginAI：极致的 Claude 体验
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-[560px]">
          正本清源，回归正版。合规账号、纯净 IP、全流程托管——让您在自己的电脑上，100% 使用 Claude 官方服务。
        </p>
        <div className="flex gap-6 mt-4 text-[12px] text-text-faint font-mono">
          <span>v1.0</span>
          <span>2026.04</span>
          <span>OriginAI Team</span>
        </div>
      </div>

      {/* Why Claude */}
      <section className="mb-10 text-center">
        <p className="text-[13px] text-text-muted mb-1">为什么是 Claude？</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-1 leading-snug">
          全球最受欢迎的顶尖 AI 模型
        </h2>
        <p className="text-[13px] text-text-secondary max-w-[560px] mx-auto mb-6">
          Anthropic 年营收超 140 亿美元，连续三年 10 倍增长。Claude Opus 4.6 包揽 Chatbot Arena 人类盲评前两名，SWE-bench 软件工程得分领跑全行业。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { value: "$140亿", label: "年营收", sub: "全球增长最快 AI 公司" },
            { value: "#1 #2", label: "Chatbot Arena", sub: "Opus 4.6 包揽前两名", accent: true },
            { value: "76.8%", label: "SWE-bench", sub: "业界最高解决率" },
            { value: "Top 5", label: "代码竞技场", sub: "全部被 Claude 包揽", green: true },
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
          数据来源：Anthropic 官方公告 (2026.02)、Chatbot Arena (arena.ai)、SWE-bench 官方排行榜
        </p>
      </section>

      <div className="h-px bg-border mb-10" />

      {/* Section 01: Market */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">01</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">
          用户困境：两条路都走不通
        </h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          随着 Claude 成为开发者和专业人士不可或缺的生产力工具，大量用户面临一个现实问题：<strong className="text-text font-medium">想用上纯净的官方 Claude，太难了</strong>。目前市面上的两条路，都充满风险。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">路径一：自己注册 — 充值即封号</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          许多用户尝试自行注册 Claude 账号并充值订阅，但很快发现这条路几乎走不通：
        </p>
        <div className="space-y-3 mb-6">
          {[
            { Icon: RiBankCardLine, title: "支付方式不过关", desc: "Anthropic 对支付来源有严格风控。使用非美国信用卡、虚拟卡或代充值，极易触发风控导致账号被封，充值的钱也打了水漂。" },
            { Icon: RiGlobalLine, title: "IP 不够干净", desc: "网络环境不够干净（数据中心 IP、共享出口、频繁切换节点），轻则频繁弹出验证码、被限流，重则直接封号。就算侥幸开通，也活不了多久。" },
            { Icon: RiEmotionUnhappyLine, title: "提心吊胆的体验", desc: "即使账号暂时存活，用户也时刻担心被封、担心降智、担心 IP 被标记。在恐惧中使用 AI，完全无法专注于工作本身。" },
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

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">路径二：中转站 — 一鱼三吃的黑色产业链</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          走不了官方路线，很多用户转向「中转站」寻求替代。然而，绝大多数中转站运营者采用<strong className="text-text font-medium">「一鱼三吃」</strong>的模式：
        </p>
        <div className="space-y-3 mb-6">
          {[
            { Icon: RiBankCardLine, title: "第一吃：盗刷信用卡", desc: "使用窃取的信用卡注册 AI 账号。账号随时可能因欺诈检测被封停，用户购买的服务说断就断。" },
            { Icon: RiSpyLine, title: "第二吃：倒卖与伪装 API", desc: "将黑号逆向包装成 API 售卖，用中低端模型冒充前沿模型。用户以为在用 Opus，实际可能收到 Haiku 的回复。" },
            { Icon: RiBaseStationLine, title: "第三吃：贩卖用户数据", desc: "拦截并记录所有对话数据，转售给第三方做模型蒸馏训练。用户的代码、商业机密和隐私信息完全裸奔。" },
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
          自己注册，充值就封号；用中转站，安全和隐私全部交出去。用户需要的，是一条真正能走通的第三条路。
        </div>
      </section>

      {/* Section 02: Core Problem + Solution */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">02</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">核心问题：支付与 IP 决定一切</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          无论是自行注册还是通过中转站，用户遇到的所有问题，归根结底都指向同一个根源：<strong className="text-text font-medium">支付方式和 IP 地址不够干净</strong>。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">支付方式的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Anthropic 对支付来源有严格的风控策略。<strong className="text-text font-medium">美国本土正规信用卡付款几乎不会触发风控</strong>。OriginAI 的所有账号均使用美国本土正规信用卡购买和续费，从支付源头杜绝风控风险。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">IP 质量的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          许多用户的网络环境并不理想。但 IP 质量直接影响<strong className="text-text font-medium">账号存活、访问稳定性和使用体验</strong>：
        </p>
        <div className="space-y-2 mb-6">
          {[
            { text: "账号封禁", desc: "使用数据中心 IP、频繁切换 IP、多账号共用同一 IP 段，均会触发 Anthropic 风控系统。" },
            { text: "频繁验证与限流", desc: "可疑 IP 会触发更频繁的 Cloudflare 验证、登录二次验证，以及更早触发的速率限制。" },
            { text: "「降智」争议", desc: "脏 IP 带来的频繁中断和限流本身就严重影响使用体验。" },
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { value: "美国信用卡", label: "本土正规支付，零风控", color: "text-brand" },
            { value: "家庭住宅 IP", label: "非机房，非数据中心", color: "text-green-600" },
            { value: "1:1 独享", label: "一人一号，不共享不超卖", color: "text-text" },
            { value: "100% 官方", label: "Claude.ai / Claude Code", color: "text-brand" },
          ].map((s) => (
            <div key={s.value} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className={`font-serif text-[22px] font-light ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-text-faint mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">使用流程</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {[
            { num: "1", Icon: RiBox3Line, title: "安装 OriginAI 客户端", desc: "下载开源客户端\nmacOS / Windows / Linux", tag: "一键安装", highlight: false },
            { num: "2", Icon: RiFlashlightLine, title: "一键开启加速", desc: "智能优化网络环境\n自动建立稳定连接", tag: "自动完成", highlight: false },
            { num: "3", Icon: RiRobot2Line, title: "使用官方 Claude", desc: "Claude.ai\nClaude Code · 100% 官方", tag: "开始使用", highlight: true },
          ].map((step, i) => (
            <div key={step.num} className="contents">
              {i > 0 && <div className="hidden sm:flex items-center text-text-faint text-sm justify-center">→</div>}
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
          您在 Claude 官方网页和客户端中登录账号，100% 使用 Anthropic 官方服务。我们不替换模型、不拦截数据、不做任何中间处理。
        </p>
      </section>

      {/* Section 03: Technical */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">03</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">技术实现</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 客户端是一款轻量级开源桌面应用，类似于游戏加速器的工作原理——<strong className="text-text font-medium">智能识别 Claude 流量，自动优化网络环境</strong>，确保所有 Claude 请求均通过优质美国家庭 IP 出口。其他网络活动完全不受影响。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">网络层：Claude 专属加速</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          客户端在本地运行一个轻量代理服务，通过域名规则精确匹配 Claude 相关流量（<code className="text-[13px] font-mono bg-bg-alt px-1 py-0.5 rounded">claude.ai</code>、<code className="text-[13px] font-mono bg-bg-alt px-1 py-0.5 rounded">api.anthropic.com</code> 等），将其路由至部署在美国的家庭住宅 IP 节点。非 Claude 流量完全不经过我们的网络，零延迟影响。
        </p>

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">账号层：全托管无感运维</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          每个账号由 OriginAI 使用美国本土正规信用卡购买和续费。账号凭证加密存储在我们的控制平面，客户端通过安全通道获取必要凭证并存储在操作系统级安全存储中，定期自动更新。用户无需关心账号维护、续费、密码管理等任何细节——<strong className="text-text font-medium">像使用自己的账号一样，但完全免去运维负担</strong>。
        </p>

      </section>

      {/* Section 04: Security */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">04</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">安全与隐私</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          您直接使用 Claude 官方客户端（Claude.ai、Claude Code）与 Anthropic 服务器通信。OriginAI 只优化网络环境，<strong className="text-text font-medium">不经手、不中转、不存储您的任何数据</strong>。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "100% 官方通信", desc: "您直接与 Anthropic 服务器对话，我们只做网络加速，数据全程加密，技术上无法触碰您的内容" },
            { title: "端到端加密", desc: "数据在您的设备上加密，在 Anthropic 解密，我们只看到密文" },
            { title: "客户端开源", desc: "源码完全公开，任何人可审计验证我们没有后门" },
            { title: "软件全托管", desc: "账号维护、续费与连接配置全部由我们统一处理，您只需一键连接，零运维负担" },
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
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">OriginAI vs 黑产中转站</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          价格低廉的背后，往往是用户的安全和隐私在买单。
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
                ["数据隐私", "❌ 拦截记录，转售蒸馏", "✓ 零知识加密，无法读取"],
                ["IP 质量", "❌ 机房 IP / 已被标记", "✓ 纯净美国家庭 IP"],
                ["服务稳定性", "❌ 频繁中断，无保障", "✓ 持续监控，主动维护"],
                ["客户端安全", "❌ 闭源不透明", "✓ 开源可审计"],
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
          对于处理<strong className="text-text font-medium">专有代码、商业机密或敏感信息</strong>的专业用户而言，一次数据泄露的损失，远超数月的服务费用。
        </p>

      </section>

      {/* Section 06: OriginAI vs OpenRouter */}
      <section id="openrouter" className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">06</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">OriginAI vs OpenRouter</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          假设输入输出比约 1:4，如果您使用 Claude 4.6 Opus 进行深度推理或代码编写，API 产生的「思考 Token」将使您的成本飙升至每百万 $21。相比之下，Claude Max 20x 将输出成本压缩至 <strong className="text-text font-medium">$0.20</strong>，特别适合需要模型进行「无限制深度思考」的专业开发者。
        </p>
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-bg-alt">
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">方案层级</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">月费</th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">预计月吞吐量<br /><span className="text-[10px] text-text-faint">(1:4 比例)</span></th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">等效输入单价<br /><span className="text-[10px] text-text-faint">(每百万)</span></th>
                <th className="p-3 text-left text-[12px] font-medium text-text-muted border-b border-border">等效输出单价<br /><span className="text-[10px] text-text-faint">(每百万)</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                ["OpenRouter API", "按量", "N/A", "$5.00", "$25.00", true],
                ["Claude Pro", "$20", "~5,000万", "$0.08", "$0.40", false],
                ["Max 5x", "$100", "~2.5亿", "$0.08", "$0.40", false],
                ["Max 20x", "$200", "~10亿+", "$0.04", "$0.20", false],
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
            <h4 className="text-[13px] font-medium text-text mb-1">思维链（Thinking Tokens）计费</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              根据 2026 年 2 月 Anthropic 的发布说明，Claude 4.6 Opus 默认开启了「深度思考」模式。即使你的提问只有几百字，模型在底层进行的逻辑推理、代码演算产生的 Thinking Tokens 全部算作输出（Output）。
            </p>
          </div>
          <div className="p-4 bg-bg-card border border-border rounded-xl">
            <h4 className="text-[13px] font-medium text-text mb-1">API 计费陷阱</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              在 OpenRouter 等 API 渠道，这些不可见的「思考 Token」也是按 $25/百万 的高价计费的。这意味着一个简单的提示词（Input）往往会带出数倍于它的思考过程和最终回复（Output）。
            </p>
          </div>
          <div className="p-4 bg-bg-card border border-border rounded-xl">
            <h4 className="text-[13px] font-medium text-text mb-1">长内容生成</h4>
            <p className="text-[12px] text-text-muted leading-relaxed">
              Opus 用户通常用于撰写长篇文档、完整项目架构或复杂 Bug 修复，这些场景的输出量远超输入。API 模式下，如果上下文超过 200K，OpenRouter 的输入单价往往会翻倍（跳至 $10/M）。而订阅版（尤其是 Max 系列）支持最高 1M 上下文且不加价，这对于处理整个代码库（Codebase）的用户来说是决定性的价格优势。
            </p>
          </div>
        </div>
      </section>

      {/* Section 07: Roadmap */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">07</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">发展路线图</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 采用「<strong className="text-text font-medium">小步快跑、持续验证</strong>」的迭代策略。
        </p>
        <div className="space-y-3 mb-6">
          {[
            { num: "1", phase: "Phase 1 · 验证期", title: "产品验证（第 1-2 月）", desc: "少量账号投入运营，发布跨平台桌面客户端 MVP，建立核心种子用户群，收集反馈快速迭代。", tags: ["MVP 客户端", "种子用户"], active: true },
            { num: "2", phase: "Phase 2 · 稳定期", title: "基础设施升级（第 3-4 月）", desc: "部署自动化运维监控体系，账号池扩展至 50 个，实现用户自助开通流程。", tags: ["自动化运维", "自助开通"], active: false },
            { num: "3", phase: "Phase 3 · 增长期", title: "规模化运营（第 5-8 月）", desc: "客户端代码正式开源，扩展 IP 池节点覆盖，上线更多 AI 服务，探索更轻量高效的系统架构。", tags: ["代码开源", "IP 池扩展", "更多 AI 服务"], active: false },
            { num: "4", phase: "Phase 4 · 成熟期", title: "企业级服务（第 9-12 月）", desc: "提供 SLA 正式保证，引入第三方安全审计，推出企业级定制服务。", tags: ["SLA 保证", "安全审计", "企业版"], active: false },
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

        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">当前进度</h3>
        <div className="space-y-3">
          {[
            { label: "核心架构设计", pct: 100, color: "bg-brand" },
            { label: "后端开发", pct: 50, color: "bg-brand" },
            { label: "macOS 端开发", pct: 30, color: "bg-brand" },
            { label: "Windows 端开发", pct: 30, color: "bg-brand" },
            { label: "美国节点部署", pct: 100, color: "bg-brand" },
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
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">展望</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 从 Claude 开始，但这只是我们的起点。
        </p>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          我们相信，<strong className="text-text font-medium">每一位用户都应该无障碍地使用全球最前沿的 AI 工具</strong>。不论身处何地，不论技术背景，都不应该因为支付壁垒、网络限制或信息不对称而被拒之门外。
        </p>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          我们的长期目标是成为<strong className="text-text font-medium">高质量纯净 AI 服务的统一入口</strong>——从 Claude 到更多世界级 AI 平台，提供无限制、无妥协、完全透明的访问体验。让用户专注于创造本身，而非与基础设施搏斗。
        </p>
        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          正本清源，不止于 Claude。我们的愿景是让每一个人都能触及最好的 AI。
        </div>
      </section>
    </article>
  );
}
