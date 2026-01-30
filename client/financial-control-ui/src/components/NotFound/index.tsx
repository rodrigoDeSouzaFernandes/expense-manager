import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h6" sx={{ mt: 1, mb: 3 }}>
        Ops! A página que você tentou acessar não existe.
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Voltar para o início
      </Button>
    </Box>
  );
};
