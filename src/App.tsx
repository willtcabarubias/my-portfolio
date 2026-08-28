import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { Chevron, EASE } from "./components/ui";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { useRoute, useTheme } from "./lib/useRoute";

export default function App() {
  const route = useRoute();
  const { dark, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const key = route.name === "project" ? `p-${route.slug}` : "home";

  // Scroll to section when landing on home with a hash target
  useEffect(() => {
    if (route.name !== "home") return;
    const target = route.hash;
    const t = setTimeout(() => {
      if (!target) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, [route]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grain relative min-h-screen">
      <Nav onOpenPalette={() => setPaletteOpen(true)} dark={dark} toggleTheme={toggle} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onToggleTheme={toggle} />

      <AnimatePresence mode="wait">
        <motion.main
          key={key}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {route.name === "project" ? <ProjectPage slug={route.slug} /> : <Home />}
        </motion.main>
      </AnimatePresence>

      <Footer />

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="label fixed right-5 bottom-5 z-[62] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] shadow-lg md:right-8 md:bottom-8"
            aria-label="Back to top"
          >
            <Chevron direction="up" className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
