import { Box, Toolbar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useState } from "react";
import { PeopleList } from "../../features/people/PeopleList";
import { CategoryList } from "../../features/categories/CategoryList";
import { TransactionList } from "../../features/transactions";
import { SidebarNavigation } from "../../components/SidebarNavigation";
import type { SidebarTab, TabConfig } from "./types";
import Header from "@/components/Header";

const TABS: TabConfig[] = [
  { id: "people", label: "Pessoas", icon: <PeopleIcon /> },
  { id: "categories", label: "Categorias", icon: <CategoryIcon /> },
  { id: "transactions", label: "Transações", icon: <ReceiptLongIcon /> },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>("transactions");
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = {
    people: <PeopleList />,
    categories: <CategoryList />,
    transactions: <TransactionList />,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header toggleSidebar={() => setMobileOpen((prev) => !prev)} />
      <SidebarNavigation
        items={TABS}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as SidebarTab)}
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
          {tabs[activeTab]}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
