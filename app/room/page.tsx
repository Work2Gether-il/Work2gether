"use server"

import { createClient } from "@/utils/supabase/server"
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper,IconButton } from '@mui/material';
import { DeleteIcon } from "lucide-react";
import CreateInviteButton from "@/components/ui/createInviteCodeButton";
import deletButton from "@/components/ui/deletButton";
import DeletButton from "@/components/ui/deletButton";
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
            
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Work2Gether
          </Typography>
          <Box>
            <Button color="inherit">Créer</Button>
            <Button color="inherit">Invitations</Button>
            <Button color="inherit">Déconnexion</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }} justifyContent={"center"}>
        <Grid container spacing={3}>
          {rooms?.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 8,
                    transform: 'scale(1.03)',
                  },
                }}
              >
                  <CreateInviteButton code={room.slug} isOwner={true} title={room.name} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
}
