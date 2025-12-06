"use client";

import { io, Socket } from "socket.io-client";
import { ServerEvent, ClientEvent } from "@glassboard/contracts";
import { useEffect, useRef, useState } from "react";

export function useGlassSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ServerEvent[]>([]);

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_API_WS_URL ?? "http://localhost:3001"
    );
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("server-event", (event: ServerEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function send(event: ClientEvent) {
    if (!socketRef.current) return;
    socketRef.current.emit("client-event", event);
  }

  return { connected, events, send };
}
