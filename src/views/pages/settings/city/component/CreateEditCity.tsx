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
import CustomSelect from 'src/components/custom-select';
import { createCityAction, updateCityAction } from 'src/stores/city/action';
import { getDetailCity } from 'src/services/city';
import CustomModal from 'src/components/custom-modal';


interface TCreateEditCity {
    open: boolean,
    onClose: () => void,
    idCity?: string,
    permissionSelected: string[]
}


type TDefaultValue = {
    name: string
}



const CreateEditCity = (props: TCreateEditCity) => {

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);


    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.city)


    const { open, onClose, idCity } = props;



    const defaultValues: TDefaultValue = {
        name: "",
    }

    const schema = yup
        .object({
            name: yup.string().required("Name is a required field"),

        })
        .required()

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })




    const onSubmit = async (data: any) => {
        if (!Object.keys(errors).length) {
            if (idCity) {
                dispatch(updateCityAction({
                    name: data.name,
                    id: idCity
                }))
            } else {
                dispatch(createCityAction({
                    name: data?.name
                }))
            }
        }
    }



    const fetchDetailCities = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailCity(id);
        const data = res?.data;
        if (data) {
            reset({
                name: data?.name
            })
        }
        setLoadingCheck(false);
    }



    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else if (open && idCity) {
            fetchDetailCities(idCity)
        }
    }, [open, idCity])



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
                            }}> {!idCity ? t("Create") : t("Change")}</Typography>
                        </Box>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Grid container item md={12} xs={12} >
                                <Box sx={{
                                    backgroundColor: theme.palette.customColors.bodyBg,
                                    borderRadius: "15px",
                                    width: "100%",
                                    height: "100%",
                                    padding: 4,
                                    border: "1px solid rgba(149, 157, 165, 0.4)",
                                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                                }}>
                                    <Grid item md={12} xs={12}>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    fullWidth
                                                    required
                                                    label={t("City")}
                                                    placeholder={t("Enter city name")}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    helperText={errors.name?.message}
                                                ></CustomTextField>
                                            )}
                                            name="name"
                                        />
                                    </Grid>
                                </Box>
                            </Grid>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                mt:"15px"
                            }}>
                                <Button type="submit" variant="contained" size="large">
                                    {!idCity ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditCity;