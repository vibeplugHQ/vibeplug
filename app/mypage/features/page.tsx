import type { Metadata } from "next";
import featuresData from "@/data/features.json";
import type { Feature } from "@/components/feature-card";

export const metadata: Metadata = {
  title: "기능 관리 — Vibeplug",
  description: "내가 등록한 기능을 확인하고 관리하는 화면.",
};

const features = featuresData as Feature[];

// 카테고리는 직접 타이핑하지 않고 데이터에 존재하는 값 중에서만 고른다.
const categories = Array.from(new Set(features.map((feature) => feature.category)));

// 입력창·셀렉트가 공유하는 스타일 (globals.css 디자인 토큰 기반)
const fieldClassName =
  "border border-input bg-background px-field-md py-inline-md text-body-md text-foreground transition-colors placeholder:text-tertiary focus:border-ring focus:outline-none";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-text-lg">
      <header>
        <h1 className="text-title-1 tracking-tight">기능 관리</h1>
        <p className="mt-text-sm text-body-md text-muted-foreground">
          새 기능을 등록하고 관리할 수 있어요.
        </p>
      </header>

      <form className="flex max-w-layout-sm flex-col gap-field-md border border-border bg-card p-field-lg">
        {/* 기능 이름 */}
        <div className="flex flex-col gap-field-sm">
          <label htmlFor="name" className="text-label-md text-foreground">
            기능 이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="예: 이메일 로그인"
            className={fieldClassName}
          />
        </div>

        {/* 한 줄 설명 */}
        <div className="flex flex-col gap-field-sm">
          <label htmlFor="description" className="text-label-md text-foreground">
            한 줄 설명
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="예: 이메일과 비밀번호로 로그인하는 기본 인증 기능"
            className={fieldClassName}
          />
        </div>

        {/* 카테고리 — 데이터에 있는 값 중에서 선택 */}
        <div className="flex flex-col gap-field-sm">
          <label htmlFor="category" className="text-label-md text-foreground">
            카테고리
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className={fieldClassName}
          >
            <option value="" disabled>
              카테고리를 선택하세요
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* 가격 — 숫자만 입력 */}
        <div className="flex flex-col gap-field-sm">
          <label htmlFor="price" className="text-label-md text-foreground">
            가격 (원)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={100}
            inputMode="numeric"
            placeholder="예: 9900"
            className={fieldClassName}
          />
        </div>

        <button
          type="submit"
          className="mt-field-sm flex h-11 items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
