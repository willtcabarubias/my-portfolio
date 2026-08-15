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
            <span className="label soft hidden sm:inline">Systems Developer</span>
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
              Build a Brief
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
              {[...links, { label: "Build a Brief", to: "/build" }].map((l, i) => (
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
