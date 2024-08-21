import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import IconifyIcon from "../../../../components/Icon";
import { useAuth } from "src/hooks/useAuth";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ROUTE_CONFIG } from "src/configs/route";
import { toFullName } from "src/utils";


type TProps = {}





const UserDropDown: NextPage<TProps> = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, logout } = useAuth();
    const router = useRouter();
    const { t, i18n } = useTranslation();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateMyProfile = () => {
        router.push(ROUTE_CONFIG.MY_PROFILE);
        handleClose();
    }

    const handleNavigateChangePassword = () => {
        router.push(ROUTE_CONFIG.CHANGE_PASSWORD);
        handleClose();
    }

    const handleNavigateManageSystem = () => {
        router.push(ROUTE_CONFIG.DASHBOARD);
        handleClose();
    }


    return (
        <>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title={t('Account')}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            {user?.avatar ?
                                (<>
                                    <Avatar sx={{
                                        width: "40px",
                                        height: "40px"
                                    }} src={user?.avatar || "/broken-image.jpg"}></Avatar>

                                </>) :
                                (<>
                                    <Avatar sx={{
                                        width: "40px",
                                        height: "40px"
                                    }} src="/broken-image.jpg"></Avatar>
                                </>)}
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
                            p: 3,
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
                    <Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 3
                        }}>
                            <Box>
                                {user?.avatar ?
                                    (<>
                                        <Avatar sx={{
                                            width: "40px",
                                            height: "40px"
                                        }} src={user?.avatar || "/broken-image.jpg"}></Avatar>

                                    </>) :
                                    (<>
                                        <Avatar sx={{
                                            width: "40px",
                                            height: "40px"
                                        }} src="/broken-image.jpg"></Avatar>
                                    </>)}
                            </Box>
                            <Box sx={{
                                textAlign: "center"
                            }}>
                                <Typography>{user?.email || ""}</Typography>
                                <Typography>{toFullName(user?.lastName || "", user?.middleName || "", user?.firstName || "", i18n.language)}</Typography>
                            </Box>

                        </Box>
                    </Box>
                    <Divider sx={
                        {
                            mt: 3,
                            mb: 3
                        }
                    }></Divider>
                      <MenuItem onClick={handleNavigateManageSystem}>
                        <ListItemIcon>
                            <IconifyIcon icon="grommet-icons:system"></IconifyIcon>
                        </ListItemIcon>
                        <Typography>{t("Manage System")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleNavigateMyProfile}>
                        <ListItemIcon>
                            <IconifyIcon icon="iconamoon:profile"></IconifyIcon>
                        </ListItemIcon>
                        <Typography>{t("My Profile")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleNavigateChangePassword}>
                        <ListItemIcon>
                            <IconifyIcon icon="mdi:password-outline"></IconifyIcon>
                        </ListItemIcon>
                        {t("Change password")}
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {t("Logout")}
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </>
    )
}


export default UserDropDown;