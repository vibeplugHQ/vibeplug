import { ArrowIcon, CheckIcon } from "@/components/icons";

const STACK = [
  { label: "UI", path: "components/auth/*", note: "프론트엔드 컴포넌트" },
  { label: "API", path: "app/api/auth/*", note: "서버 라우트 · 액션" },
  { label: "DB", path: "db/schema · migrations", note: "스키마 + 마이그레이션" },
];

const SMALL = [
  {
    title: "코드는 당신의 것",
    body: "의존성이 아니라 복사된 소스입니다. shadcn처럼, 설치한 모든 줄을 직접 소유하고 수정합니다.",
  },
  {
    title: "끝까지 타입 안전",
    body: "DB 스키마부터 API, 클라이언트까지 하나의 타입으로 이어집니다. any 없이 자동완성으로 흐릅니다.",
  },
  {
    title: "프레임워크 무관",
    body: "Next · Remix · SvelteKit · Nuxt 어댑터를 제공합니다. 당신이 쓰는 라우터와 ORM에 맞춰 설치됩니다.",
  },
  {
    title: "토큰으로 테마링",
    body: "모든 plug은 Tailwind 디자인 토큰을 사용합니다. 색·반경·폰트를 바꾸면 전부 따라옵니다.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-anchor border-t border-border">
      <div className="mx-auto max-w-layout-lg px-field-md py-section-md sm:py-section-lg">
        <div className="max-w-layout-sm">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-primary">
            왜 바이브플러그인가
          </p>
          <h2 className="mt-inline-lg text-balance text-display-md tracking-tight">
            컴포넌트가 아니라 기능을 가져옵니다
          </h2>
          <p className="mt-inline-lg text-pretty text-muted-foreground">
            UI 한 조각이 아니라, 동작하는 기능 전체를 가져옵니다. 화면부터
            데이터베이스까지 이미 연결된 채로.
          </p>
        </div>

        <div className="mt-grid-gutter-x grid grid-cols-1 gap-field-md lg:grid-cols-3">
          {/* Big tile — full stack */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-field-lg lg:col-span-2">
            <div>
              <h3 className="text-title-2 tracking-tight">
                하나의 plug, 풀스택 한 세트
              </h3>
              <p className="mt-text-sm max-w-layout-sm text-body-md text-muted-foreground">
                <code className="font-mono text-primary">vibeplug add</code> 한 번이면
                세 계층이 동시에 설치되고, 서로 이미 연결되어 있습니다.
              </p>
            </div>
            <div className="mt-text-lg space-y-inline-md">
              {STACK.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-field-md rounded-xl border border-border bg-muted px-field-md py-inline-lg"
                >
                  <span className="flex w-12 shrink-0 justify-center rounded-md bg-primary/10 py-text-xs font-mono text-caption text-primary">
                    {row.label}
                  </span>
                  <code className="font-mono text-body-md text-neutral-300">
                    {row.path}
                  </code>
                  <span className="ml-auto hidden text-caption text-neutral-500 sm:block">
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Own the code (first small, made taller via content) */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-field-lg">
            <h3 className="text-title-3 tracking-tight">
              {SMALL[0].title}
            </h3>
            <p className="mt-text-sm flex-1 text-body-md text-muted-foreground">
              {SMALL[0].body}
            </p>
            <ul className="mt-text-md space-y-inline-md">
              {["벤더 잠금 없음", "PR 리뷰 그대로", "버전 핀 없음"].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-inline-md text-body-md text-neutral-300"
                >
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining small tiles */}
          {SMALL.slice(1).map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-field-lg"
            >
              <h3 className="text-title-3 tracking-tight">{f.title}</h3>
              <p className="mt-text-sm text-body-md text-muted-foreground">{f.body}</p>
            </div>
          ))}

          {/* Wide publish banner */}
          <div className="flex flex-col items-start justify-between gap-field-lg rounded-2xl border border-border bg-gradient-to-br from-card to-muted p-field-lg sm:flex-row sm:items-center lg:col-span-3">
            <div>
              <h3 className="text-title-2 tracking-tight">
                직접 만든 plug을 올리세요
              </h3>
              <p className="mt-text-sm max-w-layout-sm text-body-md text-muted-foreground">
                오픈 레지스트리입니다. 사내 기능이든 공개 패키지든, 한 줄로
                게시하고 팀 전체가 같은 방식으로 설치하게 만드세요.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-inline-lg">
              <code className="rounded-lg border border-border bg-background px-field-md py-field-sm font-mono text-body-md text-neutral-300">
                $ vibeplug publish ./my-plug
              </code>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-inline-md text-label-lg text-primary hover:underline"
              >
                레지스트리 문서 보기
                <ArrowIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
