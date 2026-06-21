import { CopyCommand } from "@/components/copy-command";
import { ArrowIcon } from "@/components/icons";

const INSTALL_LINES: { text: string; tone?: "dim" | "add" | "ok" | "plug" }[] = [
  { text: "$ npx vibeplug add auth", tone: "plug" },
  { text: "◇  Resolving  auth@2.4.1 from registry", tone: "dim" },
  { text: "◇  Writing 11 files across the stack", tone: "dim" },
  { text: "   + app/(auth)/sign-in/page.tsx", tone: "add" },
  { text: "   + components/auth/user-button.tsx", tone: "add" },
  { text: "   + lib/auth/session.ts", tone: "add" },
  { text: "   + app/api/auth/[...all]/route.ts", tone: "add" },
  { text: "   + db/schema/auth.ts", tone: "add" },
  { text: "   + db/migrations/0007_auth.sql", tone: "add" },
  { text: "◇  Patched middleware.ts · .env.example", tone: "dim" },
  { text: "✓  auth installed → frontend · api · database", tone: "ok" },
];

const toneClass = {
  dim: "text-faint",
  add: "text-zinc-400",
  ok: "text-plug",
  plug: "text-zinc-100",
} as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-plug" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#marketplace"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong"
          >
            <span className="size-1.5 rounded-full bg-plug" />
            shadcn을 풀스택으로 — 프론트 · API · DB까지
            <ArrowIcon className="size-3.5 text-faint" />
          </a>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            풀스택 기능을
            <br />
            <span className="text-plug">복사 · 붙여넣기</span>로.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-muted">
            Auth · 결제 · AI · 실시간까지, 프론트엔드와 API와 데이터베이스가 한
            세트로. 명령어 한 줄로 설치하고, 코드는 온전히 당신의 것이 됩니다.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col items-center gap-3">
            <CopyCommand
              command="npx vibeplug add auth payments"
              className="w-full justify-center sm:justify-start"
            />
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <a
                href="#marketplace"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-plug px-5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                마켓플레이스 둘러보기
                <ArrowIcon className="size-4" />
              </a>
              <a
                href="#how"
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-line bg-surface/50 px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-line-strong"
              >
                동작 방식 보기
              </a>
            </div>
          </div>

          <p className="mt-6 font-mono text-xs text-faint">
            140+ plugs · MIT 라이선스 · Next · Remix · SvelteKit · Nuxt 지원
          </p>
        </div>

        {/* Terminal preview */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-faint">
                ~/apps/acme — vibeplug
              </span>
            </div>
            <div className="overflow-x-auto whitespace-pre px-5 py-4 font-mono text-[13px] leading-7">
              {INSTALL_LINES.map((line, i) => (
                <div key={i} className={toneClass[line.tone ?? "dim"]}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
