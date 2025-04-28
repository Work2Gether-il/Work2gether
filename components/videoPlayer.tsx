"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

export default function VideoPlayer({ url, roomId }) {
  const playerRef = useRef(null);
  const socketRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const isRemoteActionRef = useRef(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

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

  return (
    <div>
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
    </div>
  );
}
