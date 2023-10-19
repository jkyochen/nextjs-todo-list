"use client";

import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TodayIcon from '@mui/icons-material/Today';
import SideBarButton from '../button/SideBarButton';
import SpaceHeader from './SpaceHeader';
import { DRAWER_WIDTH } from '@/constants';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CreateFolderDialog from '../dialog/CreateFolderDialog';
import { Folder } from '@/validators/folder';
import { useSnackbar } from '../toast/SnackBar';
import { useLoadingState } from '@/hooks/useLoadingState';

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface SideBarProp {
    open: boolean
    folders: Folder[]
    handleDrawerClose: () => void
}

export default function SideBar({ open, folders, handleDrawerClose }: SideBarProp) {

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

    return <Drawer variant="permanent" open={open}>
        <SpaceHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </SpaceHeader>
        <Divider />
        <List>
            <SideBarButton text={"Default"} open={open} >
                <TodayIcon />
            </SideBarButton>
        </List>
        <Divider />
        <List>
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
    </Drawer >
}
