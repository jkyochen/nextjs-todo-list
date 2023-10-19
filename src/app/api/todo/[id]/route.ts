import { deleteTodo, getTodo, updateTodo } from "@/models/todo";
import { Todo, TodoSchema } from "@/validators/todo";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    let todo: Todo;
    try {
        todo = TodoSchema.parse({
            ...data,
            id: params.id,
        });
    } catch (error) {
        return NextResponse.json({
            code: 1,
            message: "request is error",
            errors: (error as ZodError).format(),
        }, {
            status: 401
        });
    }
    const id = await updateTodo(todo);
    revalidatePath("/");
    revalidatePath(`/folder/${todo.folderId}`);
    return Response.json({
        code: 0,
        data: id,
    });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const todo = await getTodo(params.id);
    if (!todo) {
        return NextResponse.json({
            code: 2,
            message: "todo is not exist",
        }, {
            status: 401
        });
    }
    const id = await deleteTodo(params.id);
    revalidatePath("/");
    revalidatePath(`/folder/${todo.folderId}`);
    return Response.json({
        code: 0,
        data: id,
    });
}
