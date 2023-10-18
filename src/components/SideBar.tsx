"use client";

import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TodayIcon from '@mui/icons-material/Today';
import SideBarButton from './SideBarButton';
import DrawerHeader from './DrawerHeader';
import { DRAWER_WIDTH } from '@/constants';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CreateFolderDialog from './CreateFolderDialog';

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
    handleDrawerClose: () => void
}

export default function SideBar({ open, handleDrawerClose }: SideBarProp) {
    return <Drawer variant="permanent" open={open}>
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <SideBarButton text={"Default"} open={open} >
                <TodayIcon />
            </SideBarButton>
        </List>
        <Divider />
        <List>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
                {open && <CreateFolderDialog />}
                {!open && <CreateNewFolderIcon />}
            </Box>
            {Array.from({ length: 5 }).map((_, i) => {
                return <SideBarButton text={"Folder" + i} open={open} key={i} >
                    <FolderIcon />
                </SideBarButton>
            })}
        </List>
    </Drawer >
}
