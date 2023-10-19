import TodoList from '@/components/TodoList';
import Layout from '@/components/layout/Layout'
import { queryTodo } from '@/models/todo';
import { queryFolder } from '@/models/folder';

export default async function FolderHome({ params }: { params: { id: string } }) {
  const todos = await queryTodo({
    folderId: params.id,
  });
  const folders = await queryFolder();
  return <Layout folders={folders}>
    <TodoList folderId={params.id} todos={todos} />
  </Layout >
}
