import { connectDB } from '@/db/mongodb';
import { Folder } from '@/validators/folder';
import mongoose, { Document, Schema } from 'mongoose';

interface IFolder extends Document {
    name: string;
}

const FolderSchema: Schema = new Schema({
    name: { type: String, required: true },
});

FolderSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});
FolderSchema.set('toJSON', {
    virtuals: true,
});

const FolderModel = mongoose.models.Folder || mongoose.model<IFolder>('Folder', FolderSchema);

export const createFolder = async (name: string): Promise<Folder> => {
    await connectDB();
    const Folder = new FolderModel({
        name,
    });
    const result = await Folder.save();
    return formatFolder(result);
}

export const getFolder = async (id: string): Promise<Folder | null> => {
    await connectDB();
    const folder = await FolderModel.findOne({ _id: id });
    if (!folder) {
        return null;
    }
    return formatFolder(folder.toJSON());
}

export const queryFolder = async (): Promise<Folder[]> => {
    await connectDB();
    const result = await FolderModel.find();
    return result.map(r => r.toJSON()).map(r => {
        return formatFolder(r);
    });
}

export const updateFolder = async (Folder: Folder): Promise<string> => {
    await connectDB();
    await FolderModel.findByIdAndUpdate(Folder.id, {
        name: Folder.name,
    });
    return Folder.id;
}

export const deleteFolder = async (id: string): Promise<string> => {
    await connectDB();
    await FolderModel.findByIdAndDelete(id);
    return id;
}

function formatFolder(Folder: IFolder): Folder {
    return {
        id: Folder.id,
        name: Folder.name,
    }
}
