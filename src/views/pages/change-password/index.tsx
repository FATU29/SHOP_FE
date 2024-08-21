"use client"
// Import Next
import { NextPage } from "next";

// Import MUI
import {
    Divider,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid, IconButton,
    InputAdornment,
    Typography,
    useTheme
} from "@mui/material";
import CustomTextField from "src/components/text-field";
// Import react-hook-form
import { Controller, useForm } from "react-hook-form"

//Import yup
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

//import regrex
import { EMAIL_REG, PASSWORD_REG } from "src/configs/regex";


//import iconify
import IconifyIcon from "src/components/Icon";

// import react
import { useEffect, useState } from "react";
import Image from "next/image";


// import images
import registerDark from "/public/images/register-dark.png"
import registerLight from "/public/images/register-light.png"
import Google from "/public/svgs/google.svg"
import Facebook from "/public/svgs/facebook.svg"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import toast from "react-hot-toast";
import FallbackSpinner from "src/components/fall-back";
import { resetIntitalState } from "src/stores/auth";
import { useRouter } from "next/router";
import { ROUTE_CONFIG } from "src/configs/route";
import { useTranslation } from "react-i18next";
import { changePasswordMeAction } from "src/stores/auth/action";
import { isError } from "util";
import { useAuth } from "src/hooks/useAuth";


const schema = yup
    .object({
        currentPassword: yup.string().required("Current password is a required field"),
        newPassword: yup.string().required("New password is a required field").matches(PASSWORD_REG, "The password must be strong"),
        confirmNewPassword: yup.string().required("Confirm new password is a required field").matches(PASSWORD_REG, "The password must be strong").oneOf([yup.ref("newPassword")], "The confirm password must be matched with password"),
        askRefer: yup.boolean()
    })
    .required()


type TProps = {}



const ChangePasswordPage: NextPage<TProps> = () => {

    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""

        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const [showCurrentPassword, setShowCurrentPassword] = useState<Boolean>(false);
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessChangePasswordMe, isErrorChangePasswordMe, messageChangePasswordMe } = useSelector((state: RootState) => state.auth);
    const theme = useTheme();
    const {t} = useTranslation();
    const {logout} = useAuth();
    // let referedStatus = watch("askRefer");

    const onSubmit = (data: { currentPassword: string, newPassword: string }) => {
        if(!Object.keys(errors).length){
            dispatch(changePasswordMeAction(data));
        }
    }

    useEffect(() => {
        if (messageChangePasswordMe) {
            if (isSuccessChangePasswordMe) {
                toast.success(messageChangePasswordMe)
                setTimeout(() => {
                    logout();
                }, 1000)
            } else {
                toast.error(messageChangePasswordMe)
            }
            dispatch(resetIntitalState())
        }

    }, [isErrorChangePasswordMe, isSuccessChangePasswordMe, messageChangePasswordMe])

    return (
        <>
            {isLoading && <FallbackSpinner></FallbackSpinner>}
            <Box sx={
                {
                    width: "auto",
                    height: "auto",
                    p:5,
                    overflow:"hidden",
                    borderRadius:"20px",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    backgroundColor: theme.palette.background.paper
                }
            }>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "inherit"

                }}>
                    <Box
                        display={{  
                            md: "flex", //laptop
                            xs: "none" // ipad trở xuống
                        }}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette.customColors.bodyBg,
                            borderRadius: "20px",
                        }}>
                        <Image src={theme.palette.mode === "light" ? registerLight : registerDark} alt="login-page" style={
                            {
                                height: "auto",
                                width: "auto"
                            }
                        }></Image>
                    </Box>
                    <Box sx={{
                        minWidth: { md: "auto", xs: "100vw" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CssBaseline />
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "inherit"
                        }}>
                            <Box sx={
                                {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "7px"
                                }
                            }>
                                <Avatar sx={{
                                    width: 140,
                                    height: 80,
                                    marginBottom: 1,
                                    border: "2px solid"
                                }} variant="square" alt="Remy Sharp" src="/images/OIP.jpg"></Avatar>
                                <Typography component="h4" variant="h4" sx={{
                                    marginBottom: 5,
                                }}>{t("Change password")}</Typography>
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                                    <Box>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    onBlur={onBlur}
                                                    error={Boolean(errors?.currentPassword)}
                                                    onChange={onChange}
                                                    placeholder={t("Enter current password")}
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    value={value}
                                                    label={t("Current password")}
                                                    fullWidth
                                                    required
                                                    margin="normal"
                                                    helperText={errors?.currentPassword?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton edge="end" onClick={() => { setShowCurrentPassword(!showCurrentPassword) }}>
                                                                    {showCurrentPassword ? <IconifyIcon icon="material-symbols:visibility-outline"></IconifyIcon> : <IconifyIcon icon="material-symbols:visibility-off-outline"></IconifyIcon>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    ></CustomTextField>
                                               
                                            )}
                                            name="currentPassword"
                                        />
                                    </Box>
                                    <Box>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    onBlur={onBlur}
                                                    error={Boolean(errors?.newPassword)}
                                                    onChange={onChange}
                                                    placeholder={t("Enter new password")}
                                                    value={value}
                                                    label={t("New password")}
                                                    type={showPassword ? "text" : "password"}
                                                    fullWidth
                                                    required
                                                    margin="normal"
                                                    helperText={errors?.newPassword?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton edge="end" onClick={() => { setShowPassword(!showPassword) }}>
                                                                    {showPassword ? <IconifyIcon icon="material-symbols:visibility-outline"></IconifyIcon> : <IconifyIcon icon="material-symbols:visibility-off-outline"></IconifyIcon>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}

                                                ></CustomTextField>
                                            )}
                                            name="newPassword"
                                        />
                                    </Box>
                                    <Box>
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <CustomTextField
                                                    onBlur={onBlur}
                                                    error={Boolean(errors?.confirmNewPassword)}
                                                    onChange={onChange}
                                                    placeholder={t("Enter confirm new password")}
                                                    value={value}
                                                    label={t("Confirm new password")}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    fullWidth
                                                    required
                                                    margin="normal"
                                                    helperText={errors?.confirmNewPassword?.message}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton edge="end" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                                                                    {showConfirmPassword ? <IconifyIcon icon="material-symbols:visibility-outline"></IconifyIcon> : <IconifyIcon icon="material-symbols:visibility-off-outline"></IconifyIcon>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}

                                                ></CustomTextField>
                                            )}
                                            name="confirmNewPassword"
                                        />
                                    </Box>

                                    <Button type="submit" fullWidth variant="contained" size="large">{t("Change")}</Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    )
}


export default ChangePasswordPage;