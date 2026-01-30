import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { PageHeaderProps } from "./types";

const PageHeader = ({
  title,
  actionLabel,
  onActionClick,
  actionIcon,
}: PageHeaderProps) => {
  return (
    <Box
      display="flex"
      mb={3}
      sx={{
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "center" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={actionIcon ?? <AddIcon />}
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      </Stack>
    </Box>
  );
};

export default PageHeader;
