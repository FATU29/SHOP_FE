"use client"

import { Box, CSSObject, Divider, IconButton, styled, Theme, Toolbar } from "@mui/material"
import { NextPage } from "next"
import MuiDrawer from '@mui/material/Drawer';
import IconifyIcon from "src/components/Icon";
import ListVerticalLayout from "./ListVerticalLayout";

type TProps = {
    open: boolean,
    toggleDrawer: () => void
}

const drawerWidth: number = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
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
    width: 0, // Đặt width về 0 khi đóng Drawer
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`, // Giữ nguyên width cho màn hình lớn
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
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

const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
    return (
        <>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <IconifyIcon icon="tabler:arrow-left"></IconifyIcon>
                    </IconButton>
                </Toolbar>
                <Divider />
                <ListVerticalLayout open={open} />
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
            </Box>
        </>
    )
}

export default VerticalLayout;
