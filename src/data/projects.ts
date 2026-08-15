export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  sector: "Government" | "Retail" | "Commerce";
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
    cover:
      "https://images.pexels.com/photos/36883131/pexels-photo-36883131.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
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
    cover:
      "https://images.pexels.com/photos/7103110/pexels-photo-7103110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
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
    slug: "laptop-retail-pos",
    index: "03",
    title: "Circuit POS",
    subtitle: "Laptop Retail, Serials & Warranty Platform",
    client: "Independent laptop & computer retailer",
    sector: "Retail",
    category: "Point of Sale",
    year: "2024",
    timeline: "3 months · MVP → Multi-branch",
    role: "Product Engineer",
    status: "Live",
    accent: "#2b4d8c",
    cover:
      "https://images.pexels.com/photos/12968298/pexels-photo-12968298.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    gallery: [
      {
        src: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Every unit tracked by serial from delivery to warranty expiry.",
      },
      {
        src: "https://images.pexels.com/photos/14553707/pexels-photo-14553707.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Margin visibility per unit, not just per invoice.",
      },
    ],
    summary:
      "Serial-level inventory, quoting, installment tracking and warranty claims for a laptop store selling high-value units.",
    overview: [
      "Selling laptops is not selling groceries. Each unit has a serial, a warranty window, a specific configuration and a real margin that must be defended. Generic POS software treats them as interchangeable stock.",
      "Circuit POS models the individual unit. Sales staff can quote a build, reserve a serial, log an installment plan, and later pull the exact warranty history when the customer walks back in with a defect.",
    ],
    problem:
      "Stock counts never matched the shelf, warranties were tracked in a notebook, and nobody knew which models were actually profitable after trade-ins and discounts.",
    approach: [
      "Built a serial-first inventory model where every laptop is a unique tracked asset.",
      "Created a quotation builder for custom configurations with live margin preview.",
      "Added a warranty desk with claim intake, service status and turnaround tracking.",
      "Layered simple analytics: fastest movers, dead stock, margin per brand.",
    ],
    features: [
      { title: "Serial-Level Stock", body: "Each unit carries its own specs, cost, supplier, warranty start and location." },
      { title: "Quotation Builder", body: "Build a spec sheet, apply upgrades, preview margin, send a branded quote." },
      { title: "Installment Ledger", body: "Track down payments, schedules and balances for in-house financing." },
      { title: "Warranty Desk", body: "Claim intake, RMA status, loaner units and service turnaround timers." },
      { title: "Trade-In Valuation", body: "Log trade-ins as inventory with grading and refurb cost tracking." },
      { title: "Branch Transfers", body: "Move units between branches with confirmation on both ends." },
    ],
    metrics: [
      { value: "99.4%", label: "Inventory accuracy" },
      { value: "+22%", label: "Gross margin visibility" },
      { value: "4,800", label: "Units serial-tracked" },
      { value: "2 min", label: "Avg. checkout time" },
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Thermal Printing"],
    modules: ["Inventory", "Sales", "Quotations", "Installments", "Warranty", "Suppliers", "Branches", "Analytics"],
    outcome:
      "The owner finally knows which models make money. Dead stock is cleared quarterly instead of aging on the shelf for a year.",
    testimonial: {
      quote: "The warranty module alone paid for the system. We stopped losing arguments with customers because everything is logged.",
      author: "Store Owner",
      role: "Computer Retail",
    },
  },
  {
    slug: "ecommerce-storefront",
    index: "04",
    title: "Shopfront",
    subtitle: "Local E-Commerce & Fulfillment Suite",
    client: "Multi-category online seller",
    sector: "Commerce",
    category: "E-Commerce",
    year: "2024",
    timeline: "4 months · Store → Ops → Growth",
    role: "Full-stack Developer",
    status: "Live",
    accent: "#8a4b1f",
    cover:
      "https://images.pexels.com/photos/7857532/pexels-photo-7857532.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    gallery: [
      {
        src: "https://images.pexels.com/photos/7857542/pexels-photo-7857542.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Pick-and-pack screens built for the actual packing table.",
      },
      {
        src: "https://images.pexels.com/photos/29502370/pexels-photo-29502370.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Checkout tuned for COD, e-wallets and cards.",
      },
    ],
    summary:
      "A storefront and back-office built for local reality — cash on delivery, courier booking, and a packing table that actually keeps up.",
    overview: [
      "Most e-commerce templates assume card payments and a warehouse. This build assumes COD, e-wallets, a rider pickup at 4PM, and a two-person team packing on a folding table.",
      "The storefront is fast and clean; the back office is where the real work happens — order triage, courier booking, stock sync and a return flow that does not lose money.",
    ],
    problem:
      "Orders came from three chat apps and a spreadsheet. Overselling was constant, and reconciling COD remittances took an entire weekend every month.",
    approach: [
      "Consolidated every channel into one order inbox with a single status vocabulary.",
      "Built pick-and-pack screens sized for a tablet at the packing table.",
      "Automated courier waybill generation and COD remittance reconciliation.",
      "Added a lightweight CRM so repeat buyers get recognized, not re-entered.",
    ],
    features: [
      { title: "Fast Storefront", body: "Server-rendered catalog with variant support, image galleries and instant search." },
      { title: "Unified Order Inbox", body: "Web, chat and marketplace orders in one queue with one status model." },
      { title: "Pick & Pack Mode", body: "Tablet-friendly picking lists, barcode confirmation and packing verification." },
      { title: "Courier Integration", body: "Waybill generation, pickup manifests and delivery status sync." },
      { title: "COD Reconciliation", body: "Match courier remittances against orders and flag shortfalls automatically." },
      { title: "Returns & Refunds", body: "Structured RMA with restocking rules and reason-code analytics." },
    ],
    metrics: [
      { value: "-64%", label: "Order processing time" },
      { value: "0", label: "Oversell incidents" },
      { value: "1.9s", label: "Storefront LCP" },
      { value: "+31%", label: "Repeat purchase rate" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe / GCash", "Vercel"],
    modules: ["Catalog", "Checkout", "Orders", "Fulfillment", "Inventory", "Returns", "CRM", "Reports"],
    outcome:
      "Monthly COD reconciliation dropped from a full weekend to under an hour, and the team doubled daily order volume without hiring.",
  },
  {
    slug: "barangay-certificate-system",
    index: "05",
    title: "Barangay Desk",
    subtitle: "Residency Records & Certificate Issuance",
    client: "Barangay Local Government Unit",
    sector: "Government",
    category: "Civil Registry",
    year: "2023",
    timeline: "2 months · Rapid deployment",
    role: "Developer · Trainer",
    status: "Live",
    accent: "#4a3b7a",
    cover:
      "https://images.pexels.com/photos/7103104/pexels-photo-7103104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    gallery: [
      {
        src: "https://images.pexels.com/photos/4976710/pexels-photo-4976710.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Templated certificates with automatic control numbers.",
      },
    ],
    summary:
      "Household-based resident records with instant clearance, indigency and residency certificate printing.",
    overview: [
      "A barangay issues dozens of certificates a day, each hand-typed into a Word file and re-typed for the logbook. The same resident is encoded over and over.",
      "Barangay Desk stores residents once, organized by household, and turns certificate issuance into a two-click action with automatic control numbering and a searchable issuance log.",
    ],
    problem:
      "Certificates were typed from scratch each time, with no reliable log of what was issued, to whom, or for what purpose.",
    approach: [
      "Built a household-first data model matching how barangays actually think about residents.",
      "Templated every certificate type with dynamic fields and official formatting.",
      "Added a blotter and complaints log tied to the same resident records.",
      "Trained staff in a single two-hour session with a printed one-page cheat sheet.",
    ],
    features: [
      { title: "Household Registry", body: "Residents grouped by household with head-of-family relationships." },
      { title: "Certificate Templates", body: "Clearance, indigency, residency and business permit endorsements." },
      { title: "Control Numbering", body: "Automatic sequential numbers with year prefixes and reprint tracking." },
      { title: "Blotter Log", body: "Incident recording linked to resident profiles with case status." },
      { title: "Revenue Log", body: "Daily collection summary per certificate type for the treasurer." },
      { title: "Offline Mode", body: "Runs on a local machine so brownouts never stop the counter." },
    ],
    metrics: [
      { value: "40 sec", label: "Certificate issuance" },
      { value: "8,900", label: "Residents encoded" },
      { value: "100%", label: "Issuance logged" },
      { value: "2 hrs", label: "Staff training time" },
    ],
    stack: ["PHP", "MySQL", "jQuery", "Bootstrap", "TCPDF", "XAMPP Local"],
    modules: ["Residents", "Households", "Certificates", "Blotter", "Revenue", "Users", "Backup"],
    outcome:
      "Residents now wait under a minute at the counter, and the barangay produces monthly issuance and revenue reports automatically.",
  },
  {
    slug: "inventory-intelligence",
    index: "06",
    title: "Stock Signal",
    subtitle: "Inventory Intelligence for Small Retailers",
    client: "Retail group — 3 stores",
    sector: "Retail",
    category: "Analytics",
    year: "2023",
    timeline: "6 weeks · Focused build",
    role: "Developer · Data Modeling",
    status: "Pilot",
    accent: "#1f5f4b",
    cover:
      "https://images.pexels.com/photos/34803988/pexels-photo-34803988.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    gallery: [
      {
        src: "https://images.pexels.com/photos/7857531/pexels-photo-7857531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
        caption: "Reorder suggestions that respect real supplier lead times.",
      },
    ],
    summary:
      "A quiet dashboard that tells small store owners exactly what to reorder, what to discount, and what is silently eating their cash.",
    overview: [
      "Small retailers rarely lack data — they lack a reading of it. Stock Signal ingests daily sales and turns it into three answers: reorder now, mark down now, stop buying this.",
      "No machine learning theater. Just honest velocity math, lead-time aware reorder points, and a dead-stock list nobody can ignore.",
    ],
    problem:
      "Cash was trapped in slow-moving stock while best-sellers went out of stock every other week. Reordering was based on memory.",
    approach: [
      "Computed rolling sales velocity per SKU with seasonality smoothing.",
      "Derived reorder points from actual supplier lead times, not guesses.",
      "Ranked dead stock by capital tied up rather than by unit count.",
      "Delivered a weekly digest so owners act without opening a dashboard.",
    ],
    features: [
      { title: "Reorder Engine", body: "Lead-time aware reorder points with suggested purchase quantities." },
      { title: "Dead Stock Radar", body: "Ranked by capital locked, with suggested markdown ladders." },
      { title: "Velocity Charts", body: "Rolling 7/30/90-day movement per SKU, brand and category." },
      { title: "Multi-Store View", body: "Compare stores and suggest inter-branch transfers before reordering." },
      { title: "Weekly Digest", body: "A short email summary of the five decisions that matter this week." },
      { title: "CSV Ingestion", body: "Works with whatever POS export the store already has." },
    ],
    metrics: [
      { value: "-37%", label: "Dead stock value" },
      { value: "+14%", label: "In-stock rate" },
      { value: "3", label: "Stores connected" },
      { value: "6 wks", label: "Time to first insight" },
    ],
    stack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Recharts"],
    modules: ["Ingestion", "Velocity", "Reorder", "Dead Stock", "Transfers", "Digest"],
    outcome:
      "Within one quarter the group released a significant chunk of trapped capital and stopped running out of its top twenty SKUs.",
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
