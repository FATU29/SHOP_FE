import { Box, Button, IconButton, Modal, ModalProps, styled, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";




interface TGridEdit { 
    onClick?: () => void,
    disabled?:boolean
}

export const DeleteButton: NextPage<TGridEdit> = (props: TGridEdit) => {

    const { t } = useTranslation();
    const {onClick,disabled} = props

    return (
        <>
                <Tooltip title={t("Delete")}>
                    <IconButton disabled={disabled} onClick={onClick}>
                        <IconifyIcon icon={"material-symbols:delete-outline"}></IconifyIcon>
                    </IconButton>
                </Tooltip>
        </>
    )
}

export default DeleteButton;