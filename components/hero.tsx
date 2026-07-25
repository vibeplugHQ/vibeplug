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
  dim: "text-neutral-500",
  add: "text-neutral-400",
  ok: "text-primary",
  plug: "text-neutral-100",
} as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-150 glow-plug" />

      <div className="relative mx-auto max-w-layout-lg px-field-md pb-section-md pt-section-md sm:pt-section-lg">
        <div className="mx-auto max-w-layout-md text-center">
          <a
            href="#marketplace"
            className="inline-flex items-center gap-inline-md rounded-full border border-border bg-card/60 px-inline-lg py-inline-sm text-caption text-muted-foreground transition-colors hover:border-neutral-700"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            shadcn을 풀스택으로 — 프론트 · API · DB까지
            <ArrowIcon className="size-3.5 text-neutral-500" />
          </a>

          <h1 className="mt-text-lg text-balance text-display-lg tracking-tight">
            풀스택 기능을
            <br />
            <span className="text-primary">복사 · 붙여넣기</span>로
          </h1>

          <p className="mx-auto mt-text-lg max-w-layout-sm text-pretty text-body-lg text-muted-foreground">
            Auth · 결제 · AI · 실시간까지, 프론트엔드와 API와 데이터베이스가 한
            세트로. 명령어 한 줄로 설치하고, 코드는 온전히 당신의 것이 됩니다.
          </p>

          <div className="mx-auto mt-grid-gutter-x flex max-w-layout-sm flex-col items-center gap-inline-lg">
            <CopyCommand
              command="npx vibeplug add auth payments"
              className="w-full justify-center sm:justify-start"
            />
            <div className="flex w-full flex-col gap-inline-lg sm:flex-row">
              <a
                href="#marketplace"
                className="flex h-11 flex-1 items-center justify-center gap-inline-md rounded-xl bg-primary p-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
              >
                기능 둘러보기
                <ArrowIcon className="size-4" />
              </a>
              <a
                href="#how"
                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-border bg-card/50 p-field-md text-label-lg text-neutral-200 transition-colors hover:border-neutral-700"
              >
                동작 방식 보기
              </a>
            </div>
          </div>

          <p className="mt-text-lg font-mono text-caption text-neutral-500">
            140+ plugs · MIT 라이선스 · Next · Remix · SvelteKit · Nuxt 지원
          </p>
        </div>

        {/* Terminal preview */}
        <div className="mx-auto mt-grid-gutter-x max-w-layout-md">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
            <div className="flex items-center gap-inline-md border-b border-border bg-muted px-field-md py-inline-lg">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-inline-lg font-mono text-caption text-neutral-500">
                ~/apps/acme — vibeplug
              </span>
            </div>
            <div className="overflow-x-auto whitespace-pre px-field-md py-field-md font-mono text-body-sm">
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
