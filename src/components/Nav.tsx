import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { navigate } from "../lib/useRoute";
import { EASE } from "./ui";

const links = [
  { label: "Work", to: "/work" },
  { label: "Capabilities", to: "/studio" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export default function Nav({
  onOpenPalette,
  dark,
  toggleTheme,
}: {
  onOpenPalette: () => void;
  dark: boolean;
  toggleTheme: () => void;
}) {
  const { scrollYProgress, scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <>
      <motion.div
        className="bg-accent fixed inset-x-0 top-0 z-[65] h-[2px] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          solid ? "backdrop-blur-md" : ""
        }`}
        style={{
          background: solid ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
          borderBottom: solid ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-10">
          <button onClick={() => navigate("/")} className="group flex items-baseline gap-2">
            <span className="display text-xl md:text-2xl">Willy</span>
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <button
                key={l.to}
                onClick={() => navigate(l.to)}
                className="link-underline label hover:text-accent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              className="hairline label soft hover:text-accent hidden items-center gap-2 rounded-full border px-3.5 py-2 transition-colors sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              Search
              <span className="opacity-50">⌘K</span>
            </button>
            <a
              href="https://github.com/willtcabarubias"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub — willtcabarubias"
              className="hairline hidden h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)] sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hairline flex h-9 w-9 items-center justify-center rounded-full border transition-transform hover:scale-105"
            >
              <span className="text-xs">{dark ? "☀" : "☾"}</span>
            </button>
            <button
              onClick={() => navigate("/build")}
              className="label bg-accent hidden rounded-full px-4 py-2.5 text-white transition-transform hover:-translate-y-0.5 sm:block"
            >
              Hire me
            </button>
            <button
              onClick={() => setMenu(true)}
              aria-label="Menu"
              className="hairline flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            >
              <span className="text-sm">≡</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] md:hidden"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="display text-xl">Menu</span>
              <button onClick={() => setMenu(false)} className="hairline h-9 w-9 rounded-full border">
                ✕
              </button>
            </div>
            <div className="flex flex-col px-5 pt-6">
              {[...links, { label: "Hire me", to: "/build" }].map((l, i) => (
                <motion.button
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, ease: EASE, duration: 0.6 }}
                  onClick={() => {
                    navigate(l.to);
                    setMenu(false);
                  }}
                  className={`hairline display border-b py-6 text-left text-5xl ${
                    l.to === "/build" ? "text-accent" : ""
                  }`}
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
