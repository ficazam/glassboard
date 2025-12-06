"use client";

import {
  ActivityItem,
  BoardState,
  BoardStateSchema,
  ServerEvent,
} from "@glassboard/contracts";
import { useEffect, useState } from "react";

type State = {
  board: BoardState | null;
  activity: ActivityItem[];
};

export const useBoardFormEvents = (events: ServerEvent[]) => {
  const [state, setState] = useState<State>({
    board: null,
    activity: [],
  });

  useEffect(() => {
    if (!events.length) return;

    const last = events[events.length - 1];

    if (last.type === "board-state") {
      const parsed = BoardStateSchema.safeParse(last.payload);

      if (parsed.success) {
        setState((prev) => ({ ...prev, board: parsed.data }));
      }
    }

    if (last.type === "activity") {
      setState((prev) => ({
        ...prev,
        activity: [last.payload, ...prev.activity].slice(0, 50),
      }));
    }
  }, [events]);

  return state;
};
