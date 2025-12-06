import { z } from "zod";

export const ColumnIdSchema = z.enum(["todo", "doing", "done"]);

export const CardSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().optional(),
  columnId: ColumnIdSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ColumnSchema = z.object({
  id: ColumnIdSchema,
  title: z.string(),
  order: z.number(),
});

export const BoardStateSchema = z.object({
  columns: z.array(ColumnSchema),
  cards: z.array(CardSchema),
});

export type ColumnId = z.infer<typeof ColumnIdSchema>;
export type Card = z.infer<typeof CardSchema>;
export type Column = z.infer<typeof ColumnSchema>;
export type BoardState = z.infer<typeof BoardStateSchema>;
