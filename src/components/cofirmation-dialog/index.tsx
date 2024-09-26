import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NextPage } from 'next';
import { AppDispatch } from 'src/stores';
import { useDispatch } from 'react-redux';
import { deleteRoleAction } from 'src/stores/role/action';
import { useTranslation } from 'react-i18next';
import IconifyIcon from '../Icon';
import { Box } from '@mui/material';




type TProps = {
    open: any,
    onClose: () => void,
    title:string,
    description:string,
    handleAction: () => void
}


export const CofirmDialog: NextPage<TProps> = ({ open, onClose,title,description , handleAction}) => {

    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();


 

    return (
        <React.Fragment>
            <Dialog
                open={open.open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{
                    textAlign:"center",
                    fontSize: "30px",
                }} id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <Box sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <IconifyIcon fontSize={"60px"} color='#fd5858' icon={"jam:alert"}></IconifyIcon>
                </Box>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{t("Disagree")}</Button>
                    <Button onClick={() => {
                        handleAction();
                        onClose();
                    }} autoFocus>
                        {t("Agree")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default CofirmDialog;