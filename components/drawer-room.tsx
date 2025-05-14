'use client';
import { Box, Drawer, Typography, Stack } from "@mui/material";
import Link from "next/link";
interface DrawerRoomProps {
  openDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
}

const DrawerRoom: React.FC<DrawerRoomProps> = ({ openDrawer, toggleDrawer }) => {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#407BA7", // Applique la couleur de fond au Drawer
        },
      }}
    >
      <Box sx={{ width: 250, padding: 2 }}>
        <Typography variant="h6" color="white" mb={2}>
          Liste des rooms
        </Typography>

        <Stack direction="column" spacing={2}>
        <Link href="/room" passHref>
            <Typography variant="body1" color="white" sx={{ textDecoration: 'none' }}>
              Room 1
            </Typography>
          </Link>
          <Link href="/room" passHref>
            <Typography variant="body1" color="white" sx={{ textDecoration: 'none' }}>
              Room 2
            </Typography>
          </Link>
          <Link href="/room" passHref>
            <Typography variant="body1" color="white" sx={{ textDecoration: 'none' }}>
              Room 3
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default DrawerRoom;

