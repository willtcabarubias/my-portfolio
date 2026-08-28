import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function LineIn({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("h-px w-full origin-left bg-[var(--line)]", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

export function SectionHead({
  label,
  title,
  right,
}: {
  label: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-14">
      <LineIn />
      <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <div className="label soft mb-5">{label}</div>
          <Reveal>
            <h2 className="display text-[13vw] leading-[0.85] sm:text-6xl md:text-7xl lg:text-[5.5rem]">{title}</h2>
          </Reveal>
        </div>
        {right ? <div className="max-w-sm md:pb-3">{right}</div> : null}
      </div>
    </div>
  );
}

export function Parallax({ children, amount = 60 }: { children: ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [amount, -amount]), {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-5">
      <div
        className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="display text-2xl md:text-3xl">{t}</span>
            <span className="text-accent text-lg">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("h-4 w-4", className)}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}) {
  const d =
    direction === "left"
      ? "M15 18L9 12L15 6"
      : direction === "up"
        ? "M6 15L12 9L18 15"
        : direction === "down"
          ? "M6 9L12 15L18 9"
          : "M9 18L15 12L9 6";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("h-4 w-4", className)}>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="label hairline rounded-full border px-3 py-1.5 leading-none">{children}</span>
  );
}
