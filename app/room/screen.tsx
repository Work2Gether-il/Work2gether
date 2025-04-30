import VideoPlayer from "@/components/videoPlayer"
import { Box, BoxProps } from "@mui/material"

const Screen = (props : BoxProps) => {
    return(
        <>
            <Box 
                {...props}
                sx={{
                    display: "flex",
                    backgroundColor:"black",
                    height: "100vh",
                    flexGrow: 1,
                    minHeight: 0,
                    ...props.sx
                    }}>
                        <VideoPlayer
                            url={"https://www.youtube.com/watch?v=xvFZjo5PgG0"}
                            roomId={"room123"}
                        />
                    </Box>
        </>
    )
}

export default Screen