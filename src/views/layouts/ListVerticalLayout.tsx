import { StarBorder } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListItemTextProps, ListSubheader, styled, useTheme } from "@mui/material";
import IconifyIcon from "src/components/Icon";
import { NextPage } from "next";
import { VerticalItem } from "src/configs/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { env } from "process";

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

    const handleSelectItem = (path: string) => {
        setActivePath(path);
        if (path) {
            router.push(path);
        }
    }

    const theme = useTheme();
    const router = useRouter();

    return (
        <>
            {Array.isArray(data) && data.map((item) => (
                <React.Fragment key={item?.title}>
                    <ListItemButton sx={{
                        paddingLeft: `${level * 10 + 10}px`,
                        backgroundColor: (activePath && item.path === activePath) || openItem[item.title] === true ? theme.palette.primary.main : theme.palette.background.paper,
                    }} onClick={() => {
                        if (item.childrens) {
                            if (checkDisable === false) {
                                return;
                            } else {
                                toggleDrawer(item?.title)
                            }
                        }
                    }}>
                        <ListItemIcon>
                            <IconifyIcon color={(activePath && item.path === activePath) ? theme.palette.common.white : theme.palette.common.black} icon={item?.icon} ></IconifyIcon>
                        </ListItemIcon>
                        <StyledListItemText sx={{
                            color: (activePath && item.path === activePath) || openItem[item.title] === true ? theme.palette.common.white : theme.palette.common.black,
                        }}
                            onClick={() => { handleSelectItem(item.path) }}
                            primary={item?.title}
                            active={(activePath && item.path === activePath) || openItem[item.title] === true} />
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
            ))}
        </>
    );
};

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [activePath, setActivePath] = useState<string | null>("");
    const [openItem, setOpenItem] = useState<{ [key: string]: boolean }>({});
    const toggleDrawer = (key: string): void => {
        setOpenItem((prevOpen) => ({
            // ...prevOpen,
            [key]: !prevOpen[key],
        }));
    };

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
