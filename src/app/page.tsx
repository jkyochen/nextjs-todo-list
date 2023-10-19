import TodoList from '@/components/TodoList';
import Layout from '@/components/layout/Layout'
import { Container } from '@mui/material';
import { queryTodo } from '@/models/todo';
import { queryFolder } from '@/models/folder';

export default async function Home() {
  const todos = await queryTodo();
  const folders = await queryFolder();
  return <Layout folders={folders}>
    <Container maxWidth="sm" sx={{
      marginY: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <h1>To-do List</h1>
      <TodoList todos={todos} />
    </Container>
  </Layout >
}
