import { updateTodo } from "@/models/todo";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { content, isDone } = await req.json();
    const id = await updateTodo(params.id, content, isDone);
    return Response.json({
        data: id,
    });
}
