"use client";

import { useState, type FormEvent } from "react";

// 입력창·셀렉트가 공유하는 스타일 (globals.css 디자인 토큰 기반)
const fieldClassName =
  "border border-input bg-background px-field-md py-inline-md text-body-md text-foreground transition-colors placeholder:text-tertiary focus:border-ring focus:outline-none";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function FeatureForm({ categories }: { categories: string[] }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, category, price }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "기능을 등록하지 못했습니다.");
      }

      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setStatus({ state: "success" });
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
      {/* 기능 이름 */}
      <div className="flex flex-col gap-field-sm">
        <label htmlFor="name" className="text-label-md text-foreground">
          기능 이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={fieldClassName}
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
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
          required
          inputMode="numeric"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="예: 9900"
          className={fieldClassName}
        />
      </div>

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="mt-field-sm flex h-11 items-center justify-center bg-primary px-field-md text-label-lg text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
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
