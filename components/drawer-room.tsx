'use client';
import React, { useEffect, useState } from "react";
import { Box, Drawer, Typography, Stack, IconButton } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AddCallIcon from '@mui/icons-material/AddIcCall';
import { useRouter } from 'next/navigation'; 
import { fetchSessionTokenByRoomSlug } from "@/api/requetes";

interface DrawerRoomProps {
  openDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
  rooms: any[];
}

const DrawerRoom: React.FC<DrawerRoomProps> = ({ openDrawer, toggleDrawer, rooms }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [inviteCodes, setInviteCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTokens = async () => {
      const newCodes: Record<string, string> = {};

      for (const room of rooms) {
        const token = await fetchSessionTokenByRoomSlug(room.slug, room.owner);
        if (token) {
          newCodes[room.id] = token;
        }
      }

      setInviteCodes(newCodes);
    };

    if (rooms?.length) {
      fetchTokens();
    }
  }, [rooms]);

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#407BA7",
        },
      }}
    >
      <Box sx={{ width: 250, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => router.push('/createRoom')}
            aria-label="add-room"
          >
            <AddCallIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" color="white" mb={2}>
          {t('roomList')}
        </Typography>

        <Stack direction="column" spacing={2}>
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <Link key={room.id} href={inviteCodes[room.id] ? `/room/${inviteCodes[room.id]}` : "#"} passHref>
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ textDecoration: 'none', cursor: 'pointer', opacity: inviteCodes[room.id] ? 1 : 0.5 }}
                >
                  {room.name}
                </Typography>
              </Link>
            ))
          ) : (
            <Typography variant="body2" color="white">
              {t('noRooms')}
            </Typography>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
};

export default DrawerRoom;

