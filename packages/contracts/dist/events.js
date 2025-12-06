"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerEventSchema = exports.ActivityItemSchema = exports.ClientEventSchema = exports.CreateCardPayloadSchema = exports.MoveCardPayloadSchema = void 0;
const zod_1 = require("zod");
const board_1 = require("./board");
exports.MoveCardPayloadSchema = zod_1.z.object({
    cardId: board_1.CardSchema.shape.id,
    toColumnId: board_1.ColumnIdSchema,
    index: zod_1.z.number().int().min(0),
});
exports.CreateCardPayloadSchema = zod_1.z.object({
    title: board_1.CardSchema.shape.title,
    description: board_1.CardSchema.shape.description.optional(),
    columnId: board_1.ColumnIdSchema.default("todo"),
});
exports.ClientEventSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({ type: zod_1.z.literal("move-card"), payload: exports.MoveCardPayloadSchema }),
    zod_1.z.object({
        type: zod_1.z.literal("create-card"),
        payload: exports.CreateCardPayloadSchema,
    }),
]);
exports.ActivityItemSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    message: zod_1.z.string(),
    timestamp: zod_1.z.string(),
});
exports.ServerEventSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("board-state"),
        payload: board_1.BoardStateSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("activity"),
        payload: exports.ActivityItemSchema,
    }),
]);
