"use client";

import TodoList from '@/components/TodoList';
import Layout from '@/components/Layout'
import styles from './page.module.css'
import { Container, Typography } from '@mui/material';

export default function Home() {
  return <Layout>
    <Container maxWidth="sm" sx={{
      marginY: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      <Typography variant="h1" component="h4" marginBottom={2}>
        To-do List
      </Typography>
      <TodoList />
    </Container>
  </Layout >
}
