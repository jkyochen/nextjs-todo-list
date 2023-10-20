"use client";

import { styled } from '@mui/material/styles';
import React from "react";

const InnerSpaceHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface SpaceHeaderProp {
    children?: React.ReactNode
}

export default function SpaceHeader({ children }: SpaceHeaderProp) {
    return <InnerSpaceHeader>
        {children}
    </InnerSpaceHeader>
}
