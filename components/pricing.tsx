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
    <section id="pricing" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-plug">
            가격
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            설치는 언제나 무료입니다
          </h2>
          <p className="mt-3 text-pretty text-muted">
            오픈소스 plug은 그대로 무료. 비공개 레지스트리와 팀 협업이 필요할
            때만 업그레이드하세요.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.featured
                  ? "border-plug/50 bg-surface"
                  : "border-line bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-6 top-7 rounded-full bg-plug px-2.5 py-1 text-[11px] font-semibold text-ink">
                  인기
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-faint">{plan.period}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{plan.desc}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-plug" />
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#marketplace"
                className={`mt-7 flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-plug text-ink hover:opacity-90"
                    : "border border-line bg-surface-2 text-zinc-100 hover:border-line-strong"
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
