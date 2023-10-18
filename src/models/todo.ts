import { connectDB } from '@/db/mongodb';
import { Todo } from '@/types/todo';
import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
    content: string;
    isDone: boolean;
}

const TodoSchema: Schema = new Schema({
    content: { type: String, required: true },
    isDone: { type: Boolean, default: false },
});

TodoSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});
TodoSchema.set('toJSON', {
    virtuals: true,
});

const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

export const createTodo = async (content: string): Promise<Todo> => {
    await connectDB();
    const todo = new Todo({
        content,
    });
    const result = await todo.save();
    return formatTodo(result);
}

export const getTodo = async (id: string): Promise<ITodo | null> => {
    await connectDB();
    const todo = await Todo.findOne({ _id: id });
    return todo ? todo.toJSON() as ITodo : null;
}

export const queryTodo = async (): Promise<Todo[]> => {
    await connectDB();
    const result = await Todo.find();
    return result.map(r => r.toJSON()).map(r => {
        return formatTodo(r);
    });
}

export const updateTodo = async (id: string, content: string, isDone: boolean): Promise<string> => {
    await connectDB();
    await Todo.findByIdAndUpdate(id, { content, isDone });
    return id;
}

export const deleteTodo = async (id: string): Promise<string> => {
    await connectDB();
    await Todo.findByIdAndDelete(id);
    return id;
}

function formatTodo(todo: ITodo) {
    return {
        id: todo.id,
        content: todo.content,
        isDone: todo.isDone,
    }
}
