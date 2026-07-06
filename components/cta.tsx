import { CopyCommand } from "@/components/copy-command";
import { ArrowIcon } from "@/components/icons";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-105 glow-plug rotate-180" />
      <div className="pointer-events-none absolute inset-0 bg-dots mask-[radial-gradient(ellipse_50%_60%_at_50%_100%,#000,transparent)]" />

      <div className="relative mx-auto max-w-layout-md px-field-md py-section-md text-center sm:py-section-lg">
        <h2 className="text-balance text-display-md tracking-tight">
          다음 기능, 처음부터 짜지 마세요.
        </h2>
        <p className="mx-auto mt-text-md max-w-layout-sm text-pretty text-body-lg text-muted-foreground">
          마켓플레이스에서 꽂고, 코드는 소유하고, 오늘 배포하세요.
        </p>

        <div className="mx-auto mt-grid-gutter-x flex max-w-layout-sm flex-col items-center gap-inline-lg">
          <CopyCommand command="npx vibeplug init" className="w-full" />
          <div className="flex w-full flex-col gap-inline-lg sm:flex-row">
            <a
              href="#marketplace"
              className="flex h-11 flex-1 items-center justify-center gap-inline-md rounded-xl bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
            >
              마켓플레이스 둘러보기
              <ArrowIcon className="size-4" />
            </a>
            <a
              href="#"
              className="flex h-11 flex-1 items-center justify-center rounded-xl border border-border bg-card/50 px-field-md text-label-lg text-neutral-200 transition-colors hover:border-neutral-700"
            >
              문서 읽기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
