"use client";

import { ActivityItem } from "@glassboard/contracts";
import { motion, AnimatePresence } from "framer-motion";

type ActivityFeedProps = {
  activity: ActivityItem[];
};

export function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.95)] ring-1 ring-white/5 max-h-80">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-50">
            Activity
          </h2>
          <p className="text-[11px] text-slate-400">
            Latest moves across the board.
          </p>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto pr-1">
        {activity.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 px-3 py-4 text-[11px] text-slate-500">
            No activity yet. Create or move a card to see realtime updates.
          </p>
        )}

        <ul className="space-y-2 text-xs">
          <AnimatePresence>
            {activity.map((item) => {
              const time = new Date(item.timestamp);
              const timeStr = time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 8, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="group flex items-start gap-2 rounded-2xl bg-slate-900/70 px-3 py-2 ring-1 ring-white/5"
                >
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80 group-hover:bg-emerald-300" />
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-100">{item.message}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      {timeStr}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </aside>
  );
}
