import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EASE, LineIn } from "./ui";

/* ── Config ─────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: "gov",
    code: "GOV",
    title: "Government System",
    desc: "OSCA, AICS, barangay records, civil registry, disbursement & audit trails.",
    modules: [
      "Citizen Registry",
      "ID Issuance",
      "Benefit Claims",
      "Disbursement",
      "Approval Routing",
      "Audit Log",
      "Reports & Exports",
      "Data Migration",
    ],
  },
  {
    id: "pos",
    code: "POS",
    title: "Retail & POS",
    desc: "Serial-level inventory, quoting, installments, warranty desk, multi-branch.",
    modules: [
      "Inventory",
      "Point of Sale",
      "Quotations",
      "Installments",
      "Warranty Desk",
      "Suppliers",
      "Branch Transfers",
      "Sales Analytics",
    ],
  },
  {
    id: "com",
    code: "COM",
    title: "E-Commerce",
    desc: "Storefront, unified order inbox, fulfillment, COD reconciliation, returns.",
    modules: [
      "Storefront",
      "Checkout & Payments",
      "Order Inbox",
      "Pick & Pack",
      "Courier Booking",
      "COD Reconciliation",
      "Returns / RMA",
      "Customer CRM",
    ],
  },
  {
    id: "res",
    code: "RES",
    title: "Systems Rescue",
    desc: "Inherit, document, refactor and migrate a system nobody understands.",
    modules: [
      "System Audit",
      "Documentation",
      "Refactoring",
      "Data Migration",
      "Bug Triage",
      "Staff Training",
      "Handover Package",
    ],
  },
  {
    id: "cus",
    code: "CUS",
    title: "Something Custom",
    desc: "Not on the list. Describe it and I'll tell you honestly if I'm the right build.",
    modules: ["Discovery Workshop", "Prototype", "MVP Build", "Integrations", "Automation", "Dashboard / Analytics"],
  },
];

const TIMELINES = ["ASAP (< 1 mo)", "1 – 3 months", "3 – 6 months", "Flexible"];
const BUDGETS = ["Under ₱100k", "₱100k – ₱300k", "₱300k – ₱800k", "₱800k+", "Not sure yet"];
const STAGES = ["Just an idea", "Have requirements", "Replacing a system", "Rescuing a build"];
const STEPS = ["Scope", "Modules", "Details", "Send"] as const;

const EMAIL = "hello@willy.dev";

/* ── Parts ──────────────────────────────────────────────────── */

