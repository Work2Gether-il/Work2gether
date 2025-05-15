'use client';
import { Box, Drawer, IconButton, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOutAction } from "@/app/actions";
import Link from "next/link";
import DrawerRoomWrapper from "@/app/components/drawerWrapper";
import LangSwitcher from "./langue-switcher";
import { useTranslation } from "react-i18next";
import { createClient } from "@/utils/supabase/client";

interface NavBarProps {
  isConnected?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isConnected = false }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur de récupération de l'utilisateur:", error);
        return;
      }
      setUserId(user?.id || null);
    };

    fetchUser();
  }, []);

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  const { t } = useTranslation();
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

              <LangSwitcher />
              <IconButton sx={{ color: 'white' }}>
              <Link href="/sign-in">
                <AccountCircleIcon />
              </Link>
            </IconButton>
          {isConnected && (
            <form action={signOutAction}>
              <Button
              type="submit"
              sx={{ color: 'white', marginLeft: 1 }}
              variant="text"
              >
              {t('signout')}
            </Button>
            </form>
            
          )}
          
          
        </Toolbar>
      </AppBar>

      <DrawerRoomWrapper openDrawer={openDrawer} toggleDrawer={toggleDrawer} userId={userId ?? ""} />
    </>
  );
};

export default NavBar;
