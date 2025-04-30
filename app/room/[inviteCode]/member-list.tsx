import { Box, BoxProps } from "@mui/material"
import Member from "./member"

const MembersList = (props: BoxProps) => {
    return(<>
        <Box 
            {...props}
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#004E89",
                gap: 4,
                flexShrink: 0,
                ...props.sx
            }}>
            <Member name="Colin"/>
            <Member name="Elvin" />
            <Member name="Elliot" />
            <Member name="Mathis" />
        </Box>
    </>)
}

export default MembersList