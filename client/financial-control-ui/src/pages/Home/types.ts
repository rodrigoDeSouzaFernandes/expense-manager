import { type ReactNode } from "react";

export type SidebarTab = "people" | "categories" | "transactions";

export type TabConfig = {
  id: SidebarTab;
  label: string;
  icon: ReactNode;
};

