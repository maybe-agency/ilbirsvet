"use client";

import { useMemo, useState } from "react";
import { Search, Stethoscope, X } from "lucide-react";
import type { PriceItem } from "@/types/price";

type PriceCatalogProps = {
  items: PriceItem[];
};

function formatPrice(item: PriceItem) {
  if (!item.price.trim()) {
    return "Уточняйте";
  }

  const normalizedPrice = item.price.replace(/\s+/g, "");
  const formattedPrice = /^\d+(?:[.,]\d+)?$/.test(normalizedPrice)
    ? normalizedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    : item.price;
  const currency = /^(kgs|сом)$/i.test(item.currency.trim())
    ? "сом"
    : item.currency.trim();

  return [formattedPrice, currency].filter(Boolean).join(" ");
}

function formatServiceCount(count: number) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} услуг`;
  }

  if (lastDigit === 1) {
    return `${count} услуга`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} услуги`;
  }

  return `${count} услуг`;
}

export function PriceCatalog({ items }: PriceCatalogProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все услуги");

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "Все услуги" || item.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        item.service.toLocaleLowerCase("ru").includes(normalizedQuery) ||
        item.category.toLocaleLowerCase("ru").includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, items, query]);

  const groupedItems = useMemo(
    () =>
      categories.flatMap((category) => {
        const services = filteredItems.filter(
          (item) => item.category === category,
        );

        return services.length ? [{ category, services }] : [];
      }),
    [categories, filteredItems],
  );

  function resetFilters() {
    setQuery("");
    setActiveCategory("Все услуги");
  }

  return (
    <>
      <div className="sticky top-[5.75rem] z-30 border-y border-[#dcebf0] bg-[#f5fbfc]/95 py-4 backdrop-blur-xl">
        <div className="container-shell">
          <label className="relative block">
            <span className="sr-only">Поиск по названию услуги</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#5b7985]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти услугу"
              className="h-14 w-full rounded-md border border-[#cde3e9] bg-white pl-12 pr-12 text-base font-semibold text-[#062c3c] outline-none transition-colors placeholder:font-normal placeholder:text-[#8ba4ae] focus:border-[#52b9d6] focus:ring-4 focus:ring-[#bcecf6]/50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-md text-[#517180] hover:bg-[#edf8fb] hover:text-[#08789f]"
                aria-label="Очистить поиск"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            )}
          </label>

          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1"
            aria-label="Фильтр по категориям"
          >
            {["Все услуги", ...categories].map((category) => {
              const isActive = activeCategory === category;
              const count =
                category === "Все услуги"
                  ? items.length
                  : items.filter((item) => item.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-4 text-sm font-extrabold transition-colors ${
                    isActive
                      ? "border-[#063b50] bg-[#063b50] text-white"
                      : "border-[#cde3e9] bg-white text-[#315d6d] hover:border-[#7cc6dc] hover:text-[#08789f]"
                  }`}
                >
                  {category}
                  <span
                    className={`text-xs ${
                      isActive ? "text-[#65dcf4]" : "text-[#8ba4ae]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-shell py-12 sm:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#5b7985]">
            Найдено услуг:{" "}
            <strong className="text-[#062c3c]">{filteredItems.length}</strong>
          </p>
          {(query || activeCategory !== "Все услуги") && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-extrabold text-[#08789f] hover:bg-[#e5f7fb]"
            >
              <X className="size-4" aria-hidden="true" />
              Сбросить фильтры
            </button>
          )}
        </div>

        {groupedItems.length ? (
          <div className="grid gap-5">
            {groupedItems.map(({ category, services }) => (
              <section
                key={category}
                className="overflow-hidden rounded-lg border border-[#dcebf0] bg-white shadow-[0_18px_55px_rgba(4,57,78,0.055)]"
              >
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dcebf0] bg-[#e8f8fb] px-5 py-5 sm:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-[#08789f] shadow-sm">
                      <Stethoscope className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="text-xl font-extrabold text-[#062c3c] sm:text-2xl">
                      {category}
                    </h2>
                  </div>
                  <span className="text-xs font-extrabold uppercase text-[#517180]">
                    {formatServiceCount(services.length)}
                  </span>
                </header>

                <ul className="divide-y divide-[#e5eff2]">
                  {services.map((item, index) => (
                    <li
                      key={`${item.id}-${item.service}-${index}`}
                      className="grid min-w-0 gap-3 px-5 py-5 sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] sm:items-center sm:px-7"
                    >
                      <span className="hidden text-xs font-bold text-[#9ab0b8] sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 text-sm font-bold leading-6 text-[#315d6d] sm:text-base">
                        {item.service}
                      </span>
                      <strong className="w-fit rounded-md bg-[#063b50] px-3 py-2 text-sm font-extrabold whitespace-nowrap text-white sm:text-base">
                        {formatPrice(item)}
                      </strong>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#b9dce7] bg-white px-6 py-16 text-center">
            <Search
              className="mx-auto size-8 text-[#52b9d6]"
              aria-hidden="true"
            />
            <h2 className="mt-5 text-2xl font-extrabold text-[#062c3c]">
              Услуги не найдены
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5b7985]">
              Попробуйте изменить поисковый запрос или выбрать другую
              категорию.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#063b50] px-5 text-sm font-extrabold text-white"
            >
              Показать все услуги
            </button>
          </div>
        )}
      </div>
    </>
  );
}
