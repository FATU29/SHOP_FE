import { StarBorder } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import IconifyIcon from "src/components/Icon";
import { NextPage } from "next";
import { VerticalItem } from "src/configs/layout";
import React, { useState } from "react";

type TProps = {
    open: boolean
};

type TRecursionListItem = {
    data: any[],
    level: number,
    openItem: any,
    toggleDrawer: any,
    checkDisable: boolean

}

const RecursionListItem = ({ data, level, openItem, toggleDrawer, checkDisable }: TRecursionListItem) => {
    return (
        <>
            {Array.isArray(data) && data.map((item) => (
                <React.Fragment key={item?.title}>
                    <ListItemButton sx={{
                        paddingLeft: `${level * 10 + 10}px`
                    }} onClick={() => {
                        if (checkDisable === false) {
                            return;
                        } else {
                            toggleDrawer(item?.title)
                        }
                    }}>
                        <ListItemIcon>
                            <IconifyIcon icon={item?.icon}></IconifyIcon>
                        </ListItemIcon>
                        <ListItemText primary={item?.title} />
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
                            />
                        </Collapse>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [openItem, setOpenItem] = useState<{ [key: string]: boolean }>({});
    const toggleDrawer = (key: string): void => {
        setOpenItem((prevOpen) => ({
            ...prevOpen,
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

                />
            </List>
        </>
    );
};

export default ListVerticalLayout;
