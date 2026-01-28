import { type ReactNode } from "react";

export type SidebarItem = {
  id: string;
  label: string;
  icon?: ReactNode;
};

export type SidebarNavigationProps = {
  width?: number;
  items: SidebarItem[];
  activeId: string;
  onChange: (id: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

