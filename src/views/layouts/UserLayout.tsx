import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { mainListItems, secondaryListItems } from './listItems';
import { NextPage } from 'next';
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}




type TProps = {
    children: React.ReactNode
}

const UserLayout: NextPage<TProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                    <HorizontalLayout open={open} toggleDrawer={toggleDrawer} isHidden={false}></HorizontalLayout>
                    <VerticalLayout open={open} toggleDrawer={toggleDrawer}></VerticalLayout>
            </Box>
            {children}
        </>
    );
}

export default UserLayout;

