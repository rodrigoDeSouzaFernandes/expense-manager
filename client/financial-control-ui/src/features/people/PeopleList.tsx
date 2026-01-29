import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { PageHeader } from "../../components/PageHeader";
import { usePeopleList } from "./hooks/usePeopleList";
import TableSkeleton from "@/components/TableSkeleton";
import { CreatePersonDialog } from "./CreatePersonDialog";
import DeletePersonDialog from "./DeletePersonDialog";
import { useMemo } from "react";
import { getPeopleGridColumns } from "./grid/getPeopleGridColumns";

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
