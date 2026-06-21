const STATS = [
  { value: "140+", label: "설치 가능한 plug" },
  { value: "2.4M+", label: "누적 설치 수" },
  { value: "380+", label: "기여자" },
  { value: "9", label: "지원 프레임워크" },
];

export function Stats() {
  return (
    <section className="border-t border-line bg-surface/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-x border-line bg-line lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-ink px-6 py-10 text-center">
            <div className="font-mono text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
