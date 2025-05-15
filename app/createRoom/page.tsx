import { Box, TextField,Button } from "@mui/material";
import { creerSalleAction } from "../actions";
import CreateEntryButton from "@/components/ui/createRoomButton";

export default async function CreateRoom(){
    return(
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            >
            <CreateEntryButton/>
        </Box> 
    )
}