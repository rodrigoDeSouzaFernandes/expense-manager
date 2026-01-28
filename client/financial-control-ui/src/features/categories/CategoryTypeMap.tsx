import { Chip } from "@mui/material";
import { CATEGORY_TYPES } from "./enums";
import type { CategoryType } from "./types";

interface CategoryTypeMapProps {
  type: CategoryType;
}

export const CategoryTypeMap = ({ type }: CategoryTypeMapProps) => {
  return (
    <Chip
      label={CATEGORY_TYPES[type].label}
      color={CATEGORY_TYPES[type].color}
      sx={{
        height: 28,
        width: 80,
      }}
    />
  );
};
