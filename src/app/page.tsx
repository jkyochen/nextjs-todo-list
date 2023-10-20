import TodoList from '@/components/TodoList';
import Layout from '@/components/Layout/Layout'
import { queryTodo } from '@/models/todo';
import { queryFolder } from '@/models/folder';
import { DEFAULT_FOLDER } from '@/constants';

export default async function Home() {
  const todos = await queryTodo({
    folderId: DEFAULT_FOLDER,
  });
  const folders = await queryFolder();
  return <Layout folders={folders}>
    <TodoList folderId={DEFAULT_FOLDER} todos={todos} />
  </Layout >
}
