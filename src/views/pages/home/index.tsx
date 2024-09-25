import { Box, Grid, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import FallbackSpinner from "src/components/fall-back";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import { getAllProductTypes } from "src/services/product-type";
import CardProduct from "./component/CardProduct";
import { getAllProductsPublic } from "src/services/products";
import { TProduct } from "src/types/products";
import InputSearch from "src/components/input-search";
import FilterProduct from "./component/FilterProduct";




const HomePage = () => {
    const { t, i18n } = useTranslation();

    const [searchBy, setSearchBy] = useState<string>("")
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("createdAt asc");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [listType, setListType] = useState<{ label: string, value: string }[]>([]);
    const [fillterBy, setFillterBy] = useState<Record<string, string>>({});
    const [reviewSelected, setReviewSelected] = useState<string>("")
    const [productPublic, setProductPublic] = useState({
        data: [],
        count: 0
    })
    const [productTypeSelected, setProductTypeSelected] = useState("")
    const firstRender = useRef<Boolean>(false);


    const theme = useTheme();


    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize);
    }


    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setProductTypeSelected(newValue);
    };



    const controllerRef = useRef<AbortController | null>(null);

    const handleGetListProducts = async () => {
        // Hủy request trước đó (nếu có)
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        // Tạo một controller mới cho request hiện tại
        const controller = new AbortController();
        controllerRef.current = controller;

        const query: any = {
            params: {
                limit: pageSize,
                page: page,
                search: searchBy,
                order: sortBy,
                ...fillterBy
            }
        };

        setLoadingTmp(true);

        try {
            const res = await getAllProductsPublic(query, { signal: controller.signal });
            const data = res?.data;

            if (data) {
                setProductPublic({
                    data: data?.products,
                    count: data?.totalCount
                });
            }
        } catch (error:any) {
            if (error.name === 'AbortError') {
                console.log("Request bị hủy bỏ.");
            } else {
                console.error(error);
            }
        } finally {
            setLoadingTmp(false);
        }
    };


    const handleFilterProduct = (review: string): void => {
        setReviewSelected(review)
    }



    const fetchAllProductType = async () => {
        setLoadingTmp(true);
        await getAllProductTypes({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.productTypes;
            if (data) {
                const objectProductTypes = data?.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                })
                setListType(objectProductTypes)
                setProductTypeSelected(data[0]?._id)
                firstRender.current = true;
            }
        }).catch((e) => {
            setLoadingTmp(false);
        })
        setLoadingTmp(false);
    }

    useEffect(() => {
        fetchAllProductType();
    }, [])

    useEffect(() => {
        if(firstRender.current){
        handleGetListProducts();
        }
    }, [sortBy, searchBy, i18n, page, pageSize, fillterBy])



    useEffect(() => {
        if(firstRender.current){
            setFillterBy({ productType: productTypeSelected, minStar: reviewSelected })
        }
    }, [productTypeSelected, reviewSelected])


    return (
        <>
            {(isLoadingTmp) && <FallbackSpinner></FallbackSpinner>}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 5,
                display: "flex",
                flexDirection: 'column',
                gap: 5
            }}>
                <Box>
                    <Tabs
                        value={productTypeSelected}
                        onChange={handleChange}
                    >
                        {listType?.map((item) => {
                            return <Tab
                                key={item?.value}
                                value={item?.value}
                                label={item?.label}
                            />

                        })}
                    </Tabs >
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        width: "200px"
                    }}>
                        <InputSearch value={searchBy} onChange={(value: string) => {
                            setSearchBy(value)
                        }}></InputSearch>
                    </Box>
                </Box>
                <Box>
                    <Grid
                        container
                        spacing={{ md: "5", xs: "3" }}
                    >
                        <Grid item md={3} sx={{
                            height: "auto"
                        }}>
                            <Box sx={{
                                border: "1px solid",
                                borderColor: `rgba(${theme.palette.customColors.main},0.05)`,
                                borderRadius: "10px",
                                p: 5
                            }}>
                                <FilterProduct handleFilterProduct={handleFilterProduct}></FilterProduct>
                            </Box>
                        </Grid>
                        <Grid item container spacing={4} md={9}>
                            {productPublic?.data.length > 0 ? (
                                <>
                                    {productPublic?.data.map((item: TProduct) => (
                                        <Grid
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            key={item?._id}
                                            item
                                            md={4}
                                            xs={12}
                                            sm={6}>
                                            <CardProduct key={item._id} item={item}></CardProduct>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                <Typography textAlign={"center"}>No Data</Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <CustomPagination
                        rowLength={productPublic?.count}
                        pageSize={pageSize}
                        page={page}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onChangePagination={handleOnChangePagination}
                    ></CustomPagination>
                </Box>
            </Box>
        </>
    )
}


export default HomePage;