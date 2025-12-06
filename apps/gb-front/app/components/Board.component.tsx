"use client";

import { Card, ColumnId } from "@glassboard/contracts";
import { useBoardFormEvents } from "../hooks/useBoardState.hook";
import { useSocket } from "../hooks/useSocket.hook";
import { motion } from "framer-motion";
import { Column } from "./Column.component";
import { ActivityFeed } from "./ActivityFeed.component";
import {
  closestCenter,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";

export function BoardView() {
  const { connected, events, send } = useSocket();
  const { board, activity } = useBoardFormEvents(events);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  console.log("[BoardView] connected:", connected);
  console.log("[BoardView] board:", board);
  console.log("[BoardView] activity:", activity);

  if (!board) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Loading GlassBoard
        </p>
        <div className="h-1 w-40 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full w-1/3 animate-pulse bg-slate-500" />
        </div>
      </div>
    );
  }

  const byColumn = (id: ColumnId) =>
    board.cards.filter((c) => c.columnId === id);

  const activeCard = activeCardId
    ? board.cards.find((c) => c.id === activeCardId) ?? null
    : null;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveCardId(String(active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setTimeout(() => {
      setActiveCardId(null);
    }, 120);

    if (!over || !board) return;

    const activeId = String(active.id);
    if (activeId === String(over.id)) return;

    const activeCard = board.cards.find((c) => c.id === activeId);
    if (!activeCard) return;

    const overData = over.data.current as {
      type?: string;
      columnId?: ColumnId;
    } | null;

    let toColumnId: ColumnId | undefined;
    let targetIndex = 0;

    if (overData?.type === "card" && overData.columnId) {
      toColumnId = overData.columnId;
      const cardsInTarget = board.cards.filter(
        (c) => c.columnId === toColumnId
      );
      targetIndex = cardsInTarget.findIndex((c) => c.id === String(over.id));
      if (targetIndex < 0) targetIndex = cardsInTarget.length;
    } else if (overData?.type === "column" && overData.columnId) {
      toColumnId = overData.columnId;
      const cardsInTarget = board.cards.filter(
        (c) => c.columnId === toColumnId
      );
      targetIndex = cardsInTarget.length;
    }

    if (!toColumnId) return;
    if (toColumnId === activeCard.columnId) {
      return;
    }

    send({
      type: "move-card",
      payload: {
        cardId: activeId,
        toColumnId,
        index: targetIndex,
      },
    });
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActiveCardId(null);
  };

  return (
    <div className="grid grid-cols-[3fr,1.2fr] gap-8">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <motion.div
          className="rounded-3xl border border-white/10 bg-white/5/5 bg-slate-900/40 backdrop-blur-2xl p-4 shadow-[0_18px_60px_rgba(15,23,42,0.90)] ring-1 ring-white/5"
          layout
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                GlassBoard
              </h1>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium shadow-inner ${
                connected
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40"
                  : "bg-slate-800/80 text-slate-300 ring-1 ring-slate-600/60"
              }`}
            >
              <span
                className={`mr-1 h-2 w-2 rounded-full ${
                  connected
                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                    : "bg-slate-500"
                }`}
              />
              {connected ? "Live" : "Offline"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {board.columns
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((col) => (
                <Column
                  key={col.id}
                  title={col.title}
                  cards={byColumn(col.id)}
                  columnId={col.id}
                  send={send}
                  activeCardId={activeCardId}
                />
              ))}
          </div>
        </motion.div>

        <DragOverlay dropAnimation={null}>
          {activeCard ? <CardPreview card={activeCard} /> : null}
        </DragOverlay>
      </DndContext>

      <ActivityFeed activity={activity} />
    </div>
  );
}

function CardPreview({ card }: { card: Card }) {
  const created = new Date(card.createdAt);

  return (
    <div className="rounded-xl border border-emerald-300/60 bg-slate-950/90 px-4 py-3 text-xs text-slate-100 shadow-2xl shadow-emerald-500/40">
      <p className="font-medium text-[12px] leading-snug text-slate-50">
        {card.title}
      </p>
      {card.description && (
        <p className="mt-1 text-[11px] text-slate-300 line-clamp-3">
          {card.description}
        </p>
      )}
      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
        {created.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
}
