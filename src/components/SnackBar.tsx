"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface SnackbarContextProps {
    openSuccessSnackbar: (message: string) => void;
    openErrorSnackbar: (message: string) => void;
    closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }: SnackbarProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const openSuccessSnackbar = useCallback((message: string) => {
        setMessage(message);
        setIsOpen(true);
        setSeverity("success");
    }, []);

    const openErrorSnackbar = useCallback((message: string) => {
        setMessage(message);
        setIsOpen(true);
        setSeverity("error");
    }, []);

    const closeSnackbar = useCallback(() => {
        setIsOpen(false);
        setMessage('');
    }, []);

    return (
        <SnackbarContext.Provider value={{ openSuccessSnackbar, openErrorSnackbar, closeSnackbar }}>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={isOpen}
                autoHideDuration={1000}
                onClose={closeSnackbar}
            >
                <MuiAlert elevation={6} variant="filled" onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }} >
                    {message}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): SnackbarContextProps => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
