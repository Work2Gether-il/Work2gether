import AuthButton from "@/components/header-auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";
import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomizedSteppers from "@/components/customize-stepper";

export default async function ProtectedPage() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <NavBar isConnected={!!user} />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography variant="h1" textAlign="center">Work2Gether</Typography>
          <Box sx={{ backgroundColor: '#004E89', p: 4, borderRadius: 3 }}>

            <Typography variant="h4" color="white" mb={4}>
              À propos
            </Typography>


            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mb={6}>

              <Box flex={1} p={1}>
                <Typography variant="body1" color="white">
                  Work2Gether est une plateforme collaborative conçue pour simplifier le travail en équipe.
                  Créez des espaces, invitez vos collaborateurs et lancez-vous en quelques clics !
                </Typography>
              </Box>

              <Box flex={1} p={1}>
                <List dense>
                  {[
                    "Lecture syncronisé d'audio et vidéo",
                    "Chat intégré",
                    "Partage de documents",
                    "Webcam, micro et partage d'écran"
                  ].map((text, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={text} primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>

            <CustomizedSteppers />
          </Box>
        </Box>
        <div>
          <AuthButton/>
        </div>
      </main>
    </>
  );
}
