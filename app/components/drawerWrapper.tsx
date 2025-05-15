'use client'

import { useEffect, useState } from 'react';
import DrawerRoom from '@/components/drawer-room';
import { fetchUserRooms } from '@/api/requetes'; // pas une route, une fonction

interface Room {
  id: string;
  name: string;
}

interface DrawerRoomWrapperProps {
  openDrawer: boolean;
  toggleDrawer: (open: boolean) => void;
  userId: string; 
}

const DrawerRoomWrapper = ({ openDrawer, toggleDrawer, userId }: DrawerRoomWrapperProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await fetchUserRooms(userId);
        setRooms(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rooms:', error);
        setRooms([]);
      }
    };

    if (userId) {
      fetchRooms();
    }
  }, [userId]);

  return <DrawerRoom openDrawer={openDrawer} toggleDrawer={toggleDrawer} rooms={rooms} />;
};

export default DrawerRoomWrapper
