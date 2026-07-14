"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FeatureCard, type Feature } from "@/components/feature-card";
import {
  FeatureFields,
  destructiveButtonClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
  type FeatureFormValue,
} from "@/components/feature-form";

export type FeatureRow = Feature & { id: string };

type Status =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function FeatureList({
  features,
  categories,
}: {
  features: FeatureRow[];
  categories: string[];
}) {
  const router = useRouter();

  // 목록 자체는 서버에서 내려온 props를 그대로 쓰고, 바뀐 뒤에는 router.refresh()로 다시 읽는다.
  // 여기서는 어떤 항목을 고치는 중인지 같은 화면 상태만 들고 있는다.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<FeatureFormValue | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  function startEditing(feature: FeatureRow) {
    setConfirmingId(null);
    setStatus({ state: "idle" });
    setEditingId(feature.id);
    setEditValue({
      name: feature.name,
      description: feature.description,
      category: feature.category,
      price: String(feature.price),
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditValue(null);
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();

    if (!editValue) return;

    setPending(true);

    try {
      const res = await fetch(`/api/features/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValue),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "기능을 수정하지 못했습니다.");
      }

      cancelEditing();
      setStatus({ state: "success", message: "수정되었습니다." });
      router.refresh();
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "기능을 수정하지 못했습니다.",
      });
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(id: string) {
    setPending(true);

    try {
      const res = await fetch(`/api/features/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "기능을 삭제하지 못했습니다.");
      }

      setConfirmingId(null);
      setStatus({ state: "success", message: "삭제되었습니다." });
      router.refresh();
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "기능을 삭제하지 못했습니다.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="flex flex-col gap-field-md">
      <div className="flex flex-col gap-text-xs">
        <h2 className="text-title-2 tracking-tight">등록된 기능</h2>
        <p className="text-body-sm text-muted-foreground">
          모두 {features.length}개예요.
        </p>
      </div>

      {status.state === "success" && (
        <p role="status" className="text-body-sm text-primary">
          {status.message}
        </p>
      )}

      {status.state === "error" && (
        <p role="alert" className="text-body-sm text-destructive">
          {status.message}
        </p>
      )}

      {features.length === 0 ? (
        <p className="border border-border bg-card p-field-lg text-body-md text-muted-foreground">
          아직 등록된 기능이 없어요.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-field-md sm:grid-cols-2">
          {features.map((feature) =>
            editingId === feature.id && editValue ? (
              <li key={feature.id}>
                <form
                  onSubmit={(event) => handleUpdate(event, feature.id)}
                  className="flex h-full flex-col gap-field-md border border-border bg-card p-field-lg"
                >
                  <FeatureFields
                    idPrefix={`edit-${feature.id}`}
                    categories={categories}
                    value={editValue}
                    onChange={setEditValue}
                    disabled={pending}
                  />

                  <div className="mt-auto flex gap-inline-lg pt-field-sm">
                    <button type="submit" disabled={pending} className={primaryButtonClassName}>
                      {pending ? "저장 중…" : "저장하기"}
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={cancelEditing}
                      className={secondaryButtonClassName}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </li>
            ) : (
              <li key={feature.id} className="flex flex-col gap-field-sm">
                <FeatureCard feature={feature} />

                {confirmingId === feature.id ? (
                  // 삭제는 곧바로 하지 않고 한 번 더 확인받는다.
                  <div
                    role="alertdialog"
                    aria-label={`${feature.name} 삭제 확인`}
                    className="flex flex-col gap-field-sm border border-destructive bg-card p-field-md"
                  >
                    <p className="text-body-sm text-foreground">
                      ‘{feature.name}’ 기능을 정말 삭제할까요? 되돌릴 수 없어요.
                    </p>
                    <div className="flex gap-inline-lg">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => handleDelete(feature.id)}
                        className={destructiveButtonClassName}
                      >
                        {pending ? "삭제 중…" : "삭제하기"}
                      </button>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => setConfirmingId(null)}
                        className={secondaryButtonClassName}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-inline-lg">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startEditing(feature)}
                      className={secondaryButtonClassName}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        setStatus({ state: "idle" });
                        setConfirmingId(feature.id);
                      }}
                      className={destructiveButtonClassName}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
