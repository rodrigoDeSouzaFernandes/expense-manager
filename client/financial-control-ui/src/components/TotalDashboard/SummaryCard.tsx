import { formatCurrency } from "@/utils/currency";
import { Card, CardContent, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: number;
  color: string;
}

export const SummaryCard = ({ title, value, color }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h6" sx={{ color, fontWeight: 600 }}>
          {formatCurrency(value)}
        </Typography>
      </CardContent>
    </Card>
  );
};
