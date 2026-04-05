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
          加入 Waitlist，成为首批用户
        </p>
        <a
          href="https://wt.ls/origin-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-7 px-9 py-3 bg-dark text-bg text-[13px] rounded hover:opacity-90 transition-opacity"
        >
          加入 Waitlist
        </a>
      </AnimateOnScroll>
    </section>
  );
}
