import { z } from "zod";

export const TodoSchema = z.object({
    id: z.string().min(1),
    content: z.string().min(1),
    isDone: z.boolean(),
    folderId: z.string().min(1),
});

export const CreateTodoSchema = TodoSchema.pick({
    content: true,
    folderId: true,
});

export const QueryTodoSchema = TodoSchema.pick({
    folderId: true,
}).partial();

export type Todo = z.infer<typeof TodoSchema>;

export type CreateTodo = z.infer<typeof CreateTodoSchema>;

export type QueryTodo = z.infer<typeof QueryTodoSchema>;
