const STACKS = [
  "Next.js",
  "React",
  "Remix",
  "SvelteKit",
  "Nuxt",
  "Astro",
  "Postgres",
  "Drizzle",
  "Prisma",
  "Stripe",
  "Tailwind",
  "TypeScript",
];

export function LogoMarquee() {
  return (
    <section className="border-y border-line bg-surface/40 py-10">
      <p className="mb-7 text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
        어떤 스택에도 그대로 꽂힙니다
      </p>
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...STACKS, ...STACKS].map((name, i) => (
            <span
              key={i}
              className="mr-12 shrink-0 text-lg font-medium text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
