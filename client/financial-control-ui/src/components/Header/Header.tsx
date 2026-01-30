import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { HeaderProps } from "./types";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeMode } from "@/context/ThemeContext";

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "primary.main",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => toggleSidebar()}
          sx={{ mr: 2, display: { md: "none" }, color: "primary.contrastText" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="primary.contrastText"
        >
          Controle Financeiro
        </Typography>
        <IconButton
          onClick={toggleMode}
          sx={{ ml: "auto", color: "primary.contrastText" }}
          aria-label={
            mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
          }
        >
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
