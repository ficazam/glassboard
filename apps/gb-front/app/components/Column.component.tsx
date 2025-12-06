"use client";

import { useState, FormEvent } from "react";
import { Card as CardType, ColumnId, ClientEvent } from "@glassboard/contracts";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableCard } from "./Card.component";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  title: string;
  columnId: ColumnId;
  cards: CardType[];
  send: (event: ClientEvent) => void;
  activeCardId: string | null;
};

export function Column({
  title,
  columnId,
  cards,
  send,
  activeCardId,
}: ColumnProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const { setNodeRef: setDropRef } = useDroppable({
    id: columnId,
    data: {
      type: "column",
      columnId,
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    send({
      type: "create-card",
      payload: {
        title: trimmed,
        description: newDesc.trim() || undefined,
        columnId,
      },
    });

    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-3 backdrop-blur-lg min-h-[420px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-slate-50">
            {title}
          </h2>
          <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300">
            {cards.length}
          </span>
        </div>
      </div>

      <div
        ref={setDropRef}
        className="flex-1 space-y-3 overflow-y-auto px-2 py-1"
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <DraggableCard
              key={card.id}
              card={card}
              activeCardId={activeCardId}
            />
          ))}

          {cards.length === 0 && (
            <p className="rounded-xl border border-dashed border-white/10 bg-slate-900/40 px-3 py-4 text-[11px] text-slate-500">
              No cards yet. Create the first one in{" "}
              <span className="font-medium">{title}</span>.
            </p>
          )}
        </SortableContext>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-2 rounded-xl bg-slate-950/70 p-2"
      >
        <input
          className="w-full rounded-lg bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-1 ring-slate-800 placeholder:text-slate-500 focus:ring-emerald-500/60"
          placeholder={`New card in ${title}`}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="min-h-[50px] w-full resize-none rounded-lg bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none ring-1 ring-slate-800 placeholder:text-slate-500 focus:ring-emerald-500/60"
          placeholder="Optional description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-500/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-950 shadow hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700/70"
          disabled={!newTitle.trim()}
        >
          + Add card
        </button>
      </form>
    </div>
  );
}
