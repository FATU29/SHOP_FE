import { Box, Button, IconButton, Modal, ModalProps, styled, Tooltip, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";




interface TGridEdit {
    onClick?: () => void,
    disabled?:boolean
}



export const AddButton: NextPage<TGridEdit> = (props : TGridEdit) => {

    const { t } = useTranslation();
    const {onClick,disabled} = props
    const theme = useTheme();

    return (
        <>
            <Tooltip title={t("Add")}>
                <IconButton disabled={disabled} onClick={onClick} sx={{
                    backgroundColor:theme.palette.primary.main,
                    color:theme.palette.common.white
                }}>
                    <IconifyIcon icon={"gg:add"}></IconifyIcon>
                </IconButton>
            </Tooltip>
        </>
    )
}

export default AddButton;