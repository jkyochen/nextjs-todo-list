"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import SideBar from './SideBar';
import SpaceHeader from './SpaceHeader';
import { SnackbarProvider } from '../toast/SnackBar';
import { Folder } from '@/validators/folder';
import Body from './Body';

interface LayoutProp {
  folders: Folder[]
  children: React.ReactNode
}

export default function Layout({ folders, children }: LayoutProp) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SnackbarProvider>
        <SideBar open={open} folders={folders} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <SpaceHeader />
          <Body>
            {children}
          </Body>
        </Box>
      </SnackbarProvider>
    </Box>
  );
}