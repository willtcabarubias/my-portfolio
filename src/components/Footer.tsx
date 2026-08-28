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
              <a
                href="mailto:willy.cabarubias.dev@gmail.com"
                className="label rounded-full border border-white/25 px-4 py-2.5 transition-colors hover:bg-white hover:text-black"
              >
                Email
              </a>
              <a
                href="https://github.com/willtcabarubias"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub — willtcabarubias"
                className="label inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 transition-colors hover:bg-white hover:text-black"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              {["LinkedIn", "Facebook"].map((s) => (
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
