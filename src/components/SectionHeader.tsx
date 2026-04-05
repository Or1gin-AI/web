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
