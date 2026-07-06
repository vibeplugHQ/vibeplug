const STEPS = [
  {
    n: "01",
    title: "고른다",
    body: "마켓플레이스에서 필요한 기능을 찾습니다. 모든 plug은 소스가 공개되어 있어 설치 전에 무엇이 들어오는지 그대로 확인할 수 있습니다.",
    code: "→  browse vibeplug.dev/marketplace",
  },
  {
    n: "02",
    title: "꽂는다",
    body: "명령어 한 줄이면 끝. 프론트엔드 컴포넌트, API 라우트, DB 스키마와 마이그레이션이 한 번에 당신의 프로젝트에 들어옵니다.",
    code: "$  npx vibeplug add auth",
  },
  {
    n: "03",
    title: "배포한다",
    body: "설치된 코드는 의존성이 아니라 당신의 파일입니다. 마음대로 고치고, 커밋하고, 그대로 배포하세요. 잠금(lock-in)은 없습니다.",
    code: "$  git add . && git commit -m 'add auth'",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-anchor border-t border-border bg-card/30">
      <div className="mx-auto max-w-layout-lg px-field-md py-section-md sm:py-section-lg">
        <div className="max-w-layout-sm">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-primary">
            동작 방식
          </p>
          <h2 className="mt-inline-lg text-balance text-display-md tracking-tight">
            세 단계면 기능 하나가 끝납니다
          </h2>
        </div>

        <div className="mt-grid-gutter-x grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col bg-card p-field-lg">
              <div className="flex items-center gap-inline-lg">
                <span className="font-mono text-body-md text-primary">{step.n}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-text-md text-title-2 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-inline-lg flex-1 text-body-md text-muted-foreground">
                {step.body}
              </p>
              <code className="mt-text-lg block overflow-x-auto rounded-lg border border-border bg-background px-inline-lg py-field-sm font-mono text-caption text-neutral-300">
                {step.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
