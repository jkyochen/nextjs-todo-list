import { styled } from "@mui/material";
import React from "react";

const InnerDrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface DrawerHeaderProp {
    children?: React.ReactNode
}

export default function DrawerHeader({ children }: DrawerHeaderProp) {
    return <InnerDrawerHeader>
        {children}
    </InnerDrawerHeader>
}
