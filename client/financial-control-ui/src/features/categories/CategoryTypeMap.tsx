import { Chip, Typography } from "@mui/material";
import { CATEGORY_TYPES } from "./enums";
import type { CategoryType } from "./types";

interface CategoryTypeMapProps {
  type: CategoryType;
}

export const CategoryTypeMap = ({ type }: CategoryTypeMapProps) => {
  if (!CATEGORY_TYPES[type]) {
    return (
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: "100%",
        }}
      >
        -
      </Typography>
    );
  }

  return (
    <Chip
      variant="outlined"
      label={CATEGORY_TYPES[type]?.label}
      color={CATEGORY_TYPES[type]?.color}
      sx={{
        height: 28,
        width: 80,
      }}
    />
  );
};
