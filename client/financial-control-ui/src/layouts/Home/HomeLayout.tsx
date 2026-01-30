import { Box, Toolbar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import Header from "@/components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const TABS = [
  { id: "pessoas", label: "Pessoas", icon: <PeopleIcon /> },
  { id: "categorias", label: "Categorias", icon: <CategoryIcon /> },
  { id: "transacoes", label: "Transações", icon: <ReceiptLongIcon /> },
];

const HomeLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.replace("/", "") || "pessoas";

  return (
    <Box sx={{ display: "flex" }}>
      <Header toggleSidebar={() => setMobileOpen((prev) => !prev)} />

      <SidebarNavigation
        items={TABS}
        activeId={activeTab}
        onChange={(id) => navigate(`/${id}`)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          width: "100%",
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "#f5f5f5"
              : theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1200, mx: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLayout;
