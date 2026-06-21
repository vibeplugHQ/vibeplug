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
    <section id="features" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-plug">
            왜 바이브플러그인가
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            컴포넌트가 아니라 기능을 가져옵니다
          </h2>
          <p className="mt-3 text-pretty text-muted">
            UI 한 조각이 아니라, 동작하는 기능 전체를 가져옵니다. 화면부터
            데이터베이스까지 이미 연결된 채로.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Big tile — full stack */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 lg:col-span-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                하나의 plug, 풀스택 한 세트
              </h3>
              <p className="mt-2 max-w-md text-sm leading-7 text-muted">
                <code className="font-mono text-plug">vibeplug add</code> 한 번이면
                세 계층이 동시에 설치되고, 서로 이미 연결되어 있습니다.
              </p>
            </div>
            <div className="mt-7 space-y-2.5">
              {STACK.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface-2 px-4 py-3"
                >
                  <span className="flex w-12 shrink-0 justify-center rounded-md bg-plug/10 py-1 font-mono text-xs font-semibold text-plug">
                    {row.label}
                  </span>
                  <code className="font-mono text-sm text-zinc-300">
                    {row.path}
                  </code>
                  <span className="ml-auto hidden text-xs text-faint sm:block">
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Own the code (first small, made taller via content) */}
          <div className="flex flex-col rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-lg font-semibold tracking-tight">
              {SMALL[0].title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-muted">
              {SMALL[0].body}
            </p>
            <ul className="mt-5 space-y-2">
              {["벤더 잠금 없음", "PR 리뷰 그대로", "버전 핀 없음"].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-sm text-zinc-300"
                >
                  <CheckIcon className="size-4 shrink-0 text-plug" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining small tiles */}
          {SMALL.slice(1).map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{f.body}</p>
            </div>
          ))}

          {/* Wide publish banner */}
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-7 sm:flex-row sm:items-center lg:col-span-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                직접 만든 plug을 올리세요
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                오픈 레지스트리입니다. 사내 기능이든 공개 패키지든, 한 줄로
                게시하고 팀 전체가 같은 방식으로 설치하게 만드세요.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-3">
              <code className="rounded-lg border border-line bg-ink px-4 py-2.5 font-mono text-sm text-zinc-300">
                $ vibeplug publish ./my-plug
              </code>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-plug hover:underline"
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
