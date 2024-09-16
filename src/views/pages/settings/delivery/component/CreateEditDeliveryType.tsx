import { Box, Button, FormControlLabel, Grid, IconButton, Switch, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import IconifyIcon from 'src/components/Icon';
import CustomTextField from 'src/components/text-field';
import { AppDispatch, RootState } from 'src/stores';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import FallbackSpinner from 'src/components/fall-back';
import { createDeliveryTypeAction, updateDeliveryTypeAction } from 'src/stores/delivery-type/action';
import { getDetailDeliveryType } from 'src/services/delivery-type';
import CustomModal from 'src/components/custom-modal';


interface TCreateEditDeliveryType {
    open: boolean,
    onClose: () => void,
    idDeliveryType?: string,
}


type TDefaultValue = {
    name: string,
    price: number
}



const CreateEditDeliveryType = (props: TCreateEditDeliveryType) => {

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);


    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.deliveryType)


    const { open, onClose, idDeliveryType } = props;



    const defaultValues: TDefaultValue = {
        name: "",
        price: 1000
    }

    const schema = yup
        .object({
            name: yup.string().required("Name is a required field"),
            price: yup.number().required("Price is a required field"),

        })
        .required()

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })




    const onSubmit = async (data: any) => {
        if (!Object.keys(errors).length) {
            if (idDeliveryType) {
                dispatch(updateDeliveryTypeAction({
                    name: data?.name,
                    price: data?.price,
                    id: idDeliveryType
                }))
            } else {
                dispatch(createDeliveryTypeAction({
                    name: data?.name,
                    price: data?.price
                }))
            }
        }
    }



    const fetchDetailDeliveryType = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailDeliveryType(id);
        const data = res?.data;
        if (data) {
            reset({
                name: data?.name,
                price: data?.price
            })
        }
        setLoadingCheck(false);
    }



    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else if (open && idDeliveryType) {
            fetchDetailDeliveryType(idDeliveryType)
        }
    }, [open, idDeliveryType])



    return (
        <>
            {(isLoading || isLoadingCheck) && <FallbackSpinner></FallbackSpinner>}
            <CustomModal
                onClose={onClose} open={open}>
                <Box sx={{
                    position: "relative",
                }
                }
                    minWidth={
                        {
                            md: "400px",
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
                            }}> {!idDeliveryType ? t("Create") : t("Change")}</Typography>
                        </Box>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Grid container item md={12} xs={12} spacing={5}>
                                <Grid container item md={6} xs={12}>
                                    <Grid item md={12} xs={12}>
                                        <Box>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        label={t("Delivery Type")}
                                                        placeholder={t("Enter delivery-type name")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        helperText={errors.name?.message}
                                                    ></CustomTextField>
                                                )}
                                                name="name"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container item md={6} xs={12}>
                                    <Grid item md={12} xs={12}>
                                        <Box>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <CustomTextField
                                                        fullWidth
                                                        required
                                                        label={t("Price")}
                                                        placeholder={t("Enter price")}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        helperText={errors.name?.message}
                                                    ></CustomTextField>
                                                )}
                                                name="price"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                mt: "15px"
                            }}>
                                <Button type="submit" variant="contained" size="large">
                                    {!idDeliveryType ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditDeliveryType;