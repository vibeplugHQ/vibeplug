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
    <section id="how" className="scroll-mt-20 border-t border-line bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-plug">
            동작 방식
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            세 단계면 기능 하나가 끝납니다
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col bg-surface p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-plug">{step.n}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                {step.body}
              </p>
              <code className="mt-6 block overflow-x-auto rounded-lg border border-line bg-ink px-3 py-2.5 font-mono text-xs text-zinc-300">
                {step.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
