export type Feature = {
  name: string;
  description: string;
  category: string;
  price: number;
};

const priceFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-field-md transition-colors hover:border-neutral-700">
      <span className="inline-flex w-fit items-center rounded-full border border-border px-field-sm py-text-xs text-caption text-muted-foreground">
        {feature.category}
      </span>

      <h3 className="mt-text-md text-title-3 tracking-tight text-foreground">
        {feature.name}
      </h3>
      <p className="mt-inline-sm text-body-md text-muted-foreground">
        {feature.description}
      </p>

      <p className="mt-auto border-t border-border pt-field-md font-mono text-title-3 text-foreground">
        {priceFormatter.format(feature.price)}
      </p>
    </article>
  );
}
