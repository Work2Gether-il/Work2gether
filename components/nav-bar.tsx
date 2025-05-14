'use client';
import { Box, Drawer, IconButton, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerRoom from "./drawer-room";

const NavBar = () => {

  const [openDrawer, setOpenDrawer] = useState(false);

  // Fonction pour ouvrir/fermer le Drawer
  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  return (
    <>
      {/* AppBar de Material UI */}
      <AppBar position="static" sx={{ backgroundColor: '#407BA7' }}>
        <Toolbar>
          {/* Icône Menu Hamburger à gauche */}
          <IconButton
            sx={{ color: 'white', fontSize: '2.5rem' }}  // Augmenter la taille de l'icône du menu
            edge="start"
            onClick={() => toggleDrawer(true)}
            aria-label="menu"
          >
             <MenuIcon sx={{ fontSize: '2.5rem' }} /> 
          </IconButton>

          {/* Espace vide entre les icônes */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Icône de connexion à droite */}
          <IconButton sx={{ color: 'white' }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer à gauche */}
      <DrawerRoom openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NavBar;
