export type Category =
  | "Auth"
  | "Payments"
  | "AI"
  | "Messaging"
  | "Data"
  | "Infra";

export type IconKey =
  | "shield"
  | "card"
  | "sparkles"
  | "bolt"
  | "upload"
  | "bell"
  | "grid"
  | "mail"
  | "cycle"
  | "search"
  | "flag"
  | "users"
  | "chart"
  | "chat"
  | "list";

export type Plug = {
  slug: string;
  name: string;
  category: Category;
  icon: IconKey;
  /** Short marketing line shown on the card. */
  tagline: string;
  /** What ships across the stack. */
  includes: string[];
  installs: number;
  version: string;
  official: boolean;
};

/** Order here drives the filter pills (with "All" prepended). */
export const CATEGORIES: Category[] = [
  "Auth",
  "Payments",
  "AI",
  "Messaging",
  "Data",
  "Infra",
];

export const PLUGS: Plug[] = [
  {
    slug: "auth",
    name: "Auth & Sessions",
    category: "Auth",
    icon: "shield",
    tagline: "Email, OAuth, and magic links wired front to back.",
    includes: ["Sign-in UI", "Session API", "RBAC", "DB schema"],
    installs: 48200,
    version: "2.4.1",
    official: true,
  },
  {
    slug: "payments",
    name: "Stripe Payments",
    category: "Payments",
    icon: "card",
    tagline: "Checkout, subscriptions, and webhooks that just work.",
    includes: ["Pricing UI", "Webhooks", "Billing portal", "Migrations"],
    installs: 39100,
    version: "3.1.0",
    official: true,
  },
  {
    slug: "ai-chat",
    name: "AI Chatbot",
    category: "AI",
    icon: "sparkles",
    tagline: "Streaming chat with tool calls and a vector knowledge base.",
    includes: ["Chat UI", "Stream route", "pgvector store", "Tools"],
    installs: 31700,
    version: "1.9.3",
    official: true,
  },
  {
    slug: "realtime",
    name: "Realtime Presence",
    category: "Infra",
    icon: "bolt",
    tagline: "Live cursors, presence, and broadcast over WebSockets.",
    includes: ["Presence hooks", "WS server", "Cursor UI"],
    installs: 18400,
    version: "1.2.5",
    official: true,
  },
  {
    slug: "uploads",
    name: "File Uploads",
    category: "Data",
    icon: "upload",
    tagline: "Presigned S3/R2 uploads with a polished dropzone.",
    includes: ["Dropzone UI", "Presign route", "Image transforms"],
    installs: 27300,
    version: "2.0.2",
    official: true,
  },
  {
    slug: "notifications",
    name: "Notifications",
    category: "Messaging",
    icon: "bell",
    tagline: "In-app, email, and push with a preference center.",
    includes: ["Inbox UI", "Fan-out API", "Preferences", "Schema"],
    installs: 22900,
    version: "1.6.0",
    official: true,
  },
  {
    slug: "admin",
    name: "Admin Dashboard",
    category: "Data",
    icon: "grid",
    tagline: "Type-safe CRUD tables, charts, and role-gated routes.",
    includes: ["Data tables", "Charts", "Guards", "Server actions"],
    installs: 25600,
    version: "2.2.0",
    official: true,
  },
  {
    slug: "email",
    name: "Transactional Email",
    category: "Messaging",
    icon: "mail",
    tagline: "React Email templates with a send API and delivery logs.",
    includes: ["Templates", "Send API", "Logs UI"],
    installs: 20100,
    version: "1.4.2",
    official: false,
  },
  {
    slug: "jobs",
    name: "Background Jobs",
    category: "Infra",
    icon: "cycle",
    tagline: "Durable queues, cron, and retries with a job dashboard.",
    includes: ["Queue", "Cron", "Retries", "Dashboard"],
    installs: 15800,
    version: "1.1.4",
    official: true,
  },
  {
    slug: "search",
    name: "Full-text Search",
    category: "Data",
    icon: "search",
    tagline: "Postgres-backed indexing with a typeahead search UI.",
    includes: ["Indexer", "Search route", "Command-K UI"],
    installs: 17200,
    version: "1.3.1",
    official: false,
  },
  {
    slug: "flags",
    name: "Feature Flags",
    category: "Infra",
    icon: "flag",
    tagline: "Targeted rollouts and A/B tests with a toggle console.",
    includes: ["Flag SDK", "Targeting", "Console UI"],
    installs: 12400,
    version: "0.9.7",
    official: false,
  },
  {
    slug: "teams",
    name: "Teams & Orgs",
    category: "Auth",
    icon: "users",
    tagline: "Multi-tenant orgs, invites, roles, and seat billing.",
    includes: ["Org switcher", "Invites", "Roles", "Seats"],
    installs: 21500,
    version: "2.1.0",
    official: true,
  },
  {
    slug: "analytics",
    name: "Product Analytics",
    category: "Data",
    icon: "chart",
    tagline: "Event tracking, funnels, and a self-hosted dashboard.",
    includes: ["track() SDK", "Ingest API", "Funnels UI"],
    installs: 14900,
    version: "1.0.6",
    official: false,
  },
  {
    slug: "comments",
    name: "Comments",
    category: "Messaging",
    icon: "chat",
    tagline: "Threaded comments, reactions, and moderation tools.",
    includes: ["Thread UI", "Reactions", "Moderation"],
    installs: 11300,
    version: "1.2.0",
    official: false,
  },
  {
    slug: "waitlist",
    name: "Waitlist & Referrals",
    category: "Infra",
    icon: "list",
    tagline: "Signup capture, referral loops, and an approval queue.",
    includes: ["Signup form", "Referrals", "Approve queue"],
    installs: 16700,
    version: "1.5.3",
    official: true,
  },
];

export function formatInstalls(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return `${n}`;
}
