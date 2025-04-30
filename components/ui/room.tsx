"use client"
import { useEffect } from "react";
import { UUID } from "crypto";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
interface roomProperties{
    inviteCode : String
}

export default function room({inviteCode}:roomProperties){
    const [session, setSession] = useState()

    useEffect(() => {
            const fetchSession = async () => {
              const { data: { session } } = await supabase.auth.getSession();
              setSession(session);
            };
        
            fetchSession();
        
            const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
              setSession(session);
            });
        
            return () => authListener.subscription.unsubscribe();
          }, []);
    
    
}
