"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import SideBar from './SideBar';
import DrawerHeader from './DrawerHeader';
import { SnackbarProvider } from './SnackBar';

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </Box>
    </Box>
  );
}