// 기능 등록(POST)과 수정(PUT)이 같은 입력 규칙을 쓰도록 한곳에 모은다.

export const FEATURE_COLUMNS = "id, name, description, category, price";

export type FeatureInput = {
  name: string;
  description: string;
  category: string;
  price: number;
};

export type ParsedFeatureInput =
  | { ok: true; value: FeatureInput }
  | { ok: false; message: string };

export function parseFeatureInput(body: unknown): ParsedFeatureInput {
  const { name, description, category, price } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof category !== "string" ||
    !name.trim() ||
    !description.trim() ||
    !category.trim()
  ) {
    return { ok: false, message: "모든 항목을 입력해주세요." };
  }

  const parsedPrice = Number(price);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    return { ok: false, message: "가격은 0 이상의 숫자여야 합니다." };
  }

  return {
    ok: true,
    value: {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: parsedPrice,
    },
  };
}
