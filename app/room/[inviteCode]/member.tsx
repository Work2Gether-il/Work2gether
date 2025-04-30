import { Box } from "@mui/system"
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { Typography } from "@mui/material";

type MemberProps = {
    name:string
}


const Member: React.FC<MemberProps> = ({name}) => {
    return(
        <>
            <Box sx={{
                display:"flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>

                <SensorOccupiedIcon fontSize="large" sx={{color:"white"}}/>
                <Typography> {name} </Typography>
            </Box>
        </>
    )
}

export default Member