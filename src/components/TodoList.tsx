import * as React from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import { Divider, TextField } from '@mui/material';

const todoList: {
  id: number
  content: string
  isDone: boolean
}[] = [
    {
      id: 1,
      content: "example1",
      isDone: false,
    },
    {
      id: 2,
      content: "example2",
      isDone: true,
    },
  ];

export default function TodoList() {
  const [todos, setTodos] = React.useState(todoList);

  const handleToggle = (id: number) => () => {
    setTodos(todos.map(r => {
      if (r.id !== id) {
        return r;
      }
      return {
        ...r,
        isDone: !r.isDone,
      }
    }));
  };

  const handleAdd = (text: string) => () => {
    // setTodos(todos.filter(r => r.id !== id));
  }

  const handleDelete = (id: number) => () => {
    setTodos(todos.filter(r => r.id !== id));
  }

  const handleEdit = (id: number) => (e: any) => {
    setTodos(todos.map(r => {
      if (r.id !== id) {
        return r;
      }
      return {
        ...r,
        content: e.target.value,
      }
    }));
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
      <TextField
        fullWidth
        label=""
        id="todoInput"
        placeholder='Add your todo.'
        sx={{ marginY: 1 }}
        inputProps={{ autoComplete: 'off' }}
      />
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