import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '@/styles/TodoItem.module.css';
import { TextField } from '@mui/material';
import useOnClickOutside from 'use-onclickoutside';
import { Todo } from '@/types/todo';
import clsx from 'clsx';

interface TodoItemProps {
    todo: Todo;
    handleDelete: (id: string) => () => void;
    handleToggle: (id: string) => () => void;
    handleEdit: (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({ todo, handleDelete, handleToggle, handleEdit }: TodoItemProps) {
    const [editing, setEditing] = React.useState(false);
    const labelId = `checkbox-list-label-${todo.id}`;
    const ref = React.useRef(null);
    useOnClickOutside(ref, () => finishEdit());

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            finishEdit();
        }
    }

    const finishEdit = () => {
        setEditing(false);
        (document.activeElement as HTMLElement)?.blur();
    }

    return (
        <ListItem
            key={todo.id}
            secondaryAction={
                <IconButton edge="start" aria-label="delete" onClick={handleDelete(todo.id)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onDoubleClick={() => { setEditing(true) }} dense>
                <ListItemIcon onClick={handleToggle(todo.id)}>
                    <Checkbox
                        edge="start"
                        checked={todo.isDone}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                {editing && <TextField
                    id="standard-basic"
                    label=""
                    variant="standard"
                    fullWidth
                    autoFocus
                    ref={ref}
                    value={todo.content}
                    onChange={handleEdit(todo.id)}
                    onKeyDown={handleEnter}
                    autoComplete="off" />}
                {!editing && <ListItemText id={labelId} primary={todo.content} className={clsx({
                    [styles.done]: todo.isDone,
                })} />}
            </ListItemButton>
        </ListItem >
    );
}