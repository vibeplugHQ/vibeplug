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
    <footer className="border-t border-line bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-plug text-ink">
                <Logo className="size-5" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                Vibeplug
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              풀스택 기능을 복사·붙여넣기 하세요. 프론트엔드 · API ·
              데이터베이스가 한 세트로, 코드는 온전히 당신의 것.
            </p>
            <a
              href="#"
              aria-label="GitHub repository"
              className="mt-5 inline-flex size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-zinc-100"
            >
              <GitHubIcon className="size-4.5" />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-zinc-200">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-zinc-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-xs text-faint">
            © 2026 Vibeplug · MIT License
          </p>
          <div className="flex items-center gap-5 text-xs text-faint">
            <a href="#" className="hover:text-zinc-300">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-zinc-300">
              이용약관
            </a>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-plug" />
              모든 시스템 정상
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
