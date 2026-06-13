import "server-only";
import { parse } from "csv-parse/sync";
import type { PriceItem } from "@/types/price";

type CsvRow = Record<string, string | undefined>;

const COLUMN_NAMES = {
  id: "№",
  category: "Название",
  service: "Наименование",
  price: "Цена",
  currency: "Валюта",
} as const;

export function parsePriceCsv(csv: string): PriceItem[] {
  const rows = parse(csv, {
    bom: true,
    columns: (headers: string[]) => headers.map((header) => header.trim()),
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  }) as CsvRow[];

  let currentCategory = "";

  return rows.flatMap((row, index) => {
    const category = row[COLUMN_NAMES.category]?.trim();

    if (category) {
      currentCategory = category;
    }

    const service = row[COLUMN_NAMES.service]?.trim() ?? "";
    const price = row[COLUMN_NAMES.price]?.trim() ?? "";
    const currency = row[COLUMN_NAMES.currency]?.trim() || "сом";

    if (!service || !currentCategory) {
      return [];
    }

    return [{
      id: row[COLUMN_NAMES.id]?.trim() || `${index + 1}`,
      category: currentCategory,
      service,
      price,
      currency,
    }];
  });
}

export async function getPriceItems(): Promise<PriceItem[]> {
  const csvUrl = process.env.GOOGLE_SHEETS_PRICE_CSV_URL?.trim();

  if (!csvUrl) {
    console.warn("GOOGLE_SHEETS_PRICE_CSV_URL is not configured.");
    return [];
  }

  try {
    const response = await fetch(csvUrl, {
      next: { revalidate: 300, tags: ["clinic-price"] },
    });

    if (!response.ok) {
      throw new Error(`Google Sheets returned ${response.status}`);
    }

    return parsePriceCsv(await response.text());
  } catch (error) {
    console.error("Unable to load the clinic price list.", error);
    return [];
  }
}
