import { GitHubIcon, Logo } from "@/components/icons";

const COLUMNS = [
  {
    title: "제품",
    links: ["마켓플레이스", "동작 방식", "가격", "변경 로그"],
  },
  {
    title: "개발자",
    links: ["문서", "CLI 레퍼런스", "레지스트리 API", "plug 게시하기"],
  },
  {
    title: "회사",
    links: ["소개", "블로그", "채용", "문의"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-layout-lg px-field-md py-grid-gutter-x">
        <div className="grid grid-cols-2 gap-grid-gutter-x md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-inline-md">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Logo className="size-5" />
              </span>
              <span className="text-title-3 tracking-tight">
                Vibeplug
              </span>
            </div>
            <p className="mt-text-md max-w-layout-sm text-body-md text-muted-foreground">
              풀스택 기능을 복사·붙여넣기 하세요. 프론트엔드 · API ·
              데이터베이스가 한 세트로, 코드는 온전히 당신의 것.
            </p>
            <a
              href="#"
              aria-label="GitHub repository"
              className="mt-text-md inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neutral-700 hover:text-neutral-100"
            >
              <GitHubIcon className="size-4.5" />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-label-lg text-neutral-200">
                {col.title}
              </h4>
              <ul className="mt-text-md space-y-inline-lg">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-md text-muted-foreground transition-colors hover:text-neutral-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-grid-gutter-x flex flex-col items-center justify-between gap-field-md border-t border-border pt-field-lg sm:flex-row">
          <p className="font-mono text-caption text-neutral-600">
            © 2026 파토스(pathos). All rights reserved
            <span className="mx-inline-sm">|</span>
            <a
              href="mailto:support@vibeplug.app"
              className="transition-colors hover:text-neutral-400"
            >
              support@vibeplug.app
            </a>
          </p>
          <div className="flex items-center gap-field-md text-caption text-neutral-500">
            <a href="#" className="hover:text-neutral-300">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-neutral-300">
              이용약관
            </a>
            <span className="flex items-center gap-inline-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              모든 시스템 정상
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
