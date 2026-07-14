"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type CategoryComboboxProps = {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  // 이미 등록된 기능들에서 모은 카테고리. 비어 있을 수 있다.
  options: string[];
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * 카테고리 입력창.
 *
 * 기존 카테고리를 목록에서 고를 수도 있고, 목록에 없는 값을 직접 타이핑해 새로 만들 수도 있다.
 * <datalist>는 브라우저마다 열리는 조건이 다르고 타이핑 없이 전체 목록을 펼칠 수단이 없어서 직접 만든다.
 */
export function CategoryCombobox({
  id,
  name,
  value,
  onChange,
  options,
  className,
  placeholder,
  required,
  disabled,
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  // 목록을 펼쳐서 연 경우엔 입력값으로 거르지 않고 전체를 보여준다.
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const query = value.trim().toLowerCase();
  const visibleOptions =
    showAll || !query
      ? options
      : options.filter((option) => option.toLowerCase().includes(query));

  // 바깥을 클릭하면 목록을 닫는다.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  function openList(all: boolean) {
    if (disabled) return;
    setShowAll(all);
    setActiveIndex(-1);
    setOpen(true);
  }

  function select(option: string) {
    onChange(option);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        openList(true);
        return;
      }

      if (visibleOptions.length === 0) return;

      setActiveIndex((index) => {
        if (event.key === "ArrowDown") {
          return (index + 1) % visibleOptions.length;
        }
        return index <= 0 ? visibleOptions.length - 1 : index - 1;
      });
      return;
    }

    if (event.key === "Enter" && open && activeIndex >= 0) {
      // 목록에서 고르는 중이면 폼을 제출하지 않고 선택만 한다.
      event.preventDefault();
      select(visibleOptions[activeIndex]);
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        // Tab 등으로 콤보박스 바깥으로 나가면 닫는다.
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <input
        id={id}
        name={name}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setShowAll(false);
          setActiveIndex(-1);
          setOpen(true);
        }}
        onClick={() => openList(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full pr-11 ${className ?? ""}`}
      />

      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label={open ? "카테고리 목록 닫기" : "카테고리 목록 열기"}
        onClick={() => (open ? setOpen(false) : openList(true))}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
      >
        <span aria-hidden="true" className="text-body-sm">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-inline-sm max-h-60 overflow-y-auto border border-border bg-card"
        >
          {visibleOptions.length === 0 ? (
            <li className="px-field-md py-inline-md text-body-sm text-muted-foreground">
              {options.length === 0
                ? "아직 등록된 카테고리가 없어요. 직접 입력하면 새로 만들어져요."
                : "일치하는 카테고리가 없어요. 그대로 두면 새 카테고리로 등록돼요."}
            </li>
          ) : (
            visibleOptions.map((option, index) => (
              <li key={option}>
                <button
                  type="button"
                  id={optionId(index)}
                  role="option"
                  aria-selected={option === value}
                  // 클릭 전에 input이 blur되어 목록이 닫히는 것을 막는다.
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(option)}
                  className={`flex w-full items-center px-field-md py-inline-md text-left text-body-md transition-colors ${
                    index === activeIndex
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
