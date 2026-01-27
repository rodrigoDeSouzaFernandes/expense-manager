import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import type { SidebarNavigationProps } from "./types";

const SidebarNavigation = ({
  width = 260,
  items,
  activeId,
  onChange,
}: SidebarNavigationProps) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => {
            const selected = activeId === item.id;
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton selected={selected} onClick={() => onChange(item.id)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default SidebarNavigation;

