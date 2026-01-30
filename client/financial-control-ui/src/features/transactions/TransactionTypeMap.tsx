import { Chip, Typography } from "@mui/material";
import type { TransactionTypeLabel } from "./types";

interface TransactionTypeMapProps {
  type: TransactionTypeLabel;
}

export const TransactionTypeMap = ({ type }: TransactionTypeMapProps) => {
  if (!type) {
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
      label={type}
      color={type === "Despesa" ? "error" : "success"}
      sx={{
        height: 28,
        width: 80,
      }}
    />
  );
};
