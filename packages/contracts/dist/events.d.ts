import { z } from "zod";
export declare const MoveCardPayloadSchema: z.ZodObject<{
    cardId: z.ZodUUID;
    toColumnId: z.ZodEnum<{
        todo: "todo";
        doing: "doing";
        done: "done";
    }>;
    index: z.ZodNumber;
}, z.core.$strip>;
export declare const CreateCardPayloadSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    columnId: z.ZodDefault<z.ZodEnum<{
        todo: "todo";
        doing: "doing";
        done: "done";
    }>>;
}, z.core.$strip>;
export declare const ClientEventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"move-card">;
    payload: z.ZodObject<{
        cardId: z.ZodUUID;
        toColumnId: z.ZodEnum<{
            todo: "todo";
            doing: "doing";
            done: "done";
        }>;
        index: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"create-card">;
    payload: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        columnId: z.ZodDefault<z.ZodEnum<{
            todo: "todo";
            doing: "doing";
            done: "done";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>], "type">;
export type ClientEvent = z.infer<typeof ClientEventSchema>;
export declare const ActivityItemSchema: z.ZodObject<{
    id: z.ZodUUID;
    message: z.ZodString;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const ServerEventSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"board-state">;
    payload: z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"activity">;
    payload: z.ZodObject<{
        id: z.ZodUUID;
        message: z.ZodString;
        timestamp: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "type">;
export type ActivityItem = z.infer<typeof ActivityItemSchema>;
export type ServerEvent = z.infer<typeof ServerEventSchema>;
