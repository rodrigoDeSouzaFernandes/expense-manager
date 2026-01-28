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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SidebarNavigationProps } from "./types";

const SidebarNavigation = ({
  width = 260,
  items,
  activeId,
  onChange,
  mobileOpen,
  onMobileClose,
}: SidebarNavigationProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleItemClick = (id: string) => {
    onChange(id);
    if (!isDesktop) {
      onMobileClose();
    }
  };

  const content = (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => {
            const selected = activeId === item.id;

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={selected}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.icon && (
                    <ListItemIcon>{item.icon}</ListItemIcon>
                  )}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Box>
    </>
  );

  return (
    <>
      {/* DESKTOP */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width,
            boxSizing: "border-box",
          },
        }}
      >
        {content}
      </Drawer>

      {/* MOBILE */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: {
            width,
            boxSizing: "border-box",
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
};

export default SidebarNavigation;
