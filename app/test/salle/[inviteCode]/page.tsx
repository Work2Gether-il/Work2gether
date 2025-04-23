import { createClient } from "@/utils/supabase/client";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";
export default async function salle({
    params,
}: {
  params: Promise<{ inviteCode: string }>
}){
    const supabase = createClient()
    const {inviteCode} = await params;
        const {data,error} = await supabase
        .from('SessionJoinToken')
        .select('session_id')
        .eq('token',inviteCode)

        .maybeSingle();
        if(error) throw error;
        
    if(data){
        const {data:session_data,error} = await supabase
            .from('Sessions')
            .select('*')
            .eq('id',data.session_id)
            .maybeSingle();
        return(
           <h1>{session_data?.title}</h1>
        );
    }
    else{
        return(
            <h1>{inviteCode}</h1>
        );
    }
}