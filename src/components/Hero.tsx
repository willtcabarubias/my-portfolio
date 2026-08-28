import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { navigate } from "../lib/useRoute";
import { Arrow, EASE } from "./ui";

const RAILS = [
  { k: "OSCA", v: "Senior Registry" },
  { k: "AICS", v: "Crisis Assistance" },
  { k: "STORE", v: "store front" },
  { k: "TradenceLab", v: "trading guardrails" },
];

const HEAD = ["Systems", "that serve"];

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 20 });
  const sy = useSpring(my, { stiffness: 55, damping: 20 });

  const px = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const py = useTransform(sy, [-0.5, 0.5], [-7, 7]);
  const discX = useTransform(sx, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20">
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60vw 50vh at 72% 40%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 70%)",
        }}
      />

      {/* Top rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-wrap items-center gap-x-8 gap-y-2 px-5 pt-4 md:px-10"
      >
        <span className="label soft flex items-center gap-2">
          <span className="bg-accent inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
          Surigao City, Philippines · GMT+8
        </span>
        <span className="label soft ml-auto hidden md:inline">Portfolio Vol. 02</span>
      </motion.div>

      {/* ── Two-column composition ─────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-10 px-5 py-10 md:px-10 lg:grid-cols-12 lg:gap-14">
        {/* LEFT — headline */}
        <div className="lg:col-span-7">
          <h1 className="display text-[15vw] leading-[0.82] sm:text-[11.5vw] lg:text-[7.2vw]">
            {HEAD.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 1.15, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="flex items-baseline gap-5 overflow-hidden">
              <motion.span
                className="text-accent font-serif block shrink-0 text-[13vw] normal-case italic sm:text-[10.5vw] lg:text-[6.8vw]"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 1.15, ease: EASE }}
              >
                real people
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 1, ease: EASE }}
                className="hidden h-px flex-1 origin-left bg-[var(--line)] lg:block"
              />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.9, ease: EASE }}
            className="mt-10 max-w-xl"
          >
            <div className="space-y-3">
              <p className="text-[15px] leading-relaxed">
                <span className="font-medium">WILLY ESCABAL CABARUBIAS</span> — BSIS, Bachelor of Science in
                Information Systems<br />
                <span className="soft text-sm">Surigao City, Philippines · GMT+8 · Full-stack dev</span>
              </p>
              <div className="soft space-y-2 text-[13px] leading-relaxed">
                <p>
                  <span className="label text-[11px] tracking-wide">Frontend:</span> React · Vite · TypeScript ·
                  Tailwind · Zustand · Radix · Framer Motion · Recharts · Dexie (offline) · docxtemplater · ExcelJS
                </p>
                <p>
                  <span className="label text-[11px] tracking-wide">Backend:</span> Supabase (Postgres + Auth +
                  Storage) · Next.js · Railway · vite-plugin-singlefile
                </p>
                <p>
                  <span className="label text-[11px] tracking-wide">Payments:</span> Stripe · Squizzy
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <button
                onClick={() => navigate("/build")}
                className="group label flex items-center gap-2 rounded-full bg-[var(--fg)] px-5 py-3.5 text-[var(--bg)] transition-transform hover:-translate-y-0.5"
              >
                Build a Brief
                <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate("/work")}
                className="hairline label rounded-full border px-5 py-3.5 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              >
                Selected Work
              </button>
            </div>

            {/* Inline stats — replaces the floating badges */}
            <div className="hairline mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6">
              {[
                { k: "20+", v: "Systems shipped" },
                { k: "40k+", v: "Records migrated" },
                { k: "3 yrs", v: "Building software" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="display text-2xl md:text-[1.75rem]">{s.k}</div>
                  <div className="label soft mt-1.5">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — portrait */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: EASE }}
          className="relative flex justify-center self-start lg:col-span-5 lg:justify-end lg:-mt-24"
        >
          <div className="relative w-[min(74vw,360px)] lg:w-full lg:max-w-[420px]">
            {/* Arch plate — clips the portrait so any photo backdrop reads as a studio plate */}
            <motion.div
              style={{ x: discX }}
              className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]"
            >
              <motion.img
                src="/images/willy.png"
                alt="Willy — systems developer"
                style={{ x: px, y: py }}
                className="absolute inset-x-0 bottom-0 h-[102%] w-full object-contain object-bottom"
              />
            </motion.div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="hairline relative z-20 flex items-center justify-between gap-4 border-t pt-3"
            >
              <span className="label soft">Fig. 01 — Willy</span>
              <span className="label soft">Systems Developer</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hairline relative z-20 border-t"
      >
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 md:grid-cols-4">
          {RAILS.map((r, i) => (
            <div
              key={r.k}
              className={`hairline flex items-baseline justify-between gap-3 px-5 py-4 md:px-6 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i === 2 ? "md:border-l" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
            >
              <span className="display text-lg">{r.k}</span>
              <span className="label soft text-right">{r.v}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
