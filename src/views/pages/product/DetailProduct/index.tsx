import { Box, Button, Grid, Rating, Tooltip, Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useAuth } from "src/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FallbackSpinner from "src/components/fall-back";
import { getDetailProductPublicBySlug } from "src/services/products";
import { useRouter } from "next/router";
import { TProduct } from "src/types/products";
import Image from "next/image";
import Countdown from "react-countdown";
import { formatCurrencyVND } from "src/utils";
import IconifyIcon from "src/components/Icon";

type TProps = {}





const DetailProductPage: NextPage<TProps> = () => {

    const theme = useTheme();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [dataDetailProduct, setDataDetailProduct] = useState<TProduct | any>();
    const router = useRouter();
    const { productId } = router.query


    // Custom renderer function to style the countdown
    const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render something else when the countdown is completed
            return <span>Sale ended!</span>;
        } else {
            // Render countdown with custom styles
            return (
                <div style={{ display: 'flex', gap: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                    <div>{days}d</div>
                    <div>{hours}h</div>
                    <div>{minutes}m</div>
                    <div>{seconds}s</div>
                </div>
            );
        }
    };

    const checkValidDiscount = () => {
        const discountEndDate = new Date(dataDetailProduct?.discountEndDate).getTime();
        const discountStartDate = new Date(dataDetailProduct?.discountStartDate).getTime();
        return dataDetailProduct?.discount && Date.now() <= discountEndDate && Date.now() >= discountStartDate;
    };

    const isSaleDate = () => {
        if (checkValidDiscount()) {
            return <Countdown renderer={countdownRenderer} date={new Date(dataDetailProduct?.discountEndDate).getTime()} />;
        }
    };

    const fetchGetDetailProduct = async (slug: string) => {
        setLoading(true);
        await getDetailProductPublicBySlug(slug).then((res) => {
            const data = res?.data;
            if (data) {
                setDataDetailProduct(data);
            }

        }).catch((e) => {
            setLoading(false);
        })
        setLoading(false);
    }



    useEffect(() => {
        if (productId) {
            fetchGetDetailProduct(productId as string);
        }
    }, [productId])

    return (
        <>
            {(loading) && <FallbackSpinner></FallbackSpinner>}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                p: 5,
                width: "100%",
                height: "100%"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Grid container spacing={10}>
                        <Grid item md={5} xs={12}>
                            <Box>
                                <Image
                                    width={0}
                                    height={0}
                                    src={dataDetailProduct?.image}
                                    alt={dataDetailProduct?.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        border: "1px solid"
                                    }}
                                ></Image>
                            </Box>
                        </Grid>
                        <Grid item md={7} xs={12} justifyContent={"center"} alignItems={"center"} display={"flex"}>
                            <Box sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                }}>
                                    <Tooltip title={dataDetailProduct?.name}>
                                        <Typography sx={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            "-webkitBoxOrient": "vertical",
                                            "-webkitLineClamp": "2",
                                            overflow: "hidden",
                                        }}>{dataDetailProduct?.name}</Typography>
                                    </Tooltip>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        gap: "5px"
                                    }}>
                                        <Typography sx={{
                                            textDecoration: "underline",
                                            color: "red"
                                        }}>{dataDetailProduct?.averageRating}</Typography>
                                        <Rating
                                            value={dataDetailProduct?.averageRating}
                                            readOnly
                                        >
                                        </Rating>
                                    </Box>
                                    <Box>
                                        <Typography color={theme.palette.text.primary}>Report</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    backgroundColor: theme.palette.background.default,
                                    p: 6,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                }}>
                                    {checkValidDiscount() && <>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            pb: 3,
                                            borderBottom: "1px solid"
                                        }}>
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: 'center',

                                            }}>
                                                <Typography> F<IconifyIcon icon={"bi:lightning-fill"}></IconifyIcon>ASH SALE</Typography>
                                            </Box>
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2
                                            }}>
                                                <IconifyIcon icon={"ri:time-line"}></IconifyIcon>
                                                <Typography>{t("Ends in")}</Typography>
                                                {isSaleDate()}
                                            </Box>

                                        </Box>
                                    </>}
                                    {checkValidDiscount() ? (<>
                                        <Box display={"flex"}
                                            justifyContent={"flex-start"}
                                            alignItems={"center"}
                                            gap={7}
                                        >
                                            <Typography sx={{
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                textDecoration: "line-through",
                                                color: "red",
                                                position: "relative"
                                            }}> {formatCurrencyVND(dataDetailProduct?.price)}</Typography>
                                            <Typography sx={{
                                                fontSize: "25px",
                                                fontWeight: "bold",
                                                position: "relative"
                                            }}>

                                                {formatCurrencyVND(dataDetailProduct?.discount)}</Typography>
                                        </Box>
                                    </>) : (<><Typography sx={{
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        position: "relative"
                                    }}>
                                        {formatCurrencyVND(dataDetailProduct?.price)}</Typography></>)}
                                </Box>
                                <Box>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "10px"
                                    }}>
                                        <Button sx={{
                                            borderRadius: 0
                                        }} variant="contained">{t("Add_to_cart")}</Button>
                                        <Button sx={{
                                            borderRadius: 0
                                        }} variant="contained">{t("Buy_now")}</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default DetailProductPage;