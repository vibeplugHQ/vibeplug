import { CheckIcon } from "@/components/icons";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "영원히",
    desc: "혼자 시작하는 개발자를 위한 플랜.",
    features: [
      "커뮤니티 plug 전체",
      "공개 레지스트리 게시",
      "MIT 라이선스",
      "CLI 무제한 사용",
    ],
    cta: "무료로 시작",
    featured: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "월 / 사용자",
    desc: "프로덕션을 운영하는 팀을 위한 플랜.",
    features: [
      "Free의 모든 기능",
      "Official plug 전체 + 우선 업데이트",
      "비공개 plug 게시",
      "프리미엄 테마 토큰",
    ],
    cta: "Pro 시작하기",
    featured: true,
  },
  {
    name: "Team",
    price: "$90",
    period: "월 / 조직",
    desc: "여러 팀이 함께 쓰는 사내 레지스트리.",
    features: [
      "Pro의 모든 기능",
      "비공개 팀 레지스트리",
      "SSO · 권한 관리",
      "전담 지원 채널",
    ],
    cta: "영업팀 문의",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-anchor border-t border-border">
      <div className="mx-auto max-w-layout-lg px-field-md py-section-md sm:py-section-lg">
        <div className="mx-auto max-w-layout-sm text-center">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-primary">
            가격
          </p>
          <h2 className="mt-inline-lg text-balance text-display-md tracking-tight">
            설치는 언제나 무료입니다
          </h2>
          <p className="mt-inline-lg text-pretty text-muted-foreground">
            오픈소스 plug은 그대로 무료. 비공개 레지스트리와 팀 협업이 필요할
            때만 업그레이드하세요.
          </p>
        </div>

        <div className="mt-grid-gutter-x grid grid-cols-1 gap-field-md lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-field-lg ${
                plan.featured
                  ? "border-primary/50 bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-7 rounded-full bg-primary px-field-sm py-text-xs text-caption text-primary-foreground">
                  인기
                </span>
              )}
              <h3 className="text-title-3 tracking-tight">
                {plan.name}
              </h3>
              <div className="mt-text-md flex items-baseline gap-inline-sm">
                <span className="text-display-md tracking-tight">
                  {plan.price}
                </span>
                <span className="text-body-md text-neutral-500">{plan.period}</span>
              </div>
              <p className="mt-inline-lg text-body-md text-muted-foreground">{plan.desc}</p>

              <ul className="mt-text-lg flex-1 space-y-inline-lg">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-inline-md text-body-md">
                    <CheckIcon className="mt-text-xs size-4 shrink-0 text-primary" />
                    <span className="text-neutral-300">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#marketplace"
                className={`mt-text-lg flex h-11 items-center justify-center rounded-xl px-field-md text-label-lg transition-colors ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-muted text-neutral-100 hover:border-neutral-700"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
