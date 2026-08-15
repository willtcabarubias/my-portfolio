import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";
import { navigate } from "../lib/useRoute";
import { EASE } from "./ui";

type Item = { id: string; title: string; hint: string; kind: string; action: () => void };

export default function CommandPalette({
  open,
  setOpen,
  onToggleTheme,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onToggleTheme: () => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const projectItems: Item[] = projects.map((p) => ({
      id: p.slug,
      title: p.title,
      hint: `${p.sector} · ${p.category}`,
      kind: "Case study",
      action: () => navigate(`/work/${p.slug}`),
    }));
    const nav: Item[] = [
      { id: "home", title: "Home", hint: "Back to top", kind: "Navigate", action: () => navigate("/") },
      { id: "work", title: "Selected Work", hint: "All case studies", kind: "Navigate", action: () => navigate("/work") },
      { id: "studio", title: "Capabilities", hint: "What I build", kind: "Navigate", action: () => navigate("/studio") },
      { id: "process", title: "Process", hint: "How I work", kind: "Navigate", action: () => navigate("/process") },
      { id: "build", title: "Build a Brief", hint: "Tell me what you need", kind: "Navigate", action: () => navigate("/build") },
      { id: "contact", title: "Contact", hint: "Start a project", kind: "Navigate", action: () => navigate("/contact") },
      {
        id: "theme",
        title: "Toggle appearance",
        hint: "Light / dark paper",
        kind: "Action",
        action: onToggleTheme,
      },
      {
        id: "copy",
        title: "Copy email address",
        hint: "hello@willy.dev",
        kind: "Action",
        action: () => navigator.clipboard?.writeText("hello@willy.dev"),
      },
    ];
    return [...projectItems, ...nav];
  }, [onToggleTheme]);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const s = q.toLowerCase();
    return items.filter((i) => (i.title + i.hint + i.kind).toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % Math.max(filtered.length, 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.action();
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="surface hairline relative w-full max-w-xl overflow-hidden border shadow-2xl"
          >
            <div className="hairline flex items-center gap-3 border-b px-5 py-4">
              <span className="label soft">Search</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                placeholder="Projects, sections, actions…"
                className="w-full bg-transparent text-base outline-none placeholder:opacity-40"
              />
              <span className="label hairline rounded border px-1.5 py-1">ESC</span>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="soft px-5 py-8 text-center text-sm">No matches.</div>
              )}
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors ${
                    i === active ? "bg-[var(--fg)] text-[var(--bg)]" : ""
                  }`}
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium">{item.title}</span>
                    <span className={`truncate text-xs ${i === active ? "opacity-70" : "soft"}`}>{item.hint}</span>
                  </span>
                  <span className="label shrink-0 opacity-60">{item.kind}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
