import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
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
import { createProductTypeAction, updateProductTypeAction } from 'src/stores/product-type/action';
import { getDetailProductType } from 'src/services/product-type';
import CustomModal from 'src/components/custom-modal';
import { stringToSlug } from 'src/utils';


interface TCreateEditProductType {
    open: boolean,
    onClose: () => void,
    idProductType?: string,
}


type TDefaultValue = {
    name: string,
    slug: string
}



const CreateEditProductType = (props: TCreateEditProductType) => {

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);


    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.productType)


    const { open, onClose, idProductType } = props;



    const defaultValues: TDefaultValue = {
        name: "",
        slug: ""
    }

    const schema = yup
        .object({
            name: yup.string().required("Name is a required field"),
            slug: yup.string().required("String is a required field")
        })
        .required()

    const { handleSubmit, control, getValues, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })




    const onSubmit = async (data: any) => {
        if (!Object.keys(errors).length) {
            if (idProductType) {
                dispatch(updateProductTypeAction({
                    name: data?.name,
                    slug: data?.slug,
                    id: idProductType
                }))
            } else {
                dispatch(createProductTypeAction({
                    name: data?.name,
                    slug: data?.slug
                }))
            }
        }
    }



    const fetchDetailProductType = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailProductType(id);
        const data = res?.data;
        if (data) {
            reset({
                name: data?.name,
                slug: data?.slug
            })
        }
        setLoadingCheck(false);
    }



    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else if (open && idProductType) {
            fetchDetailProductType(idProductType)
        }
    }, [open, idProductType])



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
                            }}> {!idProductType ? t("Create") : t("Change")}</Typography>
                        </Box>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Box sx={{
                                overflow: { md: "unset", xs: "scroll" },
                            }}>
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
                                                            label={t("Product Type")}
                                                            placeholder={t("Enter product-type name")}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                const replace = stringToSlug(value)
                                                                onChange(value)
                                                                reset({
                                                                    ...getValues(),
                                                                    slug: replace
                                                                })
                                                            }}
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
                                                            disabled
                                                            fullWidth
                                                            required
                                                            label={t("Slug")}
                                                            placeholder={t("Enter Slug")}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            helperText={errors.slug?.message}
                                                        ></CustomTextField>
                                                    )}
                                                    name="slug"
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
                                        {!idProductType ? t("Create") : t("Change")}
                                    </Button>
                                </Box>

                            </Box>
                        </form>
                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditProductType;