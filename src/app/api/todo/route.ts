import { createTodo, queryTodo } from '@/models/todo';

export async function GET(req: Request) {
  const todoList = await queryTodo();
  return Response.json({
    data: todoList,
  });
}

export async function POST(req: Request) {
  const { content } = await req.json();
  const todoId = await createTodo(content);
  return Response.json({
    data: todoId,
  });
}
