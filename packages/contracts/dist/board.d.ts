import { z } from "zod";
export declare const ColumnIdSchema: z.ZodEnum<{
    todo: "todo";
    doing: "doing";
    done: "done";
}>;
export declare const CardSchema: z.ZodObject<{
    id: z.ZodUUID;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    columnId: z.ZodEnum<{
        todo: "todo";
        doing: "doing";
        done: "done";
    }>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export declare const ColumnSchema: z.ZodObject<{
    id: z.ZodEnum<{
        todo: "todo";
        doing: "doing";
        done: "done";
    }>;
    title: z.ZodString;
    order: z.ZodNumber;
}, z.core.$strip>;
export declare const BoardStateSchema: z.ZodObject<{
    columns: z.ZodArray<z.ZodObject<{
        id: z.ZodEnum<{
            todo: "todo";
            doing: "doing";
            done: "done";
        }>;
        title: z.ZodString;
        order: z.ZodNumber;
    }, z.core.$strip>>;
    cards: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        columnId: z.ZodEnum<{
            todo: "todo";
            doing: "doing";
            done: "done";
        }>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ColumnId = z.infer<typeof ColumnIdSchema>;
export type Card = z.infer<typeof CardSchema>;
export type Column = z.infer<typeof ColumnSchema>;
export type BoardState = z.infer<typeof BoardStateSchema>;
