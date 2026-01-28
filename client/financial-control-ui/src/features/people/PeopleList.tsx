import { Box, IconButton } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { PageHeader } from "../../components/PageHeader";
import { usePeopleList } from "./hooks/usePeopleList";
import { Delete } from "@mui/icons-material";
import TableSkeleton from "@/components/TableSkeleton";
import { CreatePersonDialog } from "./CreatePersonDialog";
import DeletePersonDialog from "./DeletePersonDialog";
import { useMemo } from "react";
import type { Person } from "./types";

const getGridColumns = (onDelete: (person: Person) => void): GridColDef[] => [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "age",
    headerName: "Idade",
    
    type: "number",
  },
  {
    field: "totalExpenses",
    headerName: "Despesas",
    
    type: "number",
  },
  {
    field: "totalIncome",
    headerName: "Receitas",
    
    type: "number",
  },
  {
    field: "balance",
    headerName: "Saldo",
    
    type: "number",
  },
  {
    field: "remove",
    headerName: "Excluir",
    width: 65,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton onClick={() => onDelete(params.row as Person)}>
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
    deletePersonDialog,
    setDeletePersonDialog,
    isDeletionPending,
    deletePerson,
    createPerson,
    isCreationPending,
  } = usePeopleList();

  const columns = useMemo(
    () =>
      getGridColumns((person) => setDeletePersonDialog({ open: true, person })),
    [],
  );

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
          columns={columns}
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
        onCreate={createPerson}
        isLoading={isCreationPending}
      />
      <DeletePersonDialog
        open={deletePersonDialog?.open}
        person={deletePersonDialog?.person}
        isLoading={isDeletionPending}
        onClose={() => setDeletePersonDialog({ open: false, person: null })}
        onDelete={deletePerson}
      />
    </Box>
  );
};
