import type { ChipPropsColorOverrides, Color } from "@mui/material";
import type { CategoryType } from "./types";

export const categoryType = {
  INCOME: 1,
  EXPENSE: 2,
  BOTH: 3,
} as const;

export const CATEGORY_TYPES: Record<
  CategoryType,
  { label: string; color: ("success" | "error" | "warning") }
> = {
  [categoryType.INCOME]: { label: "Receita", color: "success" },
  [categoryType.EXPENSE]: { label: "Despesa", color: "error" },
  [categoryType.BOTH]: { label: "Ambos", color: "warning" },
};
