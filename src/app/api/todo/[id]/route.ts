import { deleteTodo, updateTodo } from "@/models/todo";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { content, isDone } = await req.json();
    const id = await updateTodo(params.id, content, isDone);
    return Response.json({
        data: id,
    });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = await deleteTodo(params.id);
    return Response.json({
        data: id,
    });
}
