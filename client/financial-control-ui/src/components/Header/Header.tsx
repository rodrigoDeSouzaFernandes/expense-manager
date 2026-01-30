import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import type { HeaderProps } from "./types";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeMode } from "@/context/ThemeContext";

const Header = ({ toggleSidebar, mobileOpen }: HeaderProps) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "background.paper" : "primary.main",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => toggleSidebar()}
          sx={{ mr: 2, display: { md: "none" } }}
          aria-label={
            mobileOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
          }
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Controle Financeiro
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleMode}
          sx={{ ml: "auto" }}
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
