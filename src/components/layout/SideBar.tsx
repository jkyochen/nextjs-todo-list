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
import { Folder } from '@/validators/folder';
import FolderList from '../FolderList';
import Link from 'next/link';

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

    return <Drawer variant="permanent" open={open}>
        <SpaceHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </SpaceHeader>
        <Divider />
        <List>
            <SideBarButton text={"Default"} open={open} href={"/"} >
                <TodayIcon />
            </SideBarButton>
        </List>
        <Divider />
        <FolderList {...{ open, folders }} />
    </Drawer >
}
