import * as React from 'react';
import List from '@mui/material/List';
import SideBarButton from './button/SideBarButton';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CreateFolderDialog from './dialog/CreateFolderDialog';
import { useSnackbar } from './toast/SnackBar';
import { useLoadingState } from '@/hooks/useLoadingState';
import { Folder } from '@/validators/folder';

interface FolderListProp {
    open: boolean
    folders: Folder[]
}

export default function FolderList({ open, folders }: FolderListProp) {

    const [tempFolders, setTempFolders] = React.useState(folders);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar();
    const { loading, toggleLoading } = useLoadingState();

    const handleAdd = async () => {
        if (inputValue.trim()) {
            const response = await fetch('/api/folder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputValue,
                }),
            });
            if (!response.ok) {
                openErrorSnackbar("Create error");
                toggleLoading();
                return;
            }
            const res = await response.json();
            setTempFolders(prevTodos => [...prevTodos, res.data]);
            setInputValue('');
            openSuccessSnackbar("Create success");
            setOpenDialog(false);
        }
        toggleLoading();
    }

    return <List>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
            {open && <CreateFolderDialog {...{
                openDialog,
                setOpenDialog,
                inputValue,
                setInputValue,
                loading,
                toggleLoading,
                handleAdd,
            }} />}
            {!open && <CreateNewFolderIcon />}
        </Box>
        {tempFolders.map(r => {
            return <SideBarButton key={r.id} text={r.name} open={open} >
                <FolderIcon />
            </SideBarButton>
        })}
    </List>
}
