import { createTodo, queryTodo } from '@/models/todo';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
  const todoList = await queryTodo();
  return Response.json({
    data: todoList,
  });
}

export async function POST(req: Request) {
  const { content } = await req.json();
  const result = await createTodo(content);
  revalidatePath("/");
  return Response.json({
    data: result,
  });
}
