// 기능 등록(POST)과 수정(PUT)이 같은 입력 규칙을 쓰도록 한곳에 모은다.

export const FEATURE_COLUMNS = "id, name, description, category, price";

// 컨트리뷰터가 등록·수정할 수 있는 유일한 카테고리.
// DB의 컨트리뷰터 RLS 정책과 화면의 고정 선택지가 같은 값을 쓰도록 한곳에서 정의한다.
export const UI_COMPONENT_CATEGORY = "UI 컴포넌트";

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
