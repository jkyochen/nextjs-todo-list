import TodoList from '@/components/TodoList';
import Layout from '@/components/Layout/Layout'
import { queryTodo } from '@/models/todo';
import { getFolder, queryFolder } from '@/models/folder';

export default async function FolderHome({ params }: { params: { id: string } }) {
  const todos = await queryTodo({
    folderId: params.id,
  });
  const folder = await getFolder(params.id);
  const folders = await queryFolder();
  return <Layout folders={folders}>
    <TodoList folderId={params.id} folderName={folder?.name} todos={todos} />
  </Layout >
}
