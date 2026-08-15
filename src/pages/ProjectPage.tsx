import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { navigate } from "../lib/useRoute";
import { Arrow, EASE, LineIn, Reveal } from "../components/ui";

export default function ProjectPage({ slug }: { slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(heroP, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(heroP, [0, 1], [1, 1.12]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="display text-6xl">Not found</h1>
        <button onClick={() => navigate("/")} className="label hairline rounded-full border px-5 py-3">
          Back home
        </button>
      </div>
    );
  }

  const accent = project.accent;

  return (
    <article className="pb-0">
      <motion.div className="fixed inset-x-0 top-0 z-[66] h-[2px] origin-left" style={{ scaleX: bar, background: accent }} />

      {/* Header */}
      <header className="px-5 pt-28 pb-10 md:px-10 md:pt-36">
        <div className="mx-auto max-w-[1500px]">
          <button
            onClick={() => navigate("/work")}
            className="label soft group mb-10 flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
          >
            <Arrow className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            All Work
          </button>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="label soft mb-6 flex flex-wrap items-center gap-3">
                <span style={{ color: accent }}>{project.index}</span>
                <span className="opacity-40">/</span>
                <span>{project.sector}</span>
                <span className="opacity-40">/</span>
                <span>{project.category}</span>
                <span className="hairline rounded-full border px-2.5 py-1" style={{ color: accent, borderColor: accent }}>
                  {project.status}
                </span>
              </div>
              <h1 className="display text-[15vw] leading-[0.84] sm:text-[9vw] lg:text-[6.6vw]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                  >
                    {project.title}
                  </motion.span>
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
                className="font-serif mt-6 max-w-2xl text-2xl leading-snug italic md:text-3xl"
              >
                {project.subtitle}
              </motion.p>
            </div>
            <div className="flex items-end lg:col-span-4">
              <p className="soft text-sm leading-relaxed">{project.summary}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div ref={heroRef} className="px-5 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
            <motion.img
              src={project.cover}
              alt={project.title}
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 h-[110%] w-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accent}55, transparent 60%)` }} />
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <section className="px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1500px]">
          <LineIn />
          <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Client", v: project.client },
              { k: "Role", v: project.role },
              { k: "Timeline", v: project.timeline },
              { k: "Year", v: project.year },
            ].map((m, i) => (
              <Reveal key={m.k} delay={i * 0.06}>
                <div className="label soft mb-3">{m.k}</div>
                <div className="text-[15px] leading-snug">{m.v}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + sticky index */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="label soft">Contents</div>
              <ul className="space-y-3">
                {["Overview", "The Problem", "Approach", "Capabilities", "Impact", "Stack"].map((t) => (
                  <li key={t} className="hairline border-b pb-3 text-sm">
                    <a href={`#s-${t.replace(/\s+/g, "")}`} className="link-underline">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="hairline surface border p-5">
                <div className="label soft mb-3">Modules shipped</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.modules.map((m) => (
                    <span key={m} className="label hairline rounded border px-2 py-1">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div id="s-Overview" className="scroll-mt-28">
              <h2 className="display mb-8 text-4xl md:text-5xl">Overview</h2>
              <div className="max-w-3xl space-y-6">
                {project.overview.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className={i === 0 ? "text-xl leading-relaxed md:text-2xl" : "soft text-base leading-relaxed"}>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div id="s-TheProblem" className="hairline mt-20 scroll-mt-28 border-t pt-12">
              <div className="grid gap-8 md:grid-cols-12">
                <h2 className="display text-3xl md:col-span-4 md:text-4xl">
                  The
                  <br />
                  <span className="font-serif normal-case italic" style={{ color: accent }}>
                    Problem
                  </span>
                </h2>
                <div className="md:col-span-8">
                  <Reveal>
                    <p className="font-serif text-2xl leading-snug md:text-[2rem]">{project.problem}</p>
                  </Reveal>
                </div>
              </div>
            </div>

            <div id="s-Approach" className="hairline mt-20 scroll-mt-28 border-t pt-12">
              <h2 className="display mb-10 text-3xl md:text-4xl">Approach</h2>
              <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
                {project.approach.map((a, i) => (
                  <Reveal key={i} delay={i * 0.05} className="bg-[var(--bg)]">
                    <div className="h-full p-6">
                      <div className="label mb-4" style={{ color: accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-[15px] leading-relaxed">{a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1500px] space-y-10">
          {project.gallery.map((g, i) => (
            <Reveal key={i} delay={0.05}>
              <figure className={i % 2 === 0 ? "" : "md:ml-[16%]"}>
                <div className="overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="soft hairline mt-4 flex items-start gap-4 border-t pt-3 text-sm">
                  <span className="label shrink-0" style={{ color: accent }}>
                    Fig. {i + 1}
                  </span>
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="s-Capabilities" className="scroll-mt-28 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <LineIn />
          <div className="flex flex-col gap-4 pt-8 pb-12 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-4xl md:text-6xl">
              What it <span className="font-serif normal-case italic">does</span>
            </h2>
            <span className="label soft">{project.features.length} core capabilities</span>
          </div>
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06} className="bg-[var(--bg)]">
                <div className="group h-full p-8 transition-colors hover:bg-[var(--card)]">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="label soft">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className="h-2 w-2 rounded-full transition-transform group-hover:scale-150"
                      style={{ background: accent }}
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-medium">{f.title}</h3>
                  <p className="soft text-sm leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="s-Impact" className="bg-ink text-paper scroll-mt-28 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="label mb-10 opacity-50">(Measured impact)</div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.07} className="bg-ink">
                <div className="p-8">
                  <div className="display text-5xl md:text-6xl" style={{ color: i === 0 ? "#e8a33d" : undefined }}>
                    {m.value}
                  </div>
                  <div className="label mt-4 opacity-60">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="display mb-6 text-3xl md:text-4xl">Outcome</h3>
              <p className="text-lg leading-relaxed opacity-80 md:text-xl">{project.outcome}</p>
            </div>
            {project.testimonial && (
              <div className="lg:col-span-5">
                <div className="border border-white/20 p-8">
                  <p className="font-serif text-xl leading-snug italic md:text-2xl">"{project.testimonial.quote}"</p>
                  <div className="label mt-6 opacity-60">
                    {project.testimonial.author} · {project.testimonial.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="s-Stack" className="scroll-mt-28 px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="label soft mb-5">(Technology)</div>
            <h2 className="display text-4xl md:text-5xl">
              Built
              <br />
              <span className="font-serif normal-case italic">with</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-3">
              {project.stack.map((t, i) => (
                <Reveal key={t} delay={i * 0.04}>
                  <span className="hairline rounded-full border px-5 py-3 text-sm transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                    {t}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build CTA */}
      <section className="px-5 pb-14 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="hairline surface flex flex-col items-start justify-between gap-6 border p-8 md:flex-row md:items-center md:p-10">
            <div>
              <div className="label soft mb-3">(Need something like this?)</div>
              <h3 className="display text-3xl md:text-4xl">
                Tell me <span className="font-serif normal-case italic">what you need</span>
              </h3>
            </div>
            <button
              onClick={() => navigate("/build")}
              className="label group flex shrink-0 items-center gap-2 rounded-full px-6 py-4 text-white transition-transform hover:-translate-y-0.5"
              style={{ background: accent }}
            >
              Open Brief Builder
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section
        className="group relative cursor-pointer overflow-hidden border-t hairline"
        onClick={() => navigate(`/work/${next.slug}`)}
      >
        <img
          src={next.cover}
          alt={next.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15 grayscale transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-30"
        />
        <div className="relative mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-24 md:px-10 md:py-32">
          <div className="label soft">(Next case study)</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-[13vw] leading-[0.85] sm:text-7xl lg:text-[6rem]">{next.title}</h2>
            <span className="label hairline flex items-center gap-3 rounded-full border px-6 py-4 transition-colors group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)]">
              Open project
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <p className="soft max-w-md text-sm">{next.subtitle}</p>
        </div>
      </section>
    </article>
  );
}
