import ClickableIcon from "@/components/ui/clickable-icons";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, BoxProps, TextField, Typography } from "@mui/material";

const ChatPart = (props: BoxProps) => {
  
  return (
    <>
      <Box
        {...props}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#002962",
          ...props.sx,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <ClickableIcon Icon={ChatIcon} />
          <ClickableIcon Icon={UpdateIcon} />
        </Box>

        <Box
          sx={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircle sx={{ color: "white" }} />
              <Typography color="white">Username</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#00043A",
                color: "white",
                padding: 1,
                borderRadius: 2,
                maxWidth: "60%",
              }}
            >
              <Typography>Message content goes here...</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{ flex: 2, display: "flex", alignItems: "center", padding: 2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your message..."
            sx={{
              backgroundColor: "#00043A",
              borderRadius: 1,
              input: { color: "white" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatPart;
