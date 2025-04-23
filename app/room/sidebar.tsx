import { Box, BoxProps } from "@mui/material"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClickableIcon from "@/components/ui/clickable-icons";

const SideBar = (props : BoxProps) => {
 return(
    <>
      <Box 
        {...props}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#407BA7", 
          gap: 6,
          ...props.sx
        }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent:"center",
            gap: 1
        }}>
             <ClickableIcon Icon={PersonAddAltIcon} />
             <ClickableIcon Icon={AssignmentIndIcon} />
        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent:"center",
            gap: 1
        }}>
            <ClickableIcon Icon={VideocamIcon} />
            <ClickableIcon Icon={MicIcon} />
            <ClickableIcon Icon={MonitorIcon} />
        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
            justifyContent:"center",
            gap: 1
        }}>
            <ClickableIcon Icon={SettingsIcon} />
            <ClickableIcon Icon={AccountCircleIcon} />
        </Box>
        
      </Box>
    </>
 )
}

export default SideBar