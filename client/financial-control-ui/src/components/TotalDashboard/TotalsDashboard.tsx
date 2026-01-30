import { Box } from "@mui/material";
import { SummaryCard } from "./SummaryCard";
import type { TotalsDashboardProps } from "./types";

const TotalsDashboard = ({
  totalExpenses,
  totalIncome,
  balance,
}: TotalsDashboardProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, 1fr)",
        },
        gap: 2,
        mb: 3,
      }}
    >
      <SummaryCard
        title="Total de despesas"
        value={totalExpenses}
        color="error.main"
      />

      <SummaryCard
        title="Total de receitas"
        value={totalIncome}
        color="success.main"
      />

      <SummaryCard
        title="Saldo total"
        value={balance}
        color={balance >= 0 ? "success.main" : "error.main"}
      />
    </Box>
  );
};

export default TotalsDashboard;
