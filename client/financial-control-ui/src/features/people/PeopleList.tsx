import { Box } from "@mui/material";
import { DataGrid, type GridColDef, type GridRowModel } from "@mui/x-data-grid";
import { PageHeader } from "../../components/PageHeader";
import type { PersonRow } from "./types";

const gridRows: GridRowModel<PersonRow>[] = [
  { id: 1, name: "João Silva", age: 30 },
  { id: 2, name: "Maria Souza", age: 25 },
  { id: 3, name: "Carlos Lima", age: 35 },
];

const gridColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "age",
    headerName: "Idade",
    width: 120,
    type: "number",
  },
];

export const PeopleList = () => {
  return (
    <Box>
      <PageHeader title="Pessoas" actionLabel="Cadastrar pessoa" />
      <DataGrid
        autoHeight
        autoPageSize
        rows={gridRows}
        columns={gridColumns}
        disableColumnMenu
        disableColumnResize
        hideFooter
        showToolbar
        disableColumnFilter
      />
    </Box>
  );
};
