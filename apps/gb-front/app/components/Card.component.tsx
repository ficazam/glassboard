"use client";

import type { CSSProperties } from "react";
import { Card as CardType } from "@glassboard/contracts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

type DraggableCardProps = {
  card: CardType;
  activeCardId?: string | null;
};

export function DraggableCard({ card, activeCardId }: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      columnId: card.columnId,
    },
  });

  const hidden = isDragging || activeCardId === card.id;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: hidden ? 0 : 1,
    zIndex: isDragging ? 20 : "auto",
  };

  const created = new Date(card.createdAt);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      {...attributes}
      {...listeners}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="touch-none rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 shadow-md shadow-slate-950/40 cursor-grab active:cursor-grabbing transition-colors hover:border-emerald-300/60 hover:bg-slate-900/90"
    >
      <p className="font-medium text-[12px] leading-snug text-slate-50">
        {card.title}
      </p>
      {card.description && (
        <p className="mt-1 text-[11px] text-slate-300 line-clamp-3">
          {card.description}
        </p>
      )}
      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {created.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </motion.div>
  );
}
