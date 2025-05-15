import VideoPlayer from "@/components/videoPlayer"
import { Box, BoxProps } from "@mui/material"
import DocumentPlayer from "@/components/documentPlayer";

const Screen = ({ roomId, ...props }: BoxProps & { roomId: string }) => {
    return(
        <>
            
                        <VideoPlayer
                            url={"https://www.youtube.com/watch?v=cFwKV5bUpk8&pp=ygUFTVQxODA%3D"}
                            roomId={roomId}
                        />
                        <DocumentPlayer roomId={roomId} />
                    
        </>
    )
}

export default Screen