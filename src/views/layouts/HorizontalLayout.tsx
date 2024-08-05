import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { NextPage } from 'next';
import IconifyIcon from 'src/components/Icon';



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.mode === "light" ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


type TProps = {
    open: boolean,
    toggleDrawer: () => void,
    isHidden: boolean
}

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHidden }) => {
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >

                    {isHidden && (
                        <>
                            <IconifyIcon icon="ic:round-menu" style={{
                                marginLeft: "5px"
                            }}></IconifyIcon>
                        </>
                    )}

                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <IconifyIcon icon="mingcute:notification-line"></IconifyIcon>
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default HorizontalLayout;