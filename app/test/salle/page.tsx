"use client"
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { fetchUserRooms } from "@/api/requetes";
import { Box } from "@mui/material";

export default function salle_list(){
    const supabase = createClient();
    const [session, setSession] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadRooms = useCallback(async () => {
        try {
          const userRooms = await fetchUserRooms(session.user.id);
          setRooms(userRooms);
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      }, [session.user.id]);

    useEffect(() => {
        const fetchSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
        };
    
        fetchSession();
    
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        
        loadRooms()

        return () => authListener.subscription.unsubscribe();
      }, [loadRooms]);

    if(!session || session.user.is_anonymous){
        return redirect("/");
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadRooms();
      }, [loadRooms]);


    return(
        <Box>

        </Box>
    );
}