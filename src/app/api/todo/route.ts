import { ZodError, z } from "zod";
import { createTodo, queryTodo } from '@/models/todo';
import { revalidatePath } from 'next/cache';
import { NextResponse } from "next/server";
import { CreateTodo, CreateTodoSchema, Todo } from "@/validators/todo";

export async function GET(req: Request) {
  const todoList = await queryTodo();
  return Response.json({
    data: todoList,
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  let todo: CreateTodo;
  try {
    todo = CreateTodoSchema.parse(data);
  } catch (error) {
    return NextResponse.json({
      code: 1,
      message: "request is error",
      errors: (error as ZodError).format(),
    }, {
      status: 401
    });
  }
  const result = await createTodo(todo.content);
  revalidatePath("/");
  return Response.json({
    code: 0,
    data: result,
  });
}
