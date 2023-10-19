"use client";

import * as React from 'react';
import List from '@mui/material/List';
import { Box, Divider, Grid, TextField } from '@mui/material';
import TodoItem from './TodoItem';
import { Todo } from '@/validators/todo';
import { useSnackbar } from './SnackBar';
import ProgressButton from './ProgressButton';
import { useLoadingState } from '@/hooks/useLoadingState';

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [tempTodos, setTempTodos] = React.useState(todos);
  const [inputValue, setInputValue] = React.useState('');
  const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar();
  const { loading, toggleLoading } = useLoadingState();

  const handleAdd = async () => {
    if (inputValue.trim()) {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: inputValue,
        }),
      });
      if (!response.ok) {
        openErrorSnackbar("Create error");
        toggleLoading();
        return;
      }
      const res = await response.json();
      setTempTodos(prevTodos => [...prevTodos, res.data]);
      setInputValue('');
      openSuccessSnackbar("Create success");
    }
    toggleLoading();
  }

  const handleToggle = (id: string) => async () => {
    const updatedTodo = tempTodos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.isDone = !updatedTodo.isDone;

      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        openErrorSnackbar("Toggle error");
        return;
      }
      setTempTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
      openSuccessSnackbar("Toggle success");
    }
  };

  const handleEdit = (id: string) => async (content: string) => {
    const updatedTodo = tempTodos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.content = content;

      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        openErrorSnackbar("Edit error");
        return;
      }
      setTempTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
      openSuccessSnackbar("Edit success");
    }
  }

  const handleDelete = (id: string) => async () => {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      openErrorSnackbar("Delete error");
      return;
    }
    setTempTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    openSuccessSnackbar("Delete success");
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <List sx={{
      width: '100%',
      maxWidth: 460,
      bgcolor: 'background.paper',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: 2,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label=""
            id="todoInput"
            placeholder='Add your todo.'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ marginY: 1 }}
            inputProps={{ autoComplete: 'off' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Box onClick={handleAdd}>
            <ProgressButton loading={loading} toggleLoading={toggleLoading} >Add</ProgressButton>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      {tempTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </List>
  );
}