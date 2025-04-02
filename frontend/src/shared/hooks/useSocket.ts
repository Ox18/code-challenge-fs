import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "../utils/cookie";

export const useSocket = (url: string) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const token = getCookie("token");

    socket.current = io(url, {
      transports: ["websocket"],
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });


    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [url]);

  return socket;
};
