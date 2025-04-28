import VideoPlayer from "@/components/videoPlayer";
import { Box } from "@mui/material";

export default function room(){
    return(
        <Box>
            <h1>video player</h1>
            <VideoPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            roomId="room123"/>
        </Box>
    )
}