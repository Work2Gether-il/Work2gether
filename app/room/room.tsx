import { Box} from "@mui/material";
import SideBar from "./sidebar";
import MembersList from "./member-list";
import Screen from "./screen";
import Chat from "./chat";
import TopBar from "./topbar";

const Room = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <TopBar sx={{ flexShrink: 0 }} />

        {/* Conteneur principal */}
        <Box
            sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
            minHeight: 0,
            }}
        >
            {/* Barre latérale */}
            <SideBar sx={{ flexShrink: 0 }} />

            {/* Conteneur du centre */}
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                minHeight: 0, 
                height: "100%", // S'assure que ce conteneur remplit bien l'espace disponible
            }}
            >
            {/* Écran principal - prend tout l'espace disponible */}
            <Box sx={{ flexGrow: 1, minHeight: 0, backgroundColor: "black" }}>
                <Screen />
            </Box>

            {/* Liste des membres en bas */}
            <Box sx={{ flexShrink: 0 }}>
                <MembersList />
            </Box>
            </Box>

            {/* Chat à droite */}
            <Chat sx={{ flexShrink: 0 }} />
        </Box>
        </Box>
    </Box>
  );
};

export default Room;