import { CopyCommand } from "@/components/copy-command";
import { ArrowIcon } from "@/components/icons";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-105 glow-plug rotate-180" />
      <div className="pointer-events-none absolute inset-0 bg-dots mask-[radial-gradient(ellipse_50%_60%_at_50%_100%,#000,transparent)]" />

      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
        <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          다음 기능, 처음부터 짜지 마세요.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-muted">
          마켓플레이스에서 꽂고, 코드는 소유하고, 오늘 배포하세요.
        </p>

        <div className="mx-auto mt-9 flex max-w-md flex-col items-center gap-3">
          <CopyCommand command="npx vibeplug init" className="w-full" />
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <a
              href="#marketplace"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-plug px-5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              마켓플레이스 둘러보기
              <ArrowIcon className="size-4" />
            </a>
            <a
              href="#"
              className="flex h-11 flex-1 items-center justify-center rounded-xl border border-line bg-surface/50 px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-line-strong"
            >
              문서 읽기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
