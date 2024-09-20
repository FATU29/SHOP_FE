import { Box, Modal, ModalProps, styled, Typography } from "@mui/material";
import { NextPage } from "next";
import React from "react";




interface TCustomModal extends ModalProps {}




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    height: "auto",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius:"10px",
    boxShadow: 24,
    p: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};



export const CustomModal: NextPage<TCustomModal> = ({ children, onClose, open,...rest }) => {
    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} {...rest}>
                    {children}
                </Box>
            </Modal>
        </>
    )
}

export default CustomModal;