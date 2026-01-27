import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useState } from "react";
import { PeopleList } from "../../features/people/PeopleList";
import { CategoryList } from "../../features/categories/CategoryList";
import { TransactionList } from "../../features/transactions";
import { SidebarNavigation } from "../../components/SidebarNavigation";
import type { SidebarTab, TabConfig } from "./types";

const TABS: TabConfig[] = [
  { id: "people", label: "Pessoas", icon: <PeopleIcon /> },
  { id: "categories", label: "Categorias", icon: <CategoryIcon /> },
  { id: "transactions", label: "Transações", icon: <ReceiptLongIcon /> },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>("transactions");

  const renderContent = () => {
    if (activeTab === "people") return <PeopleList />;
    if (activeTab === "categories") return <CategoryList />;
    return <TransactionList />;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Controle Financeiro
          </Typography>
        </Toolbar>
      </AppBar>

      <SidebarNavigation
        items={TABS}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as SidebarTab)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "#f5f5f5"
              : theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default Home;
