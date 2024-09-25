import { Avatar, Box, Button, FormControlLabel, Grid, IconButton, InputLabel, Switch, Typography, useTheme } from '@mui/material';
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
import { createProductAction, updateProductAction } from 'src/stores/products/action';
import FallbackSpinner from 'src/components/fall-back';
import { getDetailProduct } from 'src/services/products';
import CustomSelect from 'src/components/custom-select';
import WrapperFileUpload from 'src/views/layouts/components/wrap-file-upload';
import { convertHTMLtoDraft, convertImgToBase64, stringToSlug } from 'src/utils';
import CustomDatePicker from 'src/components/custom-date-picker';
import CustomEditor from 'src/components/custom-editor';
import { EditorState } from 'react-draft-wysiwyg';
import { getAllProductTypes } from 'src/services/product-type';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import moment from 'moment';
import Image from 'next/image';
import products from 'src/stores/products';


interface TCreateEditUser {
    open: boolean,
    onClose: () => void,
    idProduct?: string,

}


type TDefaultValue = {
    name: string,
    type: string,
    price: string,
    discount?: string,
    slug: string,
    description: string,
    countInStock: string,
    status: number,
    discountEndDate?: Date | null,
    discountStartDate?: Date | null,
}



const CreateEditProduct = (props: TCreateEditUser) => {

    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);
    const [imageProduct, setImageProduct] = React.useState<string>("");
    const [listProductTypes, setListProductTypes] = React.useState<{ label: string, value: string }[]>([]);


    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.products)


    const { open, onClose, idProduct } = props;



    const defaultValues: TDefaultValue = {
        name: "",
        type: "",
        price: "",
        discount: "",
        slug: "",
        countInStock: "",
        status: 0,
        discountEndDate: null,
        discountStartDate: null,
        description: ""
    }

    const schema = yup
        .object({
            name: yup.string().required(`${t("required field")}`),
            type: yup.string().required(`${t("required field")}`),
            slug: yup.string().required(`${t("required field")}`),
            countInStock: yup.string().required(`${t("required field")}`).test("higher or equal 1", "higher or equal 1", (value) => {
                return Number(value) >= 1
            }),
            price: yup.string().required(`${t("required field")}`).test("higher or equal 0", "higher or equal 0", (value) => {
                return Number(value) >= 0
            }),
            discount: yup.string().nonNullable().test("discount", "at_least_1_in_discount", (value, context) => {
                const discountStartDate = context.parent.discountStartDate;
                const discountEndDate = context.parent.discountEndDate;
                if (value) {
                    if (!discountStartDate) {
                        setError("discountStartDate", { type: 'Exist', message: 'Required discountStartDate' });
                    }
                    if (!discountEndDate) {
                        setError("discountEndDate", { type: 'Exist', message: 'Required discountEndDate' });
                    }
                } else {
                    clearErrors("discountStartDate")
                    clearErrors("discountEndDate")
                }
                return !value || Number(value) >= 1
            }),
            description: yup.object().nonNullable(),
            discountEndDate: yup.date().notRequired().test("discountEndDate", "Error discountEndDate", (value, context) => {
                const discount = context?.parent?.discount;
                const discountStartDate = context.parent.discountStartDate
                let checkValidStartEndDate: boolean = false
                if (value) {
                    checkValidStartEndDate = value?.getTime() > discountStartDate?.getTime()
                }
                return (discount && value && checkValidStartEndDate) || !discount
            }),
            discountStartDate: yup.date().notRequired().test("discountStartDate", "Error discountStartDate", (value, context) => {
                const discount = context?.parent?.discount;
                const discountEndDate = context.parent.discountEndDate
                let checkValidStartEndDate: boolean = false
                if (value) {
                    checkValidStartEndDate = value?.getTime() < discountEndDate?.getTime()
                }
                return (discount && value && checkValidStartEndDate) || !discount
            }),
            status: yup.number().nonNullable(),
        })
        .required()

    const { handleSubmit, getValues, setError, clearErrors, control, reset, formState: { errors } } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const handleUploadFile = async (file: File) => {
        const base64 = await convertImgToBase64(file);
        await setImageProduct(base64 as string)
    }




    const onSubmit = async (data: any) => {
        if (!Object.keys(errors).length) {
            if (idProduct) {
                dispatch(updateProductAction({
                    name: data?.name,
                    slug: data?.slug,
                    price: Number(data.price),
                    discount: Number(data?.discount),
                    type: data?.type,
                    countInStock: Number(data?.countInStock),
                    description: data?.description ? draftToHtml(convertToRaw(data?.description.getCurrentContent())) : "",
                    status: data?.status,
                    discountEndDate: data?.discountEndDate,
                    discountStartDate: data?.discountStartDate,
                    image: imageProduct,
                    id: idProduct,
                }))
            } else {
                dispatch(createProductAction({
                    name: data?.name,
                    slug: data?.slug,
                    price: Number(data.price),
                    discount: Number(data?.discount),
                    type: data?.type,
                    countInStock: Number(data?.countInStock),
                    description: data?.description ? draftToHtml(convertToRaw(data?.description.getCurrentContent())) : "",
                    status: data?.status,
                    discountEndDate: data?.discountEndDate,
                    discountStartDate: data?.discountStartDate,
                    image: imageProduct,
                }))
            }
        }
    }

    const fetchAllProductTypes = async () => {
        setLoadingCheck(true);
        await getAllProductTypes({ params: { limit: -1, page: -1 } }).then((res: any) => {
            const data = res?.data?.productTypes
            if (data) {
                const objectListProducts = data?.map((item: any) => {
                    return {
                        label: item?.name,
                        value: item?._id
                    }
                })
                setListProductTypes(objectListProducts)
            }
        }).catch((e: any) => {
            setLoadingCheck(false);
        })
        setLoadingCheck(false);
    }


    const fetchDetailProduct = async (id: string) => {
        setLoadingCheck(true);
        const res: any = await getDetailProduct(id);
        const data = res?.data;
        if (data) {
            reset({
                name: data?.name,
                slug: data?.slug,
                price: (data.price) as string,
                discount: (data?.discount) as string,
                type: data?.type,
                countInStock: (data?.countInStock) as string,
                description: data?.description ? convertHTMLtoDraft(data?.description) : "",
                status: data?.status,
                discountEndDate: data?.discountEndDate,
                discountStartDate: data?.discountStartDate,
            })
            setImageProduct(data?.image)
        }
        setLoadingCheck(false);
    }


    React.useEffect(() => {
        fetchAllProductTypes();
    }, [])


    React.useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
            setImageProduct("")
        } else if (open && idProduct) {
            fetchDetailProduct(idProduct)
        }
    }, [open, idProduct])



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
                            }}> {!idProduct ? t("Create") : t("Change")}</Typography>
                        </Box>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                            <Box sx={{
                                overflow: { md: "unset", xs: "scroll" },
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
                                                                    {imageProduct ?
                                                                        (<>
                                                                            <Image style={{
                                                                                width: "100%",
                                                                                height: "100%"
                                                                            }} width={0} height={0} alt={products?.name} src={imageProduct || "/broken-image.jpg"}></Image>

                                                                        </>) :
                                                                        (<>
                                                                            <Image style={{
                                                                                width: "100%",
                                                                                height: "100%"
                                                                            }} width={0} height={0} alt={products?.name} src="/broken-image.jpg"></Image>
                                                                        </>)}
                                                                </Box>
                                                                <Box sx={{
                                                                    position: "absolute",
                                                                    bottom: -5,
                                                                    right: -5
                                                                }}>
                                                                    <IconButton onClick={() => {
                                                                        setImageProduct("")
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
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <Box sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                gap: 2
                                                            }}>
                                                                <InputLabel sx={{
                                                                    fontSize: "13px",
                                                                    display: "block",
                                                                    color: theme.palette.text.secondary
                                                                }}>
                                                                    {t("Status_Product: ")}
                                                                </InputLabel>
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
                                                            </Box>
                                                        )}
                                                        name="status"
                                                    />
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
                                                                label={t("Price")}
                                                                placeholder={t("Enter your price")}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                helperText={errors.price?.message}
                                                            ></CustomTextField>
                                                        )}
                                                        name="price"
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
                                                                label={t("countInStock")}
                                                                placeholder={t("Enter your countInStock")}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                helperText={errors.countInStock?.message}
                                                            ></CustomTextField>
                                                        )}
                                                        name="countInStock"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <>
                                                                <CustomSelect
                                                                    label={t("Type")}
                                                                    fullWidth={true}
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                    value={value}
                                                                    options={listProductTypes}
                                                                    content={t("Type Product")}
                                                                ></CustomSelect>
                                                            </>
                                                        )}
                                                        name="type"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <CustomTextField
                                                                label={t("Discount")}
                                                                placeholder={t("Enter your discount")}
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
                                                                helperText={errors.discount?.message}
                                                            >
                                                            </CustomTextField>
                                                        )}
                                                        name="discount"
                                                    />
                                                </Grid>

                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => {
                                                            const isValidDate = moment(value, moment.ISO_8601, true).isValid(); // Kiểm tra nếu value hợp lệ
                                                            return <CustomDatePicker
                                                                dateFormat="MM-dd-yyyy"
                                                                onChange={(date) => onChange(date)}
                                                                onBlur={onBlur}
                                                                selectedDate={isValidDate ? moment(value).toDate() : null} // Chỉ chuyển đổi khi value hợp lệ
                                                                typeDateText="Discount_StartDate"
                                                                error={errors.discountStartDate?.message}
                                                                minDate={new Date(Date.now())}
                                                            >
                                                            </CustomDatePicker>
                                                        }}
                                                        name="discountStartDate"
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => {
                                                            const isValidDate = moment(value, moment.ISO_8601, true).isValid(); // Kiểm tra nếu value hợp lệ
                                                            return (
                                                                <CustomDatePicker
                                                                    dateFormat="MM-dd-yyyy"
                                                                    onChange={(date) => onChange(date)}
                                                                    onBlur={onBlur}
                                                                    selectedDate={isValidDate ? moment(value).toDate() : null} // Chỉ chuyển đổi khi value hợp lệ
                                                                    typeDateText="Discount_EndDate"
                                                                    error={errors.discountEndDate?.message}
                                                                />
                                                            );
                                                        }}
                                                        name="discountEndDate"
                                                    />
                                                </Grid>

                                                <Grid item md={12} xs={12}>
                                                    <Controller
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <CustomEditor
                                                                onEditorStateChange={(value) => onChange(value)}
                                                                onBlur={onBlur}
                                                                editorState={value as EditorState}
                                                                placeholder={t("Enter description")}
                                                                label={t("Description")}
                                                            >
                                                            </CustomEditor>
                                                        )}
                                                        name="description"
                                                    />
                                                </Grid>

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
                                    {!idProduct ? t("Create") : t("Change")}
                                </Button>
                            </Box>
                        </form>
                    </Box >
                </Box >
            </CustomModal >
        </>
    );
}


export default CreateEditProduct;