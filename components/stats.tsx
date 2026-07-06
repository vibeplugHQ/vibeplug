const STATS = [
  { value: "140+", label: "설치 가능한 plug" },
  { value: "2.4M+", label: "누적 설치 수" },
  { value: "380+", label: "기여자" },
  { value: "9", label: "지원 프레임워크" },
];

export function Stats() {
  return (
    <section className="border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-layout-lg grid-cols-2 gap-px overflow-hidden border-x border-border bg-border lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-background px-field-lg py-grid-gutter-x text-center">
            <div className="font-mono text-display-md tracking-tight text-neutral-100">
              {s.value}
            </div>
            <div className="mt-text-sm text-body-md text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
