import { StarBorder } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListItemTextProps, ListSubheader, styled, useTheme } from "@mui/material";
import IconifyIcon from "src/components/Icon";
import { NextPage } from "next";
import { TVertical, VerticalItem } from "src/configs/layout";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { env } from "process";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import { useAuth } from "src/hooks/useAuth";

type TProps = {
    open: boolean
};

type TRecursionListItem = {
    data: any[],
    level: number,
    openItem: any,
    toggleDrawer: any,
    checkDisable: boolean,
    activePath: string | null,
    setActivePath: React.Dispatch<React.SetStateAction<string | null>>
}

interface TListItemText extends ListItemTextProps {
    active: boolean
}


const StyledListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => {
    return (
        {
            "& .MuiListItemText-primary": {
                color: active ? theme.palette.common.white : theme.palette.common.black,
            }
        }
    )
}
)

const RecursionListItem = ({ data, level, openItem, toggleDrawer, checkDisable, activePath, setActivePath }: TRecursionListItem) => {


    const theme = useTheme();
    const router = useRouter();

    const handleSelectItem = (path: string) => {
        setActivePath(path);
        if (path) {
            router.push(path);
        }
    }
    const isParentHaveChildActive = (item: TVertical): boolean => {
        if (!item.childrens) {
            return item.path === activePath;
        }

        return item.childrens.some((child: any) => isParentHaveChildActive(child));
    };




    return (
        <>
            {Array.isArray(data) && data.map((item) => {

                const isParentActive = isParentHaveChildActive(item);

                return <React.Fragment key={item?.title}>
                    <ListItemButton sx={{
                        paddingLeft: `${level * 10 + 10}px`,
                        backgroundColor: (activePath && item.path === activePath) || !!openItem[item.title] || isParentActive ? theme.palette.primary.main : theme.palette.background.paper,
                    }} onClick={() => {
                        if (item.childrens) {
                            if (checkDisable === false) {
                                return;
                            }
                            toggleDrawer(item?.title)
                        }
                    }}>
                        <ListItemIcon>
                            <IconifyIcon color={(activePath && item.path === activePath) || !!openItem[item.title] || isParentActive ? theme.palette.common.white : theme.palette.common.black} icon={item?.icon} ></IconifyIcon>
                        </ListItemIcon>
                        <StyledListItemText sx={{
                            color: (activePath && item.path === activePath) || !!openItem[item.title] || isParentActive ? theme.palette.common.white : theme.palette.common.black,
                        }}
                            onClick={() => {
                                if (item.path) {
                                    handleSelectItem(item.path)
                                }
                            }}
                            primary={item?.title}
                            active={(activePath && item.path === activePath) || !!openItem[item.title] || isParentActive} />
                        {checkDisable === true && item.childrens && item.childrens.length > 0 && (
                            openItem[item?.title] ? (
                                <IconifyIcon icon="ic:sharp-expand-less"></IconifyIcon>
                            ) : (
                                <IconifyIcon icon="ic:round-expand-more"></IconifyIcon>
                            )
                        )}
                    </ListItemButton>

                    {checkDisable === true && item.childrens && item.childrens.length > 0 && (
                        <Collapse in={openItem[item?.title]} timeout="auto" unmountOnExit>
                            <RecursionListItem
                                data={item.childrens}
                                level={level + 1}
                                openItem={openItem}
                                toggleDrawer={toggleDrawer}
                                checkDisable={checkDisable}
                                activePath={activePath}
                                setActivePath={setActivePath}
                            />
                        </Collapse>
                    )}
                </React.Fragment>
            })}
        </>
    );
};

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [activePath, setActivePath] = useState<string | null>("");
    const [openItem, setOpenItem] = useState<{ [key: string]: boolean }>({});


    const router = useRouter();
    const auth = useAuth();

    const permissionUser: string[] = auth?.user?.role?.permissions ? (auth?.user?.role?.permissions.includes(CONFIG_PERMISSIONS.BASIC) ?
    [CONFIG_PERMISSIONS.DASHBOARD] : auth?.user?.role?.permissions) : [];



    const toggleDrawer = (key: string): void => {
        setOpenItem((prevOpen) => ({
            // ...prevOpen,
            [key]: !prevOpen[key],
        }));
    };

    const findParentActivePath = (items: TVertical[], activePath: string): string => {
        for (let item of items) {
            if (item.path === activePath) {
                return item.title;
            }
            if (item?.childrens && item.childrens.length > 0) {
                const child: any = findParentActivePath(item?.childrens, activePath);
                if (child) {
                    return item.title
                }
            }
        }
        return "";
    }

    const hasPermission = (item: any, permissionUser: string[]) => {
        return permissionUser.includes(item.permission) || !item.permission;
    }

    const formatMenuByPermission = (menu: any[], permissionUser: string[]) => {
        if (menu) {
            return menu.filter((item) => {
                if (hasPermission(item, permissionUser)) {
                    if (item.childrens && item.childrens.length > 0) {
                        item.childrens = formatMenuByPermission(item.childrens, permissionUser);
                    }

                    if(!item?.childrens?.length){
                        return false;
                    }
                    return true;
                }
                return false;
            })
        }


        return [];
    }

    const memoFormatMenu = useMemo(() => {
        if (permissionUser.includes(CONFIG_PERMISSIONS.ADMIN)) {
            return VerticalItem
        }
        return formatMenuByPermission(VerticalItem, permissionUser)
    }, [VerticalItem, permissionUser])

    useEffect(() => {
        if (router.asPath) {
            const parentTitle = findParentActivePath(VerticalItem, router.asPath)
            setOpenItem({
                [parentTitle]: true
            })
            setActivePath(router.asPath)
        }

    }, [router.asPath])

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Nested List Items
            //     </ListSubheader>
            // }
            >
                <RecursionListItem
                    data={VerticalItem}
                    level={0}
                    openItem={openItem}
                    toggleDrawer={toggleDrawer}
                    checkDisable={open}
                    activePath={activePath}
                    setActivePath={setActivePath}
                />
            </List>
        </>
    );
};

export default ListVerticalLayout;
