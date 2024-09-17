import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import * as yup from "yup"
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import IconifyIcon from 'src/components/Icon';
import CustomTextField from 'src/components/text-field';
import { AppDispatch, RootState } from 'src/stores';
import { yupResolver } from "@hookform/resolvers/yup"
import FallbackSpinner from 'src/components/fall-back';
import CustomModal from 'src/components/custom-modal';
import { createPaymentTypeAction, updatePaymentTypeAction } from 'src/stores/payment-type/action';
import { getDetailPaymentType } from 'src/services/payment-type';
import CustomSelect from 'src/components/custom-select';
import { PAYMENT_TYPES } from 'src/configs/payment';


interface TCreateEditPaymentType {
    open: boolean,
    onClose: () => void,
    idPaymentType?: string,
}


type TDefaultValue = {
    name: string,
    type: string
}



const CreateEditPaymentType = (props: TCreateEditPaymentType) => {

    const ObjectPaymentType = PAYMENT_TYPES();

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);


    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.deliveryType)


    const { open, onClose, idPaymentType } = props;



    const defaultValues: TDefaultValue = {
        name: "",
        type: "PAYMENT_LATER"
    }

    const schema = yup
        .object({
            name: yup.string().required("Name is a required field"),
            type: yup.string().required("Type is a required field"),

        })
        .required()

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })




    const onSubmit = async (data: any) => {
        if (!Object.keys(errors).length) {
            if (idPaymentType) {
                dispatch(updatePaymentTypeAction({
                    name: data?.name,
                    type: data?.type,
                    id: idPaymentType
                }))
            } else {
                dispatch(createPaymentTypeAction({
                    name: data?.name,
                    type: data?.type
                }))
            }
        }
    }



    const fetchDetailPaymentType = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailPaymentType(id);
        const data = res?.data;
        if (data) {
            reset({
                name: data?.name,
                type: data?.type
            })
        }
        setLoadingCheck(false);
    }



    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else if (open && idPaymentType) {
            fetchDetailPaymentType(idPaymentType)
        }
    }, [open, idPaymentType])




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
                            }}> {!idPaymentType ? t("Create") : t("Change")}</Typography>
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
                                                        label={t("Payment Type")}
                                                        placeholder={t("Enter payment-type name")}
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
                                                    <CustomSelect
                                                        content='Type'
                                                        options={Object.values(ObjectPaymentType)}
                                                        fullWidth
                                                        required
                                                        label={t("Type")}
                                                        placeholder={t("Enter type")}
                                                        onChange={(e) => {
                                                            onChange(e.target.value)
                                                        }}
                                                        onBlur={onBlur}
                                                        value={value}
                                                    ></CustomSelect>
                                                )}
                                                name="type"
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
                                    {!idPaymentType ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditPaymentType;