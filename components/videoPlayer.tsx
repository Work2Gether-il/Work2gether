"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Snackbar, Alert } from "@mui/material";

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoPlayer({ url: initialUrl, roomId }) {
  const playerRef = useRef(null);
  const socketRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState('');
  const [muted, setMuted] = useState(true);
  const isRemoteActionRef = useRef(false);
  
  const nodeURL = process.env.NEXT_PUBLIC_NODE_URL
  ? `${process.env.NEXT_PUBLIC_NODE_URL}`
  : "http://localhost:3000";
  
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    socketRef.current = io(nodeURL);

    socketRef.current.emit("join-room", roomId);

    socketRef.current.on("video-action", (data) => {
      if (!playerRef.current) return;

      isRemoteActionRef.current = true; 

      if (data.type === "play") {
        playerRef.current.seekTo(data.time, "seconds");
        setPlaying(true);
      }
      if (data.type === "pause") {
        playerRef.current.seekTo(data.time, "seconds");
        setPlaying(false);
      }
      if (data.type === "seek") {
        playerRef.current.seekTo(data.time, "seconds");
      }
      if(data.type == "change-url"){
        setUrl(data.url);
        setPlaying(false);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handlePlay = () => {
    if (isRemoteActionRef.current) {
      isRemoteActionRef.current = false;
      return;
    }

    if (!seeking && socketRef.current) {
      socketRef.current.emit("video-action", { roomId, type: "play", time: playerRef.current.getCurrentTime() });
    }
    setSeeking(false);
  };

  const handlePause = () => {
    if (isRemoteActionRef.current) {
      isRemoteActionRef.current = false;
      return;
    }

    if (!seeking && socketRef.current) {
      socketRef.current.emit("video-action", { roomId, type: "pause", time: playerRef.current.getCurrentTime() });
    }
    setSeeking(false);
  };

  const handleSeek = (e) => {
    if (socketRef.current) {
      socketRef.current.emit("video-action", { roomId, type: "seek", time: e.playedSeconds });
    }
  };

  const handleChangeUrl = () => {
    if(socketRef.current && inputUrl){
      socketRef.current.emit("video-action", {roomId, type: "change-url", url: inputUrl});
      setUrl(inputUrl);
      setInputUrl('');
      setOpen(false);
    }
    if(!inputUrl){
      setSnackbar({ open: true, message:'Veuillez entrer un url', severity: 'error' });
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (

    <Box
    >
      <Box
      display={"flex"}
      justifyContent={"center"}
      mt={2}
      >
    <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
      Changer de vidéo
    </Button>
    </Box>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Changer la vidéo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="URL YouTube"
          fullWidth
          variant="outlined"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Annuler</Button>
        <Button onClick={handleChangeUrl} variant="contained">Changer</Button>
      </DialogActions>
    </Dialog>
    <ReactPlayer
      ref={playerRef}
      url={url}
      playing={playing}
      controls
      onPlay={handlePlay}
      onPause={handlePause}
      onSeek={handleSeek}
      width="100%"
      height="500px"
    />
    <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
    </Snackbar>
  </Box>

  );
}
