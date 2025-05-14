'use client';
import { Box, Drawer, IconButton, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerRoom from "./drawer-room";
import { signOutAction } from "@/app/actions";

interface NavBarProps {
  isConnected?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isConnected = false }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#407BA7' }}>
        <Toolbar>
          <IconButton
            sx={{ color: 'white', fontSize: '2.5rem' }}
            edge="start"
            onClick={() => toggleDrawer(true)}
            aria-label="menu"
          >
            <MenuIcon sx={{ fontSize: '2.5rem' }} />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton sx={{ color: 'white' }}>
            <AccountCircleIcon />
          </IconButton>

          {isConnected && (
            <form action={signOutAction}>
              <Button
              type="submit"
              sx={{ color: 'white', marginLeft: 1 }}
              variant="text"
              >
              Sign Out
            </Button>
            </form>
            
          )}
        </Toolbar>
      </AppBar>

      <DrawerRoom openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NavBar;
