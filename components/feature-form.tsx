"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CategoryCombobox } from "@/components/category-combobox";

// 입력창·셀렉트가 공유하는 스타일 (globals.css 디자인 토큰 기반)
const fieldClassName =
  "border border-input bg-background px-field-md py-inline-md text-body-md text-foreground transition-colors placeholder:text-tertiary focus:border-ring focus:outline-none";

// 등록 폼과 수정 폼이 같은 버튼 모양을 쓰도록 한곳에서 정의한다.
export const primaryButtonClassName =
  "flex h-11 items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60";

export const secondaryButtonClassName =
  "flex h-11 items-center justify-center border border-border px-field-md text-label-lg text-foreground transition-colors hover:border-neutral-700 disabled:opacity-60";

export const destructiveButtonClassName =
  "flex h-11 items-center justify-center border border-destructive px-field-md text-label-lg text-destructive transition-opacity hover:opacity-90 disabled:opacity-60";

export type FeatureFormValue = {
  name: string;
  description: string;
  category: string;
  price: string;
};

export const emptyFeatureFormValue: FeatureFormValue = {
  name: "",
  description: "",
  category: "",
  price: "",
};

type FeatureFieldsProps = {
  // 한 화면에 등록 폼과 수정 폼이 함께 있으므로 label의 연결 대상이 겹치지 않게 접두사를 받는다.
  idPrefix: string;
  categories: string[];
  value: FeatureFormValue;
  onChange: (value: FeatureFormValue) => void;
  disabled?: boolean;
};

/** 기능의 입력 항목. 등록 폼과 수정 폼이 함께 사용한다. */
export function FeatureFields({
  idPrefix,
  categories,
  value,
  onChange,
  disabled,
}: FeatureFieldsProps) {
  const fieldId = (name: keyof FeatureFormValue) => `${idPrefix}-${name}`;

  return (
    <>
      {/* 기능 이름 */}
      <div className="flex flex-col gap-field-sm">
        <label htmlFor={fieldId("name")} className="text-label-md text-foreground">
          기능 이름
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          disabled={disabled}
          value={value.name}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
          placeholder="예: 이메일 로그인"
          className={fieldClassName}
        />
      </div>

      {/* 한 줄 설명 */}
      <div className="flex flex-col gap-field-sm">
        <label htmlFor={fieldId("description")} className="text-label-md text-foreground">
          한 줄 설명
        </label>
        <input
          id={fieldId("description")}
          name="description"
          type="text"
          required
          disabled={disabled}
          value={value.description}
          onChange={(event) => onChange({ ...value, description: event.target.value })}
          placeholder="예: 이메일과 비밀번호로 로그인하는 기본 인증 기능"
          className={fieldClassName}
        />
      </div>

      {/* 카테고리 — 이미 쓰이는 값을 목록에서 고르거나, 새 값을 직접 타이핑한다 */}
      <div className="flex flex-col gap-field-sm">
        <label htmlFor={fieldId("category")} className="text-label-md text-foreground">
          카테고리
        </label>
        <CategoryCombobox
          id={fieldId("category")}
          name="category"
          options={categories}
          required
          disabled={disabled}
          value={value.category}
          onChange={(category) => onChange({ ...value, category })}
          placeholder="예: 인증"
          className={fieldClassName}
        />
      </div>

      {/* 가격 — 숫자만 입력 */}
      <div className="flex flex-col gap-field-sm">
        <label htmlFor={fieldId("price")} className="text-label-md text-foreground">
          가격 (원)
        </label>
        <input
          id={fieldId("price")}
          name="price"
          type="number"
          min={0}
          step={100}
          required
          inputMode="numeric"
          disabled={disabled}
          value={value.price}
          onChange={(event) => onChange({ ...value, price: event.target.value })}
          placeholder="예: 9900"
          className={fieldClassName}
        />
      </div>
    </>
  );
}

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function FeatureForm({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [value, setValue] = useState<FeatureFormValue>(emptyFeatureFormValue);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "기능을 등록하지 못했습니다.");
      }

      setValue(emptyFeatureFormValue);
      setStatus({ state: "success" });
      // 아래 목록이 방금 등록한 기능을 바로 보여주도록 서버 데이터를 다시 읽는다.
      router.refresh();
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "기능을 등록하지 못했습니다.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-layout-sm flex-col gap-field-md border border-border bg-card p-field-lg"
    >
      <FeatureFields
        idPrefix="new"
        categories={categories}
        value={value}
        onChange={setValue}
        disabled={status.state === "submitting"}
      />

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className={`mt-field-sm ${primaryButtonClassName}`}
      >
        {status.state === "submitting" ? "등록 중…" : "등록하기"}
      </button>

      {status.state === "success" && (
        <p role="status" className="text-body-sm text-primary">
          등록되었습니다.
        </p>
      )}

      {status.state === "error" && (
        <p role="alert" className="text-body-sm text-destructive">
          등록에 실패했습니다. {status.message}
        </p>
      )}
    </form>
  );
}
