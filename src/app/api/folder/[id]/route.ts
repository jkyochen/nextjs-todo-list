import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { deleteFolder, updateFolder } from "@/models/folder";
import { Folder, FolderSchema } from "@/validators/folder";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    let folder: Folder;
    try {
        folder = FolderSchema.parse({
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
    const id = await updateFolder(folder);
    revalidatePath("/");
    return Response.json({
        code: 0,
        data: id,
    });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = await deleteFolder(params.id);
    revalidatePath("/");
    return Response.json({
        code: 0,
        data: id,
    });
}
