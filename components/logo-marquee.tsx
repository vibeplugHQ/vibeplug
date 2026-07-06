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
    <section className="border-y border-border bg-card/40 py-grid-gutter-x">
      <p className="mb-text-lg text-center font-mono text-caption uppercase tracking-[0.2em] text-neutral-500">
        어떤 스택에도 그대로 꽂힙니다
      </p>
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee">
          {[...STACKS, ...STACKS].map((name, i) => (
            <span
              key={i}
              className="mr-grid-gutter-x shrink-0 text-title-3 text-neutral-500 transition-colors hover:text-neutral-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
