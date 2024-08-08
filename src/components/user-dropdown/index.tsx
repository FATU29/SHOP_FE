import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import IconifyIcon from "../Icon";
import { useAuth } from "src/hooks/useAuth";
import Image from "next/image";


type TProps = {}



const UserDropDown: NextPage<TProps> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user,logout } = useAuth();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {

    },[user])

    return (
        <>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                {user?.avatar ? <Image
                                    alt="avatar"
                                    src={user?.avatar || ""}
                                    style={{
                                        height: "auto",
                                        width: "auto"
                                    }}
                                ></Image> : <IconifyIcon icon={"solar:user-outline"}></IconifyIcon>}

                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        {user?.email || ""}
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </>
    )
}


export default UserDropDown;