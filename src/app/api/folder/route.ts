import { ZodError } from "zod";
import { revalidatePath } from 'next/cache';
import { NextResponse } from "next/server";
import { createFolder, queryFolder } from '@/models/folder';
import { CreateFolder, CreateFolderSchema } from "@/validators/folder";

export async function GET() {
  const folders = await queryFolder();
  return Response.json({
    data: folders,
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  let folder: CreateFolder;
  try {
    folder = CreateFolderSchema.parse(data);
  } catch (error) {
    return NextResponse.json({
      code: 1,
      message: "request is error",
      errors: (error as ZodError).format(),
    }, {
      status: 401
    });
  }
  const result = await createFolder(folder.name);
  revalidatePath("/", "page");
  return Response.json({
    code: 0,
    data: result,
  });
}
