import TodoList from '@/components/TodoList';
import Layout from '@/components/layout/Layout'
import { queryTodo } from '@/models/todo';
import { queryFolder } from '@/models/folder';

export default async function Home() {
  const todos = await queryTodo();
  const folders = await queryFolder();
  return <Layout folders={folders}>
    <TodoList todos={todos} />
  </Layout >
}
