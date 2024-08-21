import { Box, Button, IconButton, Modal, ModalProps, styled, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";




interface TGridEdit { 
    onClick?: () => void,
    disabled?:boolean
}

export const EditButton: NextPage<TGridEdit> = (props:TGridEdit) => {

    const { t } = useTranslation();
    const {onClick,disabled} = props

    return (
        <>
                <Tooltip title={t("Edit")}>
                    <IconButton disabled={disabled} onClick={onClick}>
                        <IconifyIcon icon={"uil:edit"}></IconifyIcon>
                    </IconButton>
                </Tooltip>
        </>
    )
}

export default EditButton;