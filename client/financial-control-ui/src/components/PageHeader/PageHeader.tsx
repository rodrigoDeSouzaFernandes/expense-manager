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
      justifyContent="space-between"
      alignItems="center"
      mb={3}
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

