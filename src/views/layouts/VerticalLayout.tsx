"use client"

import { Box, Collapse, Container, CSSObject, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, Theme, Toolbar } from "@mui/material"
import { NextPage } from "next"
import { mainListItems, secondaryListItems } from "./listItems"
import MuiDrawer from '@mui/material/Drawer';
import { ExpandLess, StarBorder } from "@mui/icons-material";
import IconifyIcon from "src/components/Icon";
import ListVerticalLayout from "./ListVerticalLayout";
import { useEffect, useState } from "react";


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
    width: `calc(${theme.spacing(12)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(10)} + 1px)`,
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
                <ListVerticalLayout open={open}></ListVerticalLayout>
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