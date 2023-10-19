import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

interface ProgressButtonProp {
  loading: boolean
  toggleLoading: () => void
  children: React.ReactNode
}

export default function ProgressButton({ loading, toggleLoading, children }: ProgressButtonProp) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        fullWidth
        variant="contained"
        disabled={loading}
        onClick={toggleLoading}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}
