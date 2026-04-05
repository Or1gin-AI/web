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
          随着 Claude 成为开发者和专业人士不可或缺的生产力工具，大量中国用户面临一个现实问题：<strong className="text-text font-medium">想用上纯净的官方 Claude，太难了</strong>。目前市面上的两条路，都充满风险。
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
          走不了官方路线，很多用户转向「中转站」寻求替代。然而，这个市场的水比想象中更深。绝大多数中转站运营者采用<strong className="text-text font-medium">「一鱼三吃」</strong>的模式：
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

      {/* Section 02 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">02</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">核心问题：支付与 IP 决定一切</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          无论是自行注册还是通过中转站，用户遇到的所有问题，归根结底都指向同一个根源：<strong className="text-text font-medium">支付方式和 IP 地址不够干净</strong>。
        </p>
        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">支付方式的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          Anthropic 对支付来源有严格的风控策略。<strong className="text-text font-medium">美国本土正规信用卡付款几乎不会触发风控</strong>。OriginAI 的所有账号均使用美国本土正规信用卡购买和续费。
        </p>
        <h3 className="text-[15px] font-medium text-text mt-6 mb-3">IP 质量的影响</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          IP 质量直接影响<strong className="text-text font-medium">账号存活、访问稳定性和使用体验</strong>：
        </p>
        <div className="space-y-2 mb-6">
          {[
            { text: "账号封禁", desc: "使用数据中心 IP、频繁切换 IP、多账号共用同一 IP 段，均会触发风控。" },
            { text: "频繁验证与限流", desc: "可疑 IP 触发更频繁的验证和速率限制。" },
            { text: "「降智」争议", desc: "脏 IP 带来的频繁中断和限流严重影响使用体验。" },
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { value: "美国信用卡", label: "本土正规支付，零风控", color: "text-brand" },
            { value: "家庭住宅 IP", label: "非机房，非数据中心", color: "text-green-600" },
            { value: "1:1 独享", label: "一人一号，不共享不超卖", color: "text-text" },
          ].map((s) => (
            <div key={s.value} className="bg-bg-card border border-border rounded-xl p-4 text-center">
              <div className={`font-serif text-[24px] font-light ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-text-faint mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="border-l-[3px] border-brand bg-brand-light rounded-r-lg px-5 py-3 text-[14px] text-text-secondary italic">
          我们不替换模型、不拦截数据、不做任何中间处理。您使用的就是官方的 Claude。
        </div>
      </section>

      {/* Section 03 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">03</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">技术实现</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          OriginAI 客户端只做两件事：<strong className="text-text font-medium">转发 Claude 流量</strong>和<strong className="text-text font-medium">自动处理登录验证</strong>。
        </p>
        <div className="bg-bg-alt rounded-xl p-6 mb-6 font-mono text-[12px] text-text-muted overflow-x-auto">
          <div className="flex items-center justify-center gap-2 flex-nowrap min-w-[500px]">
            {[
              { label: "💻 用户设备", desc: "macOS / Win / Linux", highlight: false },
              { label: "⚡ OriginAI", desc: "只转发 Claude 流量", highlight: true },
              { label: "🏠 美国家庭节点", desc: "住宅 IP", highlight: false },
              { label: "🤖 Claude", desc: "Anthropic 官方", highlight: true },
            ].map((box, i) => (
              <div key={box.label} className="contents">
                {i > 0 && <span className="text-text-faint text-sm shrink-0">→</span>}
                <div className={`px-3 py-2 border rounded-lg text-center min-w-[100px] ${box.highlight ? "border-brand bg-brand-light" : "border-border-strong bg-bg-card"}`}>
                  <span className="text-[11px] font-medium text-text block">{box.label}</span>
                  <span className="text-[10px] text-text-faint">{box.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "只转发 Claude 流量", desc: "仅识别 claude.ai 和 api.anthropic.com" },
            { title: "客户端开源", desc: "源码完全公开，用户可自行审计" },
            { title: "一键登录", desc: "OAuth 验证自动转发" },
            { title: "双场景兼容", desc: "Claude.ai + Claude Code CLI" },
          ].map((item) => (
            <div key={item.title} className="bg-bg-card border border-border rounded-xl p-4">
              <h4 className="text-[13px] font-medium text-text mb-1">{item.title}</h4>
              <p className="text-[12px] text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">04</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">安全与隐私设计</h2>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
          核心理念：<strong className="text-text font-medium">「不是我们承诺不看你的数据，而是我们在技术上无法看到你的数据」</strong>。
        </p>
        <div className="flex rounded-xl overflow-hidden border border-border mb-6 flex-col sm:flex-row">
          {[
            { icon: "📝", title: "您的对话", desc: "浏览器 / CLI 中\nTLS 加密", tag: "已加密 🔒", green: true },
            { icon: "🚇", title: "OriginAI 隧道", desc: "只转发密文\n无法解密读取", tag: "密文通过", green: false },
            { icon: "🤖", title: "Anthropic", desc: "官方服务器\n到达后解密处理", tag: "安全到达 ✓", green: true },
          ].map((s, i) => (
            <div key={s.title} className={`flex-1 p-5 text-center bg-bg-card ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-border" : ""}`}>
              <span className="text-xl block mb-2">{s.icon}</span>
              <h4 className="text-[12px] font-medium text-text mb-1">{s.title}</h4>
              <p className="text-[11px] text-text-muted leading-relaxed whitespace-pre-line">{s.desc}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${s.green ? "bg-green-50 text-green-600" : "bg-bg-alt text-text-muted"}`}>{s.tag}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { title: "零知识架构", desc: "隧道传输 TLS 加密流量，OriginAI 节点只看到密文。" },
            { title: "无日志政策", desc: "连接元数据最多保留 7 天，不记录任何请求内容。" },
            { title: "安全凭证存储", desc: "凭证加密存储，OAuth token 在系统安全存储中。" },
            { title: "开源透明", desc: "客户端完全开源，支持可复现构建。" },
            { title: "反检测策略", desc: "固定家庭 IP，TLS 指纹完全透传。" },
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

      {/* Section 05 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">05</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">OriginAI vs 黑产中转站</h2>
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
      </section>

      {/* Section 06 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">06</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">发展路线图</h2>
        <div className="space-y-3 mb-6">
          {[
            { num: "1", phase: "Phase 1 · 验证期", title: "产品验证（第 1-2 月）", desc: "发布桌面客户端 MVP，建立种子用户群。", tags: ["MVP 客户端", "种子用户"], active: true },
            { num: "2", phase: "Phase 2 · 稳定期", title: "基础设施升级（第 3-4 月）", desc: "自动化运维，账号池扩展至 50 个。", tags: ["自动化运维", "自助开通"], active: false },
            { num: "3", phase: "Phase 3 · 增长期", title: "规模化运营（第 5-8 月）", desc: "代码开源，IP 池扩展，团队方案。", tags: ["代码开源", "团队方案"], active: false },
            { num: "4", phase: "Phase 4 · 成熟期", title: "企业级服务（第 9-12 月）", desc: "SLA 保证，安全审计，企业定制。", tags: ["SLA 保证", "企业版"], active: false },
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
      </section>

      {/* Section 07 */}
      <section className="mb-10">
        <p className="font-mono text-[11px] text-brand uppercase tracking-widest mb-3">07</p>
        <h2 className="font-serif text-[22px] font-light text-text mb-4 leading-snug">常见问题</h2>
        <div className="divide-y divide-border">
          {[
            { q: "OriginAI 和普通 VPN 有什么区别？", a: "OriginAI 只路由 Anthropic 相关流量，不是全局 VPN。延迟更低，不会触发其他网站风控。" },
            { q: "你们能看到我的对话内容吗？", a: "不能。端到端 TLS 加密，我们只转发密文，技术上无法读取。" },
            { q: "账号会被封禁吗？", a: "合法购买的账号 + 纯净家庭 IP，风控风险极低。持续监控主动维护。" },
            { q: "支持哪些使用方式？", a: "Claude.ai 网页版和 Claude Code CLI。支持 macOS、Windows、Linux。" },
            { q: "如何保证正版模型？", a: "直连 Anthropic 官方服务器，不做任何 API 转发或模型替换。" },
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
