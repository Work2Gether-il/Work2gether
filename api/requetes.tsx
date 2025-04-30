"use client"
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

export const fetchUserRooms = async (userId: string) => {
    const { data, error } = await supabase
      .from('Rooms')  // ou le nom de votre table des rooms
      .select(`*`)
      .eq('owner', userId)  // Filtrer par utilisateur
    if (error) {
      console.error('Error fetching rooms:', error);
      return [];
    }
  
    return data;
  };