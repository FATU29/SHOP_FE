import { Avatar, Box, Button, Grid, useTheme } from "@mui/material";
import { NextPage } from "next";
import CustomTextField from "src/components/text-field";
import { useAuth } from "src/hooks/useAuth";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Phone } from "@mui/icons-material";
import WrapperFileUpload from "src/views/layouts/components/wrap-file-upload";
import { useEffect } from "react";

type TProps = {}


const schema = yup
    .object({
        email: yup.string().required("This field is required"),
        fullname: yup.string().required("This field is required"),
        address: yup.string().required("This field is required"),
        city: yup.string().required("This field is required"),
        phone: yup.number().required("This field is required")
    })
    .required()


const MyProfile: NextPage<TProps> = () => {

    const theme = useTheme();
    const authContex = useAuth();
    const { t } = useTranslation();




    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            fullname: "",
            address: "",
            city: "",
        },
        resolver: yupResolver(schema),
    })


    const onSubmit = () => {

    }

    const handleUploadFile = () => {

    }

    useEffect(() => {
        reset(
            {
                email: authContex.user?.email,
                fullname: authContex.user?.fullName,
                address: "",
                city: "",
            }
        )
    },[authContex.user])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "40px" }} noValidate>
                <Grid container spacing={5}>
                    <Grid container item md={6} xs={12} >
                        <Box sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 4
                        }}>
                            <Grid container spacing={8}>
                                <Grid item md={12} xs={12} >
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        gap: "10px"

                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            {authContex.user ?
                                                (<>
                                                    <Avatar sx={{
                                                        width: "80px",
                                                        height: "80px"
                                                    }} src={authContex.user.avatar || "/broken-image.jpg"}></Avatar>

                                                </>) :
                                                (<>
                                                    <Avatar sx={{
                                                        width: "80px",
                                                        height: "80px"
                                                    }} src="/broken-image.jpg"></Avatar>
                                                </>)}
                                        </Box>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <WrapperFileUpload uploadFunc={handleUploadFile} objectAcceptFile={{
                                                'image/jpeg': ['.jpeg', '.jpg'],
                                                'image/png': ['.png']
                                            }}>
                                                <Button variant="contained" sx={{
                                                    p: 3
                                                }}>{t("Upload image")}</Button>
                                            </WrapperFileUpload>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                label="Email"
                                                placeholder={t("Enter your email")}
                                                required
                                                type="email"
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                helperText={errors.email?.message}
                                            >
                                            </CustomTextField>
                                        )}
                                        name="email"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <CustomTextField
                                        label={t("Role")}
                                        value={authContex.user?.role.name || "None"}
                                        disabled
                                    >
                                    </CustomTextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid container item md={6} xs={12} >
                        <Box sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Grid container spacing={10}>
                                <Grid item md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                required
                                                label={t("Fullname")}
                                                placeholder={t("Enter your fullname")}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                helperText={errors.fullname?.message}
                                            ></CustomTextField>
                                        )}
                                        name="fullname"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                required
                                                label={t("Address")}
                                                placeholder={t("Enter your address")}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                helperText={errors.address?.message}
                                            ></CustomTextField>
                                        )}
                                        name="address"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                label={t("City")}
                                                placeholder={t("Enter your city")}
                                                required
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                helperText={errors.city?.message}
                                            ></CustomTextField>
                                        )}
                                        name="city"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                required
                                                label={t("Phone")}
                                                placeholder={t("Enter your phone")}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                helperText={errors.phone?.message}
                                            >
                                            </CustomTextField>
                                        )}
                                        name="phone"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"

                }}>
                    <Button type="submit" variant="contained" sx={{
                        width: "110px",
                        height: "40px",

                    }}>{t("Update")}</Button>
                </Box>
            </form>
        </>
    )
}

export default MyProfile;