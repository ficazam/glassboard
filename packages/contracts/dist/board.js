"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStateSchema = exports.ColumnSchema = exports.CardSchema = exports.ColumnIdSchema = void 0;
const zod_1 = require("zod");
exports.ColumnIdSchema = zod_1.z.enum(["todo", "doing", "done"]);
exports.CardSchema = zod_1.z.object({
    id: zod_1.z.uuid(),
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    columnId: exports.ColumnIdSchema,
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.ColumnSchema = zod_1.z.object({
    id: exports.ColumnIdSchema,
    title: zod_1.z.string(),
    order: zod_1.z.number(),
});
exports.BoardStateSchema = zod_1.z.object({
    columns: zod_1.z.array(exports.ColumnSchema),
    cards: zod_1.z.array(exports.CardSchema),
});
