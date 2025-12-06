"use client";

import { ClientEvent, ServerEvent } from "@glassboard/contracts";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [events, setEvents] = useState<ServerEvent[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_WS_URL ?? "http://localhost:3001";
    const socket = io(url, { transports: ["websocket"] });

    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("server-event", (e: ServerEvent) => {
      setEvents((prev) => [...prev, e]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const send = (e: ClientEvent) => socketRef.current?.emit("client-event", e);

  return { connected, events, send };
};