function Segmented({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div>
      <div className="label soft mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(active ? "" : o)}
              className={`hairline relative rounded-full border px-4 py-2.5 text-xs transition-colors ${
                active ? "text-[var(--bg)]" : "soft hover:text-[var(--fg)]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`seg-${label}`}
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
              <span className="relative z-10">{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 21;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--line)" strokeWidth="2.5" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={c}
        animate={{ strokeDashoffset: c - (c * pct) / 100 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </svg>
  );
}

/* ── Main ───────────────────────────────────────────────────── */

export default function BriefBuilder() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [modules, setModules] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [stage, setStage] = useState("");
  const [users, setUsers] = useState(25);
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableModules = useMemo(
    () => SERVICES.filter((s) => picked.includes(s.id)).flatMap((s) => s.modules.map((m) => ({ m, s: s.code }))),
    [picked],
  );

  const pct = useMemo(() => {
    let n = 0;
    if (picked.length) n += 25;
    if (modules.length) n += 15;
    if (stage) n += 10;
    if (timeline) n += 10;
    if (budget) n += 10;
    if (form.name.trim()) n += 10;
    if (/\S+@\S+\.\S+/.test(form.email)) n += 15;
    if (form.message.trim().length > 12) n += 5;
    return Math.min(n, 100);
  }, [picked, modules, stage, timeline, budget, form]);

  const briefText = useMemo(() => {
    const svc = SERVICES.filter((s) => picked.includes(s.id)).map((s) => `${s.code} · ${s.title}`);
    return [
      "PROJECT BRIEF — willy.dev",
      "──────────────────────────────",
      `FROM      : ${form.name || "—"}${form.org ? ` (${form.org})` : ""}`,
      `EMAIL     : ${form.email || "—"}`,
      "",
      `SCOPE     : ${svc.length ? svc.join(" | ") : "—"}`,
      `MODULES   : ${modules.length ? modules.join(", ") : "—"}`,
      `STAGE     : ${stage || "—"}`,
      `TIMELINE  : ${timeline || "—"}`,
      `BUDGET    : ${budget || "—"}`,
      `USERS     : ~${users} staff / users`,
      "",
      "NOTES",
      "──────────────────────────────",
      form.message.trim() || "—",
      "",
      `Completeness: ${pct}%`,
    ].join("\n");
  }, [picked, modules, stage, timeline, budget, users, form, pct]);

  const valid = picked.length > 0 && form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email);
  const canNext = [picked.length > 0, true, true, valid][step];

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const send = () => {
    if (!valid) return;
    const codes = SERVICES.filter((s) => picked.includes(s.id))
      .map((s) => s.code)
      .join("/");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Project Brief — ${codes} — ${form.name}`,
    )}&body=${encodeURIComponent(briefText)}`;
    setSent(true);
    setTimeout(() => setSent(false), 7000);
  };

  const copy = () => {
    navigator.clipboard?.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([briefText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brief-${(form.name || "project").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="build" className="hairline scroll-mt-20 border-t px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <LineIn />
        <div className="flex flex-col gap-6 pt-6 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label soft mb-5">(Brief Builder / Interactive)</div>
            <h2 className="display text-[13vw] leading-[0.85] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Tell me
              <br />
              <span className="font-serif normal-case italic">what you need</span>
            </h2>
          </div>
          <p className="soft max-w-sm text-sm leading-relaxed">
            Pick what you need, set the details, add your notes. The brief writes itself on the right — then send it,
            copy it, or download it as a file.
          </p>
        </div>

        <div className="hairline grid gap-px border bg-[var(--line)] lg:grid-cols-12">
          {/* ── Left: steps ─────────────────────────── */}
          <div className="bg-[var(--bg)] p-6 md:p-10 lg:col-span-7">
            <div className="mb-10 flex flex-wrap items-center gap-2">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <button
                    key={s}
                    onClick={() => setStep(i)}
                    className={`label hairline flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
                      active ? "border-[var(--color-accent)] text-accent" : done ? "text-[var(--fg)]" : "soft"
                    }`}
                  >
                    <span className="opacity-50">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                    {done && <span className="text-accent">✓</span>}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="min-h-[23rem]"
              >
                {/* 0 — Scope */}
                {step === 0 && (
                  <div>
                    <h3 className="display mb-2 text-3xl">What do you need?</h3>
                    <p className="soft mb-8 text-sm">Select one or more. This shapes everything after.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((s) => {
                        const on = picked.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              if (on) setModules((m) => m.filter((x) => !s.modules.includes(x)));
                              toggle(picked, setPicked, s.id);
                            }}
                            className={`hairline group border p-5 text-left transition-colors ${
                              on ? "bg-[var(--fg)] text-[var(--bg)]" : "hover:bg-[var(--card)]"
                            }`}
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className={`label ${on ? "" : "text-accent"}`}>{s.code}</span>
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-sm border text-[9px] ${
                                  on ? "border-current" : "hairline opacity-40"
                                }`}
                              >
                                {on ? "✓" : ""}
                              </span>
                            </div>
                            <div className="display mb-2 text-xl">{s.title}</div>
                            <p className={`text-xs leading-relaxed ${on ? "opacity-70" : "soft"}`}>{s.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 1 — Modules */}
                {step === 1 && (
                  <div>
                    <h3 className="display mb-2 text-3xl">Which parts matter?</h3>
                    <p className="soft mb-8 text-sm">
                      {availableModules.length
                        ? "Optional — tap what you need. Unsure? Skip it and we'll scope on the call."
                        : "Choose a scope in step 01 first."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableModules.map(({ m, s }) => {
                        const on = modules.includes(m);
                        return (
                          <button
                            key={`${s}-${m}`}
                            type="button"
                            onClick={() => toggle(modules, setModules, m)}
                            className={`hairline rounded-full border px-4 py-2.5 text-xs transition-colors ${
                              on ? "bg-[var(--fg)] text-[var(--bg)]" : "soft hover:text-[var(--fg)]"
                            }`}
                          >
                            {on ? "− " : "+ "}
                            {m}
                          </button>
                        );
                      })}
                    </div>
                    {modules.length > 0 && (
                      <div className="hairline mt-8 border-t pt-5">
                        <span className="label soft">
                          {modules.length} selected · rough build window{" "}
                          <span className="text-accent">{Math.max(4, modules.length * 2)} weeks</span>
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 2 — Details */}
                {step === 2 && (
                  <div className="space-y-9">
                    <div>
                      <h3 className="display mb-2 text-3xl">Set the details</h3>
                      <p className="soft text-sm">Honest ranges get you an honest proposal.</p>
                    </div>
                    <Segmented label="Current stage" options={STAGES} value={stage} onChange={setStage} />
                    <Segmented label="Timeline" options={TIMELINES} value={timeline} onChange={setTimeline} />
                    <Segmented label="Budget range" options={BUDGETS} value={budget} onChange={setBudget} />
                    <div>
                      <div className="label soft mb-4 flex items-center justify-between">
                        <span>Expected users</span>
                        <span className="text-accent">~{users}</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={500}
                        step={5}
                        value={users}
                        onChange={(e) => setUsers(Number(e.target.value))}
                        className="accent-[var(--color-accent)] w-full"
                      />
                      <div className="label soft mt-2 flex justify-between opacity-60">
                        <span>5</span>
                        <span>500+</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3 — Send */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="display mb-2 text-3xl">Where do I reply?</h3>
                      <p className="soft text-sm">No newsletters, no auto-sequences. A real reply within 24 hours.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { k: "name", label: "Your name *", ph: "Juan Dela Cruz" },
                        { k: "email", label: "Email *", ph: "you@office.gov.ph" },
                      ].map((f) => (
                        <label key={f.k} className="block">
                          <span className="label soft mb-2 block">{f.label}</span>
                          <input
                            value={form[f.k as "name" | "email"]}
                            onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                            placeholder={f.ph}
                            className="hairline w-full border-b bg-transparent py-3 text-sm outline-none transition-colors placeholder:opacity-30 focus:border-[var(--color-accent)]"
                          />
                        </label>
                      ))}
                    </div>
                    <label className="block">
                      <span className="label soft mb-2 block">Organization / business</span>
                      <input
                        value={form.org}
                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                        placeholder="LGU, office or store name"
                        className="hairline w-full border-b bg-transparent py-3 text-sm outline-none transition-colors placeholder:opacity-30 focus:border-[var(--color-accent)]"
                      />
                    </label>
                    <label className="block">
                      <span className="label soft mb-2 flex items-center justify-between">
                        <span>Tell me about it</span>
                        <span className="opacity-50">{form.message.length}/1200</span>
                      </span>
                      <textarea
                        value={form.message}
                        maxLength={1200}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        placeholder="What's breaking today? Who uses the system? What must it produce — reports, IDs, payouts, invoices?"
                        className="hairline surface w-full resize-none border p-4 text-sm leading-relaxed outline-none transition-colors placeholder:opacity-30 focus:border-[var(--color-accent)]"
                      />
                    </label>
                    {!valid && <p className="label text-accent">Required: scope · name · valid email</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="hairline mt-10 flex items-center justify-between border-t pt-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="label soft transition-opacity disabled:opacity-25"
              >
                ← Back
              </button>
              {step < 3 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="label rounded-full bg-[var(--fg)] px-5 py-3 text-[var(--bg)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next — {STEPS[step + 1]} →
                </button>
              ) : (
                <button
                  onClick={send}
                  disabled={!valid}
                  className="label bg-accent rounded-full px-6 py-3 text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {sent ? "Sent ✓" : "Send to Willy →"}
                </button>
              )}
            </div>
          </div>

          {/* ── Right: live preview ─────────────────── */}
          <div className="surface p-6 md:p-8 lg:col-span-5">
            <div className="sticky top-24">
              <div className="hairline mb-6 flex items-center justify-between border-b pb-5">
                <div>
                  <div className="label soft mb-2">Your brief — live</div>
                  <div className="label text-accent">{pct === 100 ? "Ready to send" : "Awaiting input"}</div>
                </div>
                <div className="relative flex items-center justify-center">
                  <Ring pct={pct} />
                  <span className="label absolute">{pct}</span>
                </div>
              </div>

              <pre className="hairline max-h-[24rem] overflow-auto border bg-[var(--bg)] p-4 font-mono text-[11px] leading-[1.75] whitespace-pre-wrap">
                {briefText}
              </pre>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={copy}
                  className="hairline label rounded-full border py-3 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  {copied ? "Copied ✓" : "Copy brief"}
                </button>
                <button
                  onClick={download}
                  className="hairline label rounded-full border py-3 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  Download .txt
                </button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="label text-accent mt-4 border border-[var(--color-accent)] p-4 leading-relaxed"
                  >
                    ✓ Your mail app is opening with the brief in the body. If nothing happened, hit “Copy brief” and
                    send it to {EMAIL}.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="hairline mt-6 grid grid-cols-2 gap-4 border-t pt-5">
                {[
                  { k: "Reply time", v: "Within 24 hours" },
                  { k: "Scoping call", v: "Free · 30 min" },
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
