export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  sector: "Government" | "Retail" | "Commerce" | "FinTech";
  category: string;
  year: string;
  timeline: string;
  role: string;
  status: "Live" | "In Production" | "Pilot";
  cover: string;
  gallery: { src: string; caption: string }[];
  accent: string;
  summary: string;
  overview: string[];
  problem: string;
  approach: string[];
  features: { title: string; body: string }[];
  metrics: { value: string; label: string }[];
  stack: string[];
  modules: string[];
  outcome: string;
  testimonial?: { quote: string; author: string; role: string };
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "osca-senior-citizen-system",
    index: "01",
    title: "OSCA Registry",
    subtitle: "Senior Citizen Affairs Management System",
    client: "Office for Senior Citizens Affairs — LGU",
    sector: "Government",
    category: "Public Records",
    year: "2025",
    timeline: "5 months · Discovery → Rollout",
    role: "Lead Developer · Systems Analyst",
    status: "Live",
    accent: "#c8451d",
    liveUrl: "https://osca-system-demo.vercel.app/",
    cover: "/osca.jpg",
    gallery: [
      {
        src: "https://images.pexels.com/photos/38887909/pexels-photo-38887909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Beneficiary-first design — large type, high contrast, few decisions per screen.",
      },
      {
        src: "https://images.pexels.com/photos/7103104/pexels-photo-7103104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Front-desk encoding flow reduced to a single continuous form.",
      },
    ],
    summary:
      "A single source of truth for senior citizen records — registration, ID issuance, pension tracking and benefit claims for an entire municipality.",
    overview: [
      "The OSCA Registry replaces stacks of folders and a dozen conflicting spreadsheets with one authoritative database of senior citizens. Every record carries a verified identity, household context, benefit history and claim trail.",
      "The system was designed around the reality of a public counter: intermittent internet, shared desktops, elderly walk-ins, and staff who are not technical. Everything had to work fast, offline-tolerant, and be understandable within one training session.",
    ],
    problem:
      "Records lived in paper folders and unversioned spreadsheets. Duplicate registrations, expired IDs and unclaimed pensions were only discovered during audits — often months late.",
    approach: [
      "Shadowed OSCA staff for two weeks to map the real counter workflow before writing a line of code.",
      "Modeled a canonical citizen record with de-duplication on name, birthdate and household.",
      "Built ID generation with printable layouts, QR verification and automatic expiry alerts.",
      "Shipped a role-based audit trail so every edit is attributable and reversible.",
    ],
    features: [
      { title: "Unified Citizen Profile", body: "Demographics, household, medical notes, benefit history and documents in one record." },
      { title: "ID Issuance & QR Verify", body: "Batch-printable senior ID cards with QR codes verified from any phone browser." },
      { title: "Pension Payout Tracking", body: "Quarterly payout masterlists, claim status, and authorized-representative logging." },
      { title: "Duplicate Detection", body: "Fuzzy matching flags likely duplicates before a record is ever saved." },
      { title: "Mortality & Status Sync", body: "Deceased, transferred and inactive statuses keep payout lists clean and auditable." },
      { title: "Report Generator", body: "One-click DSWD and council-ready reports exported to Excel and PDF." },
    ],
    metrics: [
      { value: "12,400+", label: "Senior records migrated" },
      { value: "-78%", label: "Time per registration" },
      { value: "1,180", label: "Duplicates resolved" },
      { value: "100%", label: "Audit trail coverage" },
    ],
    stack: ["PHP / Laravel", "MySQL", "Bootstrap", "Chart.js", "DomPDF", "Local Network Deploy"],
    modules: ["Registration", "ID Issuance", "Pension Payout", "Benefits", "Reports", "User Roles", "Audit Log", "Backup"],
    outcome:
      "The office now closes its quarterly payout reconciliation in an afternoon instead of two weeks, and the council receives verified counts without a manual recount.",
    testimonial: {
      quote:
        "Dati, kahon-kahon na folder. Ngayon, hanap lang ng pangalan — lumabas na lahat. It changed how our whole office works.",
      author: "OSCA Head",
      role: "Municipal Government",
    },
  },
  {
    slug: "aics-assistance-portal",
    index: "02",
    title: "AICS Portal",
    subtitle: "Assistance to Individuals in Crisis Situations",
    client: "Municipal Social Welfare & Development Office",
    sector: "Government",
    category: "Social Welfare",
    year: "2025",
    timeline: "4 months · Build → Pilot → Scale",
    role: "Full-stack Developer · Process Designer",
    status: "In Production",
    accent: "#1f5f4b",
    liveUrl: "https://aics-system-demo.vercel.app/",
    cover: "/aics.jpg",
    gallery: [
      {
        src: "https://images.pexels.com/photos/7103122/pexels-photo-7103122.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Intake queue with priority triage for medical and burial assistance.",
      },
      {
        src: "https://images.pexels.com/photos/5380618/pexels-photo-5380618.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Every disbursement carries an immutable approval chain.",
      },
    ],
    summary:
      "Crisis assistance from intake to disbursement — triaged, means-tested, approved and audited without a single misplaced form.",
    overview: [
      "AICS handles the most urgent requests a local government receives: medical bills, burial support, food and transportation for people in crisis. Speed matters, but so does accountability — every peso must be traceable.",
      "The portal digitizes the full case lifecycle: intake, assessment, eligibility check, approval routing, voucher generation and release. Social workers stopped chasing paper and started closing cases.",
    ],
    problem:
      "Applications were routed by hand across four desks. Nobody could answer 'where is my request?' and duplicate claims across barangays slipped through undetected.",
    approach: [
      "Mapped the approval chain into an explicit state machine with defined owners at each step.",
      "Added cross-checking against the OSCA registry and prior AICS claims to catch repeat availment.",
      "Designed a case timeline so any staffer can answer a citizen's status question in seconds.",
      "Built budget ceilings per assistance type so releases never quietly exceed allocation.",
    ],
    features: [
      { title: "Guided Intake", body: "Structured interview form that captures crisis type, household size and supporting documents." },
      { title: "Eligibility Engine", body: "Configurable rules for amount caps, cooling-off periods and repeat availment limits." },
      { title: "Approval Routing", body: "Sequential sign-off from social worker to MSWDO head with digital timestamps." },
      { title: "Voucher & Release", body: "Auto-generated guarantee letters and release forms with claimant signature capture." },
      { title: "Budget Ledger", body: "Live utilization per assistance category against the approved annual allocation." },
      { title: "Case Timeline", body: "A public reference code lets front-desk staff track any case instantly." },
    ],
    metrics: [
      { value: "3 days", label: "Avg. case turnaround (from 11)" },
      { value: "₱18M+", label: "Assistance tracked" },
      { value: "6", label: "Barangay desks connected" },
      { value: "0", label: "Lost application forms" },
    ],
    stack: ["Laravel", "MySQL", "Alpine.js", "Tailwind CSS", "Spatie Permissions", "Excel Export"],
    modules: ["Intake", "Assessment", "Eligibility", "Approval", "Disbursement", "Budget", "Reports", "Audit"],
    outcome:
      "Case turnaround dropped from eleven days to three, and the office passed its annual COA review with a complete digital paper trail.",
  },
  {
    slug: "ecommerce-storefront",
    index: "03",
    title: "Laptop Storefront",
    subtitle: "Preowned & Brand-New Laptop Store",
    client: "Independent laptop retailer — Preowned & Brand-New",
    sector: "Commerce",
    category: "Laptop Retail",
    year: "2024",
    timeline: "4 months · Catalog → Checkout → Ops",
    role: "Full-stack Developer",
    status: "Live",
    accent: "#8a4b1f",
    liveUrl: "https://demo-laptop.vercel.app/",
    cover: "/store_front_assets/img2.png",
    gallery: [
      {
        src: "/store_front_assets/img1.png",
        caption: "Storefront home — curated picks for brand-new and preowned, tuned for COD, e-wallets and cards.",
      },
      {
        src: "/store_front_assets/img3.png",
        caption: "Preowned detail — real photos per unit, battery health, cosmetic notes and serial-linked warranty.",
      },
      {
        src: "/store_front_assets/img2.png",
        caption: "Dual catalog — Brand-New and graded preowned (A/B) with transparent specs, condition and warranty at a glance.",
      },
    ],
    summary:
      "A storefront for a laptop shop selling both preowned and brand-new units — grading you can trust, specs you can compare, checkout that fits local reality.",
    overview: [
      "Most templates treat every SKU as new. This store sells two worlds side-by-side: sealed brand-new laptops and preowned units graded by condition, battery cycles and warranty window. Buyers need to know the difference without asking on chat.",
      "The storefront makes condition obvious — grade badges, real photos per preowned unit vs. clean catalog shots for brand-new — while the back office keeps serials, stock and warranty claims in sync so nothing oversells and every warranty promise is traceable.",
    ],
    problem:
      "Preowned listings looked like brand-new ones, so buyers didn't trust them and staff spent hours answering the same spec and condition questions. Brand-new and second-hand stock lived in separate sheets, causing oversells and inconsistent warranty handling.",
    approach: [
      "Split the catalog into Brand-New (catalog stock) and Preowned (serial-level) with distinct data shapes — preowned carries grade, cosmetic notes, battery health and serial photos.",
      "Built spec filters and side-by-side comparison (CPU / GPU / RAM / storage / condition / price) so buyers self-serve decisions.",
      "Designed checkout for COD, GCash/Maya and cards with courier waybill and store-pickup flows.",
      "Linked each preowned unit to its serial history so warranty and return eligibility are automatic at the packing table.",
    ],
    features: [
      { title: "Dual Catalog", body: "Brand-New and Preowned in one store, with grade A/B badges and stock counted the right way." },
      { title: "Condition Transparency", body: "Real photos per preowned unit, cosmetic notes, battery cycle count and warranty window." },
      { title: "Spec Compare", body: "Compare CPU, GPU, RAM and storage side-by-side with price-per-performance at a glance." },
      { title: "Smart Search & Filter", body: "Filter by brand, specs, condition, price and availability with instant results." },
      { title: "COD & E-Wallet Checkout", body: "Cash on delivery, GCash/Maya and cards — with courier booking and pickup options." },
      { title: "Warranty & Returns", body: "Serial-linked warranty countdown and structured RMA so claims are painless." },
    ],
    metrics: [
      { value: "-58%", label: "Chat inquiries per sale" },
      { value: "0", label: "Oversell incidents" },
      { value: "1.9s", label: "Storefront LCP" },
      { value: "+31%", label: "Preowned sell-through" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe / GCash", "Vercel"],
    modules: ["Catalog", "Condition Grading", "Checkout", "Orders", "Fulfillment", "Warranty", "CRM", "Reports"],
    outcome:
      "Buyers now self-serve the comparison that used to take 20 chat messages, and the team runs one inventory instead of two — no more oversells, no more warranty arguments.",
  },
  {
    slug: "tradencelab",
    index: "04",
    title: "TradenceLab",
    subtitle: "Discipline Layer for Binance Futures Traders",
    client: "Indie FinTech — Binance Futures Ecosystem",
    sector: "FinTech",
    category: "Risk Platform",
    year: "2026",
    timeline: "3 months · Guardrails → Live Account → Telegram",
    role: "Product Engineer · Binance API + Telegram",
    status: "Live",
    accent: "#f0b90b",
    liveUrl: "https://tradence-lab-demo-eta.vercel.app/",
    cover: "/tradencelab_asstes/img2.png",
    gallery: [
      {
        src: "/tradencelab_asstes/img1.png",
        caption: "Arm your guardrails — daily loss limit, leverage cap and cooldown configured before you trade.",
      },
      {
        src: "/tradencelab_asstes/img3.png",
        caption: "Telegram alert the moment you break a rule — live Binance Futures account watched via read-only API.",
      },
      {
        src: "/tradencelab_asstes/img4.png",
        caption: "Breach timeline with account snapshots — review, not revenge trade.",
      },
      {
        src: "/tradencelab_asstes/img2.png",
        caption: "Read-only Binance connect — no trading permission, no withdrawal, discipline only.",
      },
    ],
    summary:
      "Trading discipline enforcement for Binance Futures — connect a read-only API key, arm your guardrails and get Telegram alerts the instant you break your own risk rules.",
    overview: [
      "TradenceLab is the discipline layer futures traders know they need but can't enforce in the heat of the moment. You set the rules when you're calm — daily loss limit, leverage cap, cooldown after a losing streak — and TradenceLab watches your live Binance Futures account for you.",
      "No trade execution, no custody. A read-only API key streams position and PnL; the guardrail engine evaluates every update and fires a Telegram alert the second a rule triggers. Beginners and revenge traders get the pause they wouldn't give themselves.",
    ],
    problem:
      "Traders know their rules but break them in real time — revenge trading after a loss, creeping leverage, ignoring a daily stop. Willpower fails when PnL is flashing red, and a dashboard banner is easy to miss.",
    approach: [
      "Built on read-only Binance Futures API — subscribes to live account and position updates, never requests trade permission.",
      "Modeled guardrails as composable risk rules (daily loss, max leverage, consecutive losses, cooldown windows) with explicit arming per user.",
      "Designed Telegram as the enforcement surface — instant, out-of-app, impossible to ignore versus in-dashboard banners.",
      "Logged every trigger with an account snapshot for post-trade review and discipline streaks to reward adherence.",
    ],
    features: [
      { title: "Read-Only Connect", body: "Binance Futures API with trade disabled — verifies permissions before arming." },
      { title: "Guardrail Builder", body: "Daily loss limits, leverage caps, cooldowns and custom thresholds — arm or disarm per session." },
      { title: "Live Account Watch", body: "Evaluates real PnL and positions against guardrails on every account update." },
      { title: "Telegram Alerts", body: "Instant breach alerts with rule, value and account context — not a delayed email." },
      { title: "Breach Timeline", body: "History of triggers with snapshots so you review, not replay, mistakes." },
      { title: "Discipline Streak", body: "Streaks and cool-down enforcement to reward rule adherence, not just punish." },
    ],
    metrics: [
      { value: "< 2s", label: "Alert latency" },
      { value: "0", label: "Trade permissions requested" },
      { value: "100%", label: "Telegram delivery" },
      { value: "24/7", label: "Account watch" },
    ],
    stack: ["Next.js", "TypeScript", "Binance Futures API", "Telegram Bot API", "PostgreSQL", "Vercel"],
    modules: ["API Connect", "Guardrails", "Watcher", "Telegram", "Breach Log", "Discipline", "Auth", "Audit"],
    outcome:
      "Rules stop being sticky notes. Traders get the pause that protects the account — alerted before the next revenge trade, with a timeline to learn instead of repeat.",
  },
];

export const services = [
  {
    n: "01",
    title: "Government Systems",
    body: "OSCA, AICS, barangay records and civil registry platforms built to survive audits, brownouts and staff turnover.",
    tags: ["Records", "Disbursement", "Audit Trails", "Reporting"],
  },
  {
    n: "02",
    title: "Retail & POS",
    body: "Serial-level inventory, quoting, installments and warranty desks for stores selling high-value goods.",
    tags: ["Inventory", "POS", "Warranty", "Margins"],
  },
  {
    n: "03",
    title: "E-Commerce",
    body: "Storefronts and fulfillment back-offices designed around COD, couriers and small teams packing real boxes.",
    tags: ["Storefront", "Fulfillment", "Payments", "Returns"],
  },
  {
    n: "04",
    title: "Systems Rescue",
    body: "Inheriting a system nobody understands. Documentation, refactoring, data migration and a path forward.",
    tags: ["Migration", "Refactor", "Docs", "Training"],
  },
];

export const processSteps = [
  { n: "01", title: "Sit at the counter", body: "I watch the actual work before proposing anything. Requirements written from a chair, not a chat thread." },
  { n: "02", title: "Model the truth", body: "One canonical data model. Duplicates, edge cases and exceptions handled at the schema level." },
  { n: "03", title: "Ship small, ship real", body: "A usable module in weeks, not a big-bang launch in a year. Feedback from real users early." },
  { n: "04", title: "Train and hand over", body: "Documentation, one-page cheat sheets and training sessions. The system must outlive me." },
];
