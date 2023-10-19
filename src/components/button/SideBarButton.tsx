import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface SideBarButtonProp {
    text: string
    open: boolean
    children: React.ReactNode
}

export default function SideBarButton({ text, open, children }: SideBarButtonProp) {
    return <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
            >
                {children}

            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
    </ListItem>
}
