import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from 'src/components/custom-modal';
import IconifyIcon from 'src/components/Icon';
import CustomTextField from 'src/components/text-field';
import { AppDispatch, RootState } from 'src/stores';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PASSWORD_REG } from 'src/configs/regex';
import { createRoleAction, updateRoleAction } from 'src/stores/role/action';
import { getDetailRole } from 'src/services/role';
import FallbackSpinner from 'src/components/fall-back';


interface TCreateEditRole {
    open: boolean,
    onClose: () => void,
    idRole?: string
}




const CreateEditModal = (props: TCreateEditRole) => {

    const [isLoading, setLoading] = React.useState<boolean>(false);

    const { roles } = useSelector((state: RootState) => state.role);
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();


    const { open, onClose, idRole } = props;



    const schema = yup
        .object({
            name: yup.string().required(`${t("required field")}`),
        })
        .required()

    const { handleSubmit, control , reset, formState: { errors } } = useForm({
        defaultValues: {
            name: ""
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })



    const onSubmit = (data: { name: string }) => {
        if (!Object.keys(errors).length) {
            if (idRole) {
                console.log(idRole)
                dispatch(updateRoleAction({ name: data?.name, id:idRole }))
            } else {
                dispatch(createRoleAction({ name: data?.name }))
            }
        }
    }


    const fetchDetailsRole = async (id:string) => {
        setLoading(true);
        const res = await getDetailRole(id);
        const data = res.data;
        if(data){
            reset({
                name:data.name
            })
        }
        setLoading(false);
    }

    React.useEffect(() => {
        if(!open){
            reset({
                name:""
            })
        } else if(open && idRole){
            fetchDetailsRole(idRole)
        }
    },[open,idRole])


    return (
        <>
            {isLoading ?? <FallbackSpinner></FallbackSpinner>}
            <CustomModal onClose={onClose} open={open}>
                <Box sx={{
                    position: "relative",
                }
                }
                    minWidth={
                        {
                            md: "350px",
                            xs: "auto"
                        }
                    }
                >
                    <Box sx={{
                        position: "absolute",
                        right: -50,
                        top: -50
                    }}>
                        <IconButton onClick={() => {
                            onClose();
                        }}>
                            <IconifyIcon fontSize={"2rem"} icon={"carbon:close-outline"}></IconifyIcon>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: 5
                    }}>
                        <Box>
                            <Typography variant='h4' sx={{
                                fontWeight: 600
                            }}>{t("Edit roles")}</Typography>
                        </Box>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        onBlur={onBlur}
                                        error={Boolean(errors?.name)}
                                        onChange={onChange}
                                        placeholder={t("Enter name role")}
                                        type={"text"}
                                        value={value}
                                        label={t("Name role")}
                                        fullWidth
                                        required
                                        margin="normal"
                                        helperText={errors?.name?.message}
                                    ></CustomTextField>

                                )}
                                name="name"
                            />


                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}>
                                <Button type="submit" variant="contained" size="large">
                                    {idRole === "" ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>

                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditModal;