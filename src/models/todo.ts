import { connectDB } from '@/db/mongodb';
import { CreateTodo, QueryTodo, Todo } from '@/validators/todo';
import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
    content: string;
    isDone: boolean;
    folderId: string;
}

const TodoSchema: Schema = new Schema({
    content: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    folderId: { type: String, required: true },
});

TodoSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});
TodoSchema.set('toJSON', {
    virtuals: true,
});

const TodoModel = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export const createTodo = async (newTodo: CreateTodo): Promise<Todo> => {
    await connectDB();
    const todo = new TodoModel(newTodo);
    const result = await todo.save();
    return formatTodo(result);
}

export const getTodo = async (id: string): Promise<Todo | null> => {
    await connectDB();
    const todo = await TodoModel.findOne({ _id: id });
    if (!todo) {
        return null;
    }
    return formatTodo(todo.toJSON());
}

export const queryTodo = async (q?: QueryTodo): Promise<Todo[]> => {
    await connectDB();
    let result;
    if (q?.folderId) {
        result = await TodoModel.find({
            folderId: q.folderId,
        });
    } else {
        result = await TodoModel.find();
    }
    return result.map(r => r.toJSON()).map(r => {
        return formatTodo(r);
    });
}

export const updateTodo = async (todo: Todo): Promise<string> => {
    await connectDB();
    await TodoModel.findByIdAndUpdate(todo.id, {
        content: todo.content,
        isDone: todo.isDone,
    });
    return todo.id;
}

export const deleteTodo = async (id: string): Promise<string> => {
    await connectDB();
    await TodoModel.findByIdAndDelete(id);
    return id;
}

function formatTodo(todo: ITodo): Todo {
    return {
        id: todo.id,
        content: todo.content,
        isDone: todo.isDone,
        folderId: todo.folderId,
    };
}
