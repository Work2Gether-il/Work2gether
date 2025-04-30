import ClickableIcon from "@/components/ui/clickable-icons"
import { Box, BoxProps } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import TableViewIcon from '@mui/icons-material/TableView';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TranslateIcon from '@mui/icons-material/Translate';

const TopBar = (props:BoxProps) =>{
    return (
        <>
            <Box 
                {...props}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#407BA7",
                    ...props.sx
                }}>
                <Box sx={{ flex: 1}}>
                    <ClickableIcon Icon={PostAddIcon} />
                    <ClickableIcon Icon={TableViewIcon} />
                    <ClickableIcon Icon={PictureAsPdfIcon} />
                    <ClickableIcon Icon={ContentPasteIcon} />
                </Box>
                <Box sx={{ flex: 1}}>
                    <ClickableIcon Icon={YouTubeIcon} />
                    <ClickableIcon Icon={LiveTvIcon} />
                </Box>
                <Box sx={{ flex: 1, }}>
                    <ClickableIcon Icon={TranslateIcon} />
                </Box>
            </Box>
        </>
    )
}

export default TopBar