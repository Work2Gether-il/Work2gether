'use client';
import { Box, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import NavBar from "./nav-bar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import CustomizedSteppers from "./customize-stepper";

interface HomeProps {
  isConnected?: boolean;
}

const HomeComponent : React.FC<HomeProps> = ({ isConnected = false }) => {

    const { t } = useTranslation();
    return (
    <>
      <NavBar isConnected={isConnected}/>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Typography variant="h1" textAlign="center">{t('title')}</Typography>
          <Box sx={{ backgroundColor: '#004E89', p: 4, borderRadius: 3 }}>

            <Typography variant="h4" color="white" mb={4}>
              {t('postviews')}
            </Typography>


            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mb={6}>

              <Box flex={1} p={1}>
                <Typography variant="body1" color="white">
                  {t('description1')}
                  {t('description2')}
                </Typography>
              </Box>

              <Box flex={1} p={1}>
                <List dense>
                  {[
                    t('viewing'),
                    t('chat'),
                    t('document'),
                    t('webcam')
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

export default HomeComponent