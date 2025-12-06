import { z } from "zod";
import { BoardStateSchema, CardSchema, ColumnIdSchema } from "./board";

export const MoveCardPayloadSchema = z.object({
  cardId: CardSchema.shape.id,
  toColumnId: ColumnIdSchema,
  index: z.number().int().min(0),
});

export const CreateCardPayloadSchema = z.object({
  title: CardSchema.shape.title,
  description: CardSchema.shape.description.optional(),
  columnId: ColumnIdSchema.default("todo"),
});

export const ClientEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("move-card"), payload: MoveCardPayloadSchema }),
  z.object({
    type: z.literal("create-card"),
    payload: CreateCardPayloadSchema,
  }),
]);
export type ClientEvent = z.infer<typeof ClientEventSchema>;

export const ActivityItemSchema = z.object({
  id: z.uuid(),
  message: z.string(),
  timestamp: z.string(),
});

export const ServerEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("board-state"),
    payload: BoardStateSchema,
  }),
  z.object({
    type: z.literal("activity"),
    payload: ActivityItemSchema,
  }),
]);

export type ActivityItem = z.infer<typeof ActivityItemSchema>;
export type ServerEvent = z.infer<typeof ServerEventSchema>;
