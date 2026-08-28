import { navigate } from "../lib/useRoute";
import { projects } from "../data/projects";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper overflow-hidden px-5 pt-20 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="label mb-6 opacity-50">(Willy — Systems Developer)</div>
            <p className="font-serif max-w-sm text-2xl leading-snug italic md:text-3xl">
              Building the quiet software that keeps offices and small businesses running.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Email", "GitHub", "LinkedIn", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#/contact"
                  className="label rounded-full border border-white/25 px-4 py-2.5 transition-colors hover:bg-white hover:text-black"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="label mb-6 opacity-50">Selected Work</div>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() => navigate(`/work/${p.slug}`)}
                    className="link-underline text-sm opacity-80 hover:opacity-100"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="label mb-6 opacity-50">Navigate</div>
            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["Work", "/work"],
                ["Capabilities", "/studio"],
                ["Process", "/process"],
                ["Contact", "/contact"],
              ].map(([l, to]) => (
                <li key={l}>
                  <button onClick={() => navigate(to)} className="link-underline text-sm opacity-80 hover:opacity-100">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="label mb-6 opacity-50">Availability</div>
            <p className="text-sm opacity-80">
              Taking two new engagements for Q2 2026. Government and retail systems preferred.
            </p>
            <div className="label mt-6 flex items-center gap-2 text-accent-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Open for work
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <span className="label opacity-50">© {new Date().getFullYear()} Willy. All rights reserved.</span>
          <span className="label opacity-50">Press ⌘K to search · Built in the Philippines</span>
        </div>
      </div>

      <div className="pointer-events-none -mb-[2.5vw] select-none">
        <div className="display text-center text-[22vw] leading-[0.75] text-white/10">WILLY</div>
      </div>
    </footer>
  );
}
