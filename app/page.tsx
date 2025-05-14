import React from 'react';
import CustomizedSteppers from "@/components/customize-stepper";
import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import NavBar from "@/components/nav-bar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default async function Home() {

  return (
    <>
      <NavBar/>
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
        

        
      </main>
    </>
  );
}
