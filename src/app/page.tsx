import TodoList from '@/components/TodoList';
import Layout from '@/components/Layout'
import { Container } from '@mui/material';
import { queryTodo } from '@/models/todo';

export default async function Home() {
  const todos = await queryTodo();
  return <Layout>
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
