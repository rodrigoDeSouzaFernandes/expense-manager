import { Chip, type SxProps } from "@mui/material";

const chipStyles: SxProps = {
  height: 28,
  width: 80,

};

const categoryTypes = {
  1: <Chip label="Receita" color="success" sx={chipStyles} />,
  2: <Chip label="Despesa" color="error" sx={chipStyles} />,
  3: <Chip label="Ambos" color="warning" sx={chipStyles} />,
};

interface CategoryTypeMapProps {
  type: keyof typeof categoryTypes;
}

export const CategoryTypeMap = ({ type }: CategoryTypeMapProps) => {
  return categoryTypes[type];
};
