import VideoPlayer from "@/components/videoPlayer"
import { Box, BoxProps } from "@mui/material"

const Screen = (props : BoxProps) => {
    return(
        <>
            
                        <VideoPlayer
                            url={"https://www.youtube.com/watch?v=xvFZjo5PgG0"}
                            roomId={"room123"}
                        />
                    
        </>
    )
}

export default Screen