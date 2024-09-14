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
import { useContext, useState } from "react";
import Image from "next/image";


// import images
import loginDark from "/public/images/login-dark.png"
import loginLight from "/public/images/login-light.png"
import Google from "/public/svgs/google.svg"
import Facebook from "/public/svgs/facebook.svg"
import Link from "next/link";

// ** hooks
import { useAuth } from "src/hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";


const schema = yup
    .object({
        email: yup.string().required("Email is a required field").matches(EMAIL_REG, "The field must be email type"),
        password: yup.string().required("Password is a required field").matches(PASSWORD_REG, "The password must be strong"),
        askRefer: yup.boolean()
    })
    .required()


type TProps = {}



const LoginPage: NextPage<TProps> = () => {

    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    // ** state
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [isRemember, setIsRemember] = useState<boolean>(true);

    // ** theme
    const theme = useTheme();

    // ** context
    const { login } = useAuth();


    const router = useRouter();




    // let referedStatus = watch("askRefer");

    const onSubmit = (data: { email: string, password: string }) => {
        if (!Object.keys(errors)?.length) {
            login({
                ...data,
                rememberMe: isRemember
            },(error:any) => {
                toast.error(error?.response?.data?.message)
            });
        }
    }

    return (
        <Box sx={
            {
                width: "100vw",
                height: "100vh",
                backgroundColor: theme.palette.background.paper
            }
        }>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "inherit "

            }}>
                <Box
                    display={{
                        md: "flex", //laptop
                        xs: "none" // ipad trở xuống
                    }}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "50vw",
                        height: "100%",
                        backgroundColor: theme.palette.customColors.bodyBg,
                        borderRadius: "20px",
                    }}>
                    <Image src={theme.palette.mode === "light" ? loginLight : loginDark} alt="login-page" style={
                        {
                            height: "auto",
                            width: "auto"
                        }
                    }></Image>
                </Box>
                <Box sx={{
                    minWidth: { md: "50vw", xs: "100vw" },
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
                            <Typography component="h1" variant="h1" sx={{
                                marginBottom: 5,
                            }}>SHOP FAT</Typography>
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
                                                error={Boolean(errors?.email)}
                                                onChange={onChange}
                                                placeholder="Input email"
                                                value={value}
                                                label="Email"
                                                fullWidth
                                                required
                                                margin="normal"
                                                helperText={errors?.email?.message}></CustomTextField>
                                        )}
                                        name="email"
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
                                                error={Boolean(errors?.password)}
                                                onChange={onChange}
                                                placeholder="Input password"
                                                value={value} label="Password"
                                                type={showPassword ? "text" : "password"}
                                                fullWidth
                                                required
                                                margin="normal"
                                                helperText={errors?.password?.message}
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
                                        name="password"
                                    />
                                </Box>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={isRemember}
                                        onChange={(e) => {
                                            setIsRemember(e.target.checked)
                                        }}
                                    ></Checkbox>}
                                    label="Remember me"></FormControlLabel>
                                <Button type="submit" fullWidth variant="contained" size="large">SIGN IN</Button>
                            </form>
                            <Grid container>
                                <Grid item xs>
                                    <Typography>
                                        {"Don't have an account?"}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" style={{
                                        textDecoration: "none",
                                        color: theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white
                                    }}>
                                        Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <Divider textAlign="center" sx={{ borderColor: 'currentcolor', borderBottomWidth: 1 }}>
                                    Or
                                </Divider>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"

                            }}>
                                <Box>
                                    <IconButton sx={{
                                        color: "blue"
                                    }}>
                                        <Image style={{
                                            height: "25px",
                                            width: "25px"
                                        }} alt="google-svg" src={Google}></Image>
                                    </IconButton>
                                </Box>
                                <Box>
                                    <IconButton>
                                        <Image style={{
                                            height: "25px",
                                            width: "25px",
                                        }} alt="facebook-svg" src={Facebook}></Image>
                                    </IconButton>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box >
    )
}


export default LoginPage;