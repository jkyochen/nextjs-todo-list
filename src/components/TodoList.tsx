import * as React from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { Todo } from '@/types/todo';

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const fetchTodos = async () => {
    const resp = await fetch("/api/todo");
    const { data } = await resp.json();
    setTodos(data);
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

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
      if (response.ok) {
        fetchTodos();
        setInputValue('');
      }
    }
  }

  const handleToggle = (id: string) => async () => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.isDone = !updatedTodo.isDone;

      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        fetchTodos();
      }
    }
  };

  const handleEdit = (id: string) => async (e: any) => {
    const updatedTodo = todos.find(todo => todo.id === id);
    if (updatedTodo) {
      updatedTodo.content = e.target.value;

      const response = await fetch(`/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (response.ok) {
        fetchTodos();
      }
    }
  }

  const handleDelete = (id: string) => () => {
    setTodos(todos.filter(r => r.id !== id));
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
          <Button onClick={handleAdd} variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      {todos.map(todo => (
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