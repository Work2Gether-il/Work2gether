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

                    </Box>
        </>
    )
}

export default Screen