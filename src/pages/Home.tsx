import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { processSteps, projects, services } from "../data/projects";
import { navigate } from "../lib/useRoute";
import BriefBuilder from "../components/BriefBuilder";
import Hero from "../components/Hero";
import { Arrow, EASE, LineIn, Marquee, Reveal, SectionHead, Tag } from "../components/ui";

const filters = ["All", "Government", "Retail", "Commerce"] as const;

function Ticker() {
  return (
    <div className="hairline border-y bg-[var(--fg)] text-[var(--bg)]">
      <Marquee
        items={["OSCA Systems", "AICS Portals", "POS & Inventory", "E-Commerce", "Barangay Records", "Data Migration"]}
      />
    </div>
  );
}

function Statement() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="label soft lg:col-span-3">(Statement)</div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-serif text-3xl leading-[1.25] sm:text-4xl md:text-5xl lg:text-[3.4rem]">
                Software for a government office is not a demo. It is a{" "}
                <span className="text-accent italic">counter with a queue</span>, a payout that must reconcile, and an
                audit that will ask questions. I build systems that hold up on the day it actually matters.
              </p>
            </Reveal>
            <div className="hairline mt-14 grid gap-10 border-t pt-10 sm:grid-cols-3">
              {[
                { k: "20+", v: "Systems delivered across LGUs and local businesses" },
                { k: "6 yrs", v: "Building public-sector and retail software" },
                { k: "40k+", v: "Records migrated without a single loss" },
              ].map((s, i) => (
                <Reveal key={s.k} delay={i * 0.08}>
                  <div className="display text-5xl md:text-6xl">{s.k}</div>
                  <p className="soft mt-3 max-w-[16rem] text-sm leading-relaxed">{s.v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.sector === filter)),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-20 px-5 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead
          label="(Selected Work / 2023 — 2026)"
          title={
            <>
              Case
              <br />
              <span className="font-serif normal-case italic">Studies</span>
            </>
          }
          right={
            <p className="soft text-sm leading-relaxed">
              Six systems, each solving a specific operational problem. Open any project for the full breakdown —
              context, decisions, architecture and measured outcome.
            </p>
          }
        />

        <div className="mb-10 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`label hairline relative rounded-full border px-4 py-2.5 transition-colors ${
                filter === f ? "text-[var(--bg)]" : "hover:text-accent"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span className="relative z-10">
                {f}{" "}
                <span className="opacity-50">
                  ({f === "All" ? projects.length : projects.filter((p) => p.sector === f).length})
                </span>
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.07, ease: EASE }}
              onClick={() => navigate(`/work/${p.slug}`)}
              className="group cursor-pointer"
            >
              <div className="surface hairline relative aspect-[4/3] overflow-hidden border">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="label absolute top-3 left-3 rounded-full bg-[var(--bg)] px-2.5 py-1.5">
                  {p.status}
                </span>
                <span
                  className="absolute right-3 bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[var(--bg)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ color: p.accent }}
                >
                  <Arrow className="h-4 w-4 -rotate-45" />
                </span>
              </div>
              <div className="hairline mt-4 flex items-start justify-between gap-4 border-t pt-4">
                <div>
                  <div className="label soft mb-2">
                    {p.index} — {p.category}
                  </div>
                  <h3 className="display group-hover:text-accent text-2xl transition-colors md:text-[1.7rem]">
                    {p.title}
                  </h3>
                  <p className="soft mt-2 max-w-[22rem] text-sm leading-relaxed">{p.subtitle}</p>
                </div>
                <span className="label soft shrink-0">{p.year}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="studio" className="hairline scroll-mt-20 border-t px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionHead
          label="(Capabilities)"
          title={
            <>
              What I<br />
              <span className="font-serif normal-case italic">Build</span>
            </>
          }
          right={
            <p className="soft text-sm leading-relaxed">
              Four practice areas. Every engagement includes data modeling, migration, staff training and
              documentation — not just code.
            </p>
          }
        />
        <div className="hairline border-t">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="hairline group grid gap-5 border-b py-8 transition-colors hover:bg-[var(--card)] md:grid-cols-12 md:items-center md:px-4">
                <div className="label soft md:col-span-1">{s.n}</div>
                <h3 className="display group-hover:text-accent text-3xl transition-colors md:col-span-4 md:text-4xl">
                  {s.title}
                </h3>
                <p className="soft text-sm leading-relaxed md:col-span-4">{s.body}</p>
                <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                  {s.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-ink text-paper scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="label mb-5 opacity-50">(How I work)</div>
            <Reveal>
              <h2 className="display text-[12vw] leading-[0.86] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Method
                <br />
                <span className="text-accent-2 font-serif normal-case italic">over motion</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-5">
            <p className="text-sm leading-relaxed opacity-70">
              Most failed systems fail before development — in requirements written by people who never watched the
              work happen. My process starts on the floor.
            </p>
          </div>
        </div>

        <div className="grid gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07} className="bg-ink">
              <div className="group h-full p-8 transition-colors hover:bg-white/[0.04]">
                <div className="label text-accent-2 mb-8">{s.n}</div>
                <h3 className="display mb-4 text-2xl md:text-3xl">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@willy.dev";

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <LineIn />
        <div className="grid gap-12 pt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="label soft mb-6">(Direct line)</div>
            <Reveal>
              <h2 className="display text-[13vw] leading-[0.85] sm:text-7xl lg:text-[6.2rem]">
                Prefer to
                <br />
                <span className="font-serif normal-case italic">just talk?</span>
              </h2>
            </Reveal>
            <p className="soft mt-8 max-w-md text-sm leading-relaxed">
              Skip the builder and message me the old way — I read every one personally.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="group label flex items-center gap-3 rounded-full bg-[var(--fg)] px-6 py-4 text-[var(--bg)] transition-transform hover:-translate-y-0.5"
              >
                {copied ? "Copied to clipboard" : email}
                <span className="opacity-60">{copied ? "✓" : "⧉"}</span>
              </button>
              <button
                onClick={() => navigate("/build")}
                className="hairline label rounded-full border px-6 py-4 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
              >
                Open Brief Builder
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hairline surface border p-8">
              <div className="label soft mb-6">Engagement checklist</div>
              <ul className="space-y-4">
                {[
                  "Scoping call — free, 30 minutes",
                  "Written proposal with fixed milestones",
                  "Weekly demo builds, no black boxes",
                  "Data migration and staff training included",
                  "Source code and documentation handed over",
                ].map((t) => (
                  <li key={t} className="hairline flex items-start gap-3 border-b pb-4 text-sm last:border-0 last:pb-0">
                    <span className="text-accent mt-0.5">✳</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="hairline mt-8 grid grid-cols-2 gap-4 border-t pt-6">
                {[
                  { k: "Based in", v: "Philippines · GMT+8" },
                  { k: "Response", v: "Within 24 hours" },
                ].map((m) => (
                  <div key={m.k}>
                    <div className="label soft mb-1.5">{m.k}</div>
                    <div className="text-sm">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Statement />
      <WorkGrid />
      <Capabilities />
      <Process />
      <BriefBuilder />
      <Contact />
    </>
  );
}
