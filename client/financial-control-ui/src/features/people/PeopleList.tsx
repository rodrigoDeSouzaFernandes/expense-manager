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
import TotalsDashboard from "@/components/TotalDashboard";

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
    totals,
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
        <>
          <TotalsDashboard {...totals} />
          <Box
            sx={{
              height: { xs: "calc(100vh - 86px)", sm: "calc(100vh - 300px)" },
            }}
          >
            <DataGrid
              rows={people || []}
              columns={columns}
              onRowClick={(params) => navigate(`/pessoas/${params.row.id}`)}
              sx={{
                flex: 0,
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        </>
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
