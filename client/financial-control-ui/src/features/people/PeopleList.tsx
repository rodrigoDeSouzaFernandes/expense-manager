import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { PageHeader } from "../../components/PageHeader";
import { usePeopleList } from "./hooks/usePeopleList";
import TableSkeleton from "@/components/TableSkeleton";
import { CreatePersonDialog } from "./CreatePersonDialog";
import DeletePersonDialog from "./DeletePersonDialog";
import { useMemo } from "react";
import { getPeopleGridColumns } from "./grid/getPeopleGridColumns";
import { useNavigate } from "react-router-dom";

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
      getPeopleGridColumns((person) =>
        setDeletePersonDialog({ open: true, person }),
      ),
    [],
  );

  const navigate = useNavigate();

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
          rows={people || []}
          getRowId={(row) => row.id}
          columns={columns}
          onRowClick={(params) => navigate(`/pessoas/${params.row.id}`)}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
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
