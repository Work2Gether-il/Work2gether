"use server"
import { createClient } from "@/utils/supabase/server";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
export default async function salle({
    params,
}: {
  params: Promise<{ inviteCode: string }>
}){
    const supabase = await createClient();
    const {data:user_data,error:e} = await supabase.auth.getUser();
    const {inviteCode} = await params;
        const {data,error} = await supabase
        .from('SessionJoinToken')
        .select('session_id')
        .eq('token',inviteCode)
        .eq('user_id',user_data.user.id)
        .maybeSingle();
    if(data){
        const {data:session_data,error} = await supabase
            .from('Sessions')
            .select('*')
            .eq('id',data.session_id)
            .maybeSingle();
        return(
           <h1>{user_data.user.id}</h1>
        );
    }
    else{
        return(
            <h1>vous ne pouvez pas rejoindre cette session</h1>
        );
    }
}