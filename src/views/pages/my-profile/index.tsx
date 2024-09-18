import { Avatar, Box, Button, Grid, IconButton, useTheme } from "@mui/material";
import { NextPage } from "next";
import CustomTextField from "src/components/text-field";
import { useAuth } from "src/hooks/useAuth";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useTranslation } from "react-i18next";
import WrapperFileUpload from "src/views/layouts/components/wrap-file-upload";
import { useEffect, useState } from "react";
import { getAuthMe } from "src/services/auth";
import { convertImgToBase64, separationFullname, toFullName } from "src/utils";
import IconifyIcon from "src/components/Icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import toast from "react-hot-toast";
import { resetIntitalState } from "src/stores/auth";
import { updateAuthMeAction } from "src/stores/auth/action";
import FallbackSpinner from "src/components/fall-back";
import CustomSelect from "src/components/custom-select";
import { getAllRoles } from "src/services/role";
import { getAllCities } from "src/services/city";

type TProps = {}





const MyProfile: NextPage<TProps> = () => {

    const theme = useTheme();
    const authContex = useAuth();
    const { t, i18n } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, isSuccessUpdateMe, isErrorUpdateMe, messageUpdateMe } = useSelector((state: RootState) => state.auth)


    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any | null>(null);
    const [avatar, setAvatar] = useState<string>("");
    const [listRole, setListRole] = useState<{ label: string, value: string }[]>([]);
    const [listCities, setListCities] = useState<{ label: string, value: string }[]>([])
    const [isDisableRole, setIsDisableRole] = useState<boolean>(false);


    const schema = yup
        .object({
            email: yup.string().required("This field is required"),
            fullname: yup.string().notRequired(),
            address: yup.string().notRequired(),
            city: yup.string().notRequired(),
            phoneNumber: yup.string().nonNullable(),
            role: isDisableRole ? yup.string().notRequired() : yup.string().required("Require field"),
        })
        .required()

    const {
        control,
        reset,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            fullname: "",
            address: "",
            city: "",
            phoneNumber: "",
            role: ""
        },
        resolver: yupResolver(schema),
    })


    const onSubmit = (data: any) => {
        let fullname = data.fullname;
        const { firstName, middleName, lastName } = separationFullname(fullname, i18n.language);
        dispatch(updateAuthMeAction({
            email: data?.email,
            firstName,
            middleName,
            lastName,
            role: data.role,
            phoneNumber: data?.phoneNumber,
            avatar,
            address: data?.address,
            // city:data?.city
        }))

    }

    const handleUploadFile = async (file: File) => {
        const base64 = await convertImgToBase64(file);
        setAvatar(base64 as string)
    }


    const fetchGetAuthMe = async () => {
        await getAuthMe().then((response) => {
            setLoading(false)
            setUser({ ...response.data })
            authContex.setUser({ ...response.data })
            const data = response?.data
            if (data) {
                setAvatar(data?.avatar)
                setIsDisableRole(!!data.role.permissions.lengths)
                reset({
                    email: data?.email,
                    address: data?.address,
                    city: data?.city,
                    phoneNumber: data?.phoneNumber,
                    fullname: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
                    role: data?.role?._id
                })
            }
        })
            .catch(() => {
                // clearLocalUserData();
                setUser(null)
                setLoading(false)
            })
    }

    const fetchAllRoles = async () => {
        setLoading(true);
        await getAllRoles({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.roles;
            if (data) {
                setListRole(data.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                }));
            }
        }).catch((error) => {
            setLoading(false);
        })
        setLoading(false);
    }

    const fetchAllCities = async () => {
        setLoading(true);
        await getAllCities({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.cities;
            if (data) {
                const objectListCities = data?.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                })
                setListCities(objectListCities)
                
            }
        }).catch((e: any) => {
            setLoading(false);
        })
        setLoading(false);
    }

    useEffect(() => {
        fetchGetAuthMe();
    }, [i18n.language])

    useEffect(() => {
        fetchAllRoles();
        fetchAllCities();
    }, [])



    useEffect(() => {
        if (messageUpdateMe) {
            if (isSuccessUpdateMe) {
                toast.success(messageUpdateMe)
                fetchGetAuthMe();
            } else {
                toast.error(messageUpdateMe)
            }
            dispatch(resetIntitalState())
        }

    }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

    return (
        <>
            {(loading || isLoading) && <FallbackSpinner></FallbackSpinner>}
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "40px" }} noValidate>
                <Grid container spacing={5}>
                    <Grid container item md={6} xs={12} >
                        <Box sx={{
                            backgroundColor: theme.palette.customColors.bodyBg,
                            borderRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 4,
                            border: "1px solid rgba(149, 157, 165, 0.4)",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
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
                                            width: "auto",
                                            height: "auto",
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
                                                disabled
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
                                    {!isDisableRole &&
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => {
                                                return <>
                                                    <CustomSelect
                                                        value={value}
                                                        fullWidth
                                                        content={t("Role")}
                                                        error={Boolean(errors.role)}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
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