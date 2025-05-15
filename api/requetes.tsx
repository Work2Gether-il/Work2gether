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

export const fetchSessionTokenByRoomSlug = async (roomSlug: string) => {
  const { data: sessionData, error: sessionError } = await supabase
    .from("Sessions")
    .select("id")
    .eq("slug", roomSlug)
    .single();

  if (sessionError || !sessionData) {
    console.error("Erreur lors de la récupération de la session:", sessionError);
    return null;
  }

  const sessionId = sessionData.id;

  const { data: tokenData, error: tokenError } = await supabase
    .from("SessionJoinToken")
    .select("token")
    .eq("session_id", sessionId)
    //.eq("user_id", userId)
    .maybeSingle();

  if (tokenError || !tokenData) {
    console.error("Erreur lors de la récupération du token:", tokenError);
    return null;
  }

  return tokenData.token;
};

