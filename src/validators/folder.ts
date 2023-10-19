import { z } from "zod";

export const FolderSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
});

export const CreateFolderSchema = FolderSchema.pick({
    name: true,
});

export type Folder = z.infer<typeof FolderSchema>;

export type CreateFolder = z.infer<typeof CreateFolderSchema>;
