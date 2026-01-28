import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { PageHeader } from "../../components/PageHeader";
import { usePeopleList } from "./hooks/usePeopleList";
import { Delete } from "@mui/icons-material";
import TableSkeleton from "@/components/TableSkeleton";
import { CreatePersonDialog } from "./CreatePersonDialog";

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
  {
    field: "totalExpenses",
    headerName: "Despesas",
    width: 150,
    type: "number",
  },
  {
    field: "totalIncome",
    headerName: "Receitas",
    width: 150,
    type: "number",
  },
  {
    field: "balance",
    headerName: "Saldo",
    width: 120,
    type: "number",
  },
  {
    field: "remove",
    headerName: "Excluir",
    width: 65,
    sortable: false,
    filterable: false,
    renderCell: () => (
      <IconButton>
        <Delete sx={{ "&:hover": { color: "error.main" } }} />
      </IconButton>
    ),
  },
];

export const PeopleList = () => {
  const {
    people,
    isPeopleListLoading,
    createPersonDialogOpen,
    setCreatePersonDialogOpen,
  } = usePeopleList();

  return (
    <Box>
      <PageHeader
        title="Pessoas"
        actionLabel="Cadastrar pessoa"
        onActionClick={() => setCreatePersonDialogOpen(true)}
      />

      {isPeopleListLoading ? (
        <TableSkeleton columns={4} rows={5} />
      ) : (
        <DataGrid
          autoHeight
          rows={people || []}
          getRowId={(row) => row.id}
          columns={gridColumns}
          disableColumnMenu
          disableColumnResize
          hideFooter
          showToolbar
          disableColumnFilter
        />
      )}

      <CreatePersonDialog
        open={createPersonDialogOpen}
        onClose={() => setCreatePersonDialogOpen(false)}
      />
    </Box>
  );
};
