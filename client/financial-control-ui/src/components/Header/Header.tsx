import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import type { HeaderProps } from "./types";


const Header = ({
    toggleSidebar,
}: HeaderProps) => {
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
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Controle Financeiro
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;