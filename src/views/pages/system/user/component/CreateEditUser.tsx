import { Avatar, Box, Button, FormControlLabel, Grid, IconButton, InputAdornment, Switch, Typography, useTheme } from '@mui/material';
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
import { createUsersAction, updateUsersAction } from 'src/stores/user/action';
import FallbackSpinner from 'src/components/fall-back';
import { getDetailUsers } from 'src/services/user';
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex';
import CustomSelect from 'src/components/custom-select';
import WrapperFileUpload from 'src/views/layouts/components/wrap-file-upload';
import { convertImgToBase64, separationFullname, toFullName } from 'src/utils';
import { getAllRoles } from 'src/services/role';
import { useAuth } from 'src/hooks/useAuth';
import { getAllCities } from 'src/services/city';


interface TCreateEditUser {
    open: boolean,
    onClose: () => void,
    idUser?: string,

}


type TDefaultValue = {
    fullName?: string,
    email: string,
    role: string,
    phoneNumber?: string,
    password?: string,
    address?: string,
    status?: number,
    city?: string
}



const CreateEditUser = (props: TCreateEditUser) => {

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);
    const [avatar, setAvatar] = React.useState<string>("");
    const [listRole, setListRole] = React.useState<{ label: string, value: string }[]>([]);
    const [listCities, setListCities] = React.useState<{ label: string, value: string }[]>([]);
    const [isDisableRole, setIsDisableRole] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<Boolean>(false);


    // const { users } = useSelector((state: RootState) => state.user);
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { setUser } = useAuth();
    const { message, isLoading } = useSelector((state: RootState) => state.user)
    const { userData } = useSelector((state: RootState) => state.auth)


    const { open, onClose, idUser} = props;



    const defaultValues: TDefaultValue = {
        fullName: "",
        email: "",
        role: "",
        password: "",
        phoneNumber: "",
        address: "",
        status: 1,
        city: ""
    }

    const schema = yup
        .object({
            email: yup.string().required("Email is a required field").matches(EMAIL_REG, "The field must be email type"),
            password: idUser ? yup.string().notRequired() : yup.string().required("Password is a required field").matches(PASSWORD_REG, "The password must be strong"),
            fullName: yup.string().nonNullable(),
            role: yup.string().required(`${t("required field")}`),
            phoneNumber: yup.string().nonNullable(),
            address: yup.string().nonNullable(),
            status: yup.number().nonNullable(),
            city: yup.string().nonNullable(),

        })
        .required()

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const handleUploadFile = async (file: File) => {
        const base64 = await convertImgToBase64(file);
        await setAvatar(base64 as string)
    }




    const onSubmit = async (data: any) => {
        const { firstName, middleName, lastName } = separationFullname(data?.fullName, i18n.language);
        if (!Object.keys(errors).length) {
            if (idUser) {
                dispatch(updateUsersAction({
                    firstName,
                    middleName,
                    lastName,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    role: data?.role?._id,
                    email: data?.email,
                    address: data?.address,
                    city: data?.city,
                    avatar: avatar,
                    id: idUser,
                    status:data?.status
                }))
            } else {
                dispatch(createUsersAction({
                    firstName,
                    middleName,
                    lastName,
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    role: data?.role,
                    email: data?.email,
                    address: data?.address,
                    city: data?.city,
                    avatar: avatar
                }))
            }
        }
    }

    const fetchAllRoles = async () => {
        await setLoadingCheck(true);
        await getAllRoles({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.roles;
            if (data) {
                setListRole(data?.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                }));
            }
        }).catch((error) => {
             setLoadingCheck(false);
        })
        await setLoadingCheck(false);
    }

    const fetchAllCities = async () => {
        setLoadingCheck(true);
        await getAllCities({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.cities
            if(data){
                const objectListCities = data?.map((item:any) => {
                    return {
                        label:item?.name,
                        value:item?._id
                    }
                })
                setListCities(objectListCities)
            }
        }).catch((e:any) => {
            setLoadingCheck(false);
        })
        setLoadingCheck(false);
    }


    const fetchDetailsUsers = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailUsers(id);
        const data = res?.data;
        if (data) {
            reset({
                fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
                password: data.password,
                phoneNumber: data.phoneNumber,
                role: data?.role?._id,
                email: data?.email,
                address: data?.address,
                city: data?.city,
                status: data?.status
            })
            setAvatar(data?.avatar)
        }
        setLoadingCheck(false);
    }


    React.useEffect(() => {
        fetchAllRoles();
        fetchAllCities();
    }, [])


    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
        } else if (open && idUser) {
            fetchDetailsUsers(idUser)
        }
    }, [open, idUser])


    React.useEffect(() => {
        if (userData && idUser === userData?._id) {
            setUser({ ...userData,["avatar"]:avatar })
        }
    }, [message])






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
                            }}> {!idUser ? t("Create") : t("Change")}</Typography>
                        </Box>
                        <form style={{ width: "auto" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Box sx={{
                                overflow: "scroll",
                                width: { md: "auto", xs: "calc(100vw - 110px)" },
                                height: { md: "auto", xs: "600px" }
                            }}>
                                <Grid container spacing={5}>
                                    <Grid container item md={6} xs={12} >
                                        <Box sx={{
                                            backgroundColor: theme.palette.customColors.bodyBg,
                                            borderRadius: "15px",
                                            width: { md: "1000px", xs: "auto" },
                                            height: { md: "100%", xs: "auto" },
                                            padding: 4,
                                            border: "1px solid rgba(149, 157, 165, 0.4)",
                                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                        }}>
                                            <Grid container spacing={5}>
                                                <Grid item md={12} xs={12} >
                                                    <Box sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexDirection: "column",
                                                        gap: "10px",

                                                    }}>
                                                        <Box sx={{
                                                            position: "relative"
                                                        }}>
                                                            <Box sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}>
                                                                <Box>
                                                                    {avatar ?
                                                                        (<>
                                                                            <Avatar sx={{
                                                                                width: "80px",
                                                                                height: "80px"
                                                                            }} src={avatar || "/broken-image.jpg"}></Avatar>

                                                                        </>) :
                                                                        (<>
                                                                            <Avatar sx={{
                                                                                width: "80px",
                                                                                height: "80px"
                                                                            }} src="/broken-image.jpg"></Avatar>
                                                                        </>)}
                                                                </Box>

                                                                <Box sx={{
                                                                    position: "absolute",
                                                                    bottom: -5,
                                                                    right: -5
                                                                }}>
                                                                    <IconButton onClick={() => {
                                                                        setAvatar("")
                                                                    }}>
                                                                        <IconifyIcon icon="icon-park:delete-three">
                                                                        </IconifyIcon>
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>

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

                                                <Grid item md={12} xs={12}>
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
                                                {!idUser && <Grid item md={12} xs={12}>
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
                                                                placeholder="Enter password"
                                                                value={value}
                                                                label="Password"
                                                                type={showPassword ? "text" : "password"}
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
                                                </Grid>}

                                                <Grid item md={6} xs={12}>
                                                    {!isDisableRole &&
                                                        <Controller
                                                            control={control}
                                                            render={({ field: { onChange, onBlur, value } }) => {
                                                                return <>
                                                                    <CustomSelect
                                                                        required
                                                                        value={value}
                                                                        fullWidth
                                                                        content={t("Role *")}
                                                                        error={Boolean(errors.role)}
                                                                        onBlur={onBlur}
                                                                        onChange={(e) => {
                                                                            onChange(e.target.value)
                                                                        }}
                                                                        options={listRole}
                                                                        label={t("Role")}
                                                                        placeholder="Enter your role"
                                                                    ></CustomSelect>
                                                                </>
                                                            }}
                                                            name="role"
                                                        />}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    <Grid container item md={6} xs={12} >
                                        <Box sx={{
                                            backgroundColor: theme.palette.customColors.bodyBg,
                                            borderRadius: "15px",
                                            width: "100%",
                                            height: "100%",
                                            padding: 4,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: "1px solid rgba(149, 157, 165, 0.4)",
                                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                                        }}>
                                            <Grid container spacing={10}>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <CustomTextField
                                                                required
                                                                label={t("Fullname")}
                                                                placeholder={t("Enter your fullname")}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                helperText={errors.fullName?.message}
                                                            ></CustomTextField>
                                                        )}
                                                        name="fullName"
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
                                                                label={t("Address")}
                                                                placeholder={t("Enter your address")}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                            ></CustomTextField>
                                                        )}
                                                        name="address"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <>
                                                                <CustomSelect
                                                                    label={t("City")}
                                                                    fullWidth={true}
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                    value={value}
                                                                    options={listCities}
                                                                    content={t("City")}
                                                                ></CustomSelect>
                                                            </>
                                                        )}
                                                        name="city"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <CustomTextField
                                                                required   
                                                                label={t("Phone")}
                                                                placeholder={t("Enter your phone")}
                                                                onChange={(e) => {
                                                                    const numValue = e.target.value.replace(/\D/g, "");
                                                                    onChange(numValue)
                                                                }}
                                                                inputProps={{
                                                                    inputMode: "numeric",
                                                                    pattern: "[0-9]*",
                                                                    minLength: 8
                                                                }}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                helperText={errors.phoneNumber?.message}
                                                            >
                                                            </CustomTextField>
                                                        )}
                                                        name="phoneNumber"
                                                    />
                                                </Grid>
                                                {idUser && <>
                                                    <Grid item md={6} xs={12}>
                                                        <Controller
                                                            control={control}
                                                            render={({ field: { onChange, onBlur, value } }) => (
                                                                <FormControlLabel control={<Switch
                                                                    checked={Boolean(value)}
                                                                    value={value}
                                                                    onChange={(e) => {
                                                                        const checked = e.target.checked ? 1 : 0
                                                                        onChange(checked)
                                                                    }}
                                                                    onBlur={onBlur}
                                                                    defaultChecked />}
                                                                    label={Boolean(value) ? "Active" : "Block"} />
                                                            )}
                                                            name="status"
                                                        />
                                                    </Grid>
                                                </>}
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>


                            <Box sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}>
                                <Button type="submit" variant="contained" size="large">
                                    {!idUser ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </CustomModal >
        </>
    );
}


export default CreateEditUser;