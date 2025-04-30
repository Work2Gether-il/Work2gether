"use server"

import { createClient } from "@/utils/supabase/server"
import { Box } from "@mui/material";
import CreateInviteButton from "@/components/ui/createInviteCodeButton";

function Items(slug:string,title:string){
    return(
        <h1>
             {title}
        </h1>
    )
}

export default async function myRooms(){
    const supabase = await createClient();
    const {data:user_data,error} = await supabase.auth.getUser()
    if(user_data.user?.is_anonymous){
        return(
            <h1>connectez vous pour accéder a vos salles</h1>
        );
    }
    else{
        const {data:rooms,error:room_error} = await supabase
            .from('Rooms')
            .select('*')
            .eq('owner',user_data.user?.id);
        return(
            <ul>
                {rooms?.map((room) => <CreateInviteButton key={room.id} code={room.slug} isOwner={true} title={room.name}/>)}
            </ul>
        );
    }
}