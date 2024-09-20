import { Box, Button, Chip, ChipProps, Grid, styled, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import CustomDataGrid from "src/components/custom-dataGrid";
import { useTranslation } from "react-i18next";
import AddButton from "src/components/grid-add";
import InputSearch from "src/components/input-search";
import FallbackSpinner from "src/components/fall-back";
import toast from "react-hot-toast";
import DeleteButton from "src/components/grid-delete";
import EditButton from "src/components/grid-edit";
import { resetIntitalState } from "src/stores/products";
import CofirmDialog from "src/components/cofirmation-dialog";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { usePermission } from "src/hooks/usePermission";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import TableHeader from "src/components/table-header";
import { deleteProductAction, deleteMultipleProductsAction, getAllProductsAction } from "src/stores/products/action";
import CreateEditProduct from "./component/CreateEditProduct";
import CustomSelect from "src/components/custom-select";
import { OBJECT_STATUS_USER } from "src/configs/users";
import { getAllProductTypes } from "src/services/product-type";
import { OBJECT_STATUS_Product } from "src/configs/products";



const ActiveProductStyled = styled(Chip)<ChipProps>(({ theme }) => {
    return {
        backgroundColor: `#3a843f29`,
        color: "#3a843f",
        fontSize: "14px",
        padding: "8px 4px",
        fontWeight: "600"
    }
})


const DeActiveProductStyled = styled(Chip)<ChipProps>(({ theme }) => {
    return {
        backgroundColor: `#da251d29`,
        color: "#da251d",
        fontSize: "14px",
        padding: "8px 4px",
        fontWeight: "600"
    }
})


const ProductList = () => {
    const { t, i18n } = useTranslation();


    const [openCreateEdit, setOpenCreateEdit] = useState<any>({
        open: false,
        _id: ""
    })
    const [openCofirmDialog, setOpenCofirmDialog] = useState<any>({
        open: false,
        _id: ""
    });

    const [openCofirmMultipleDialog, setOpenCofirmMultipleDialog] = useState<{ open: boolean }>({ open: false });
    const [searchBy, setSearchBy] = useState<string>("")
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("createdAt asc");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [selectedRow, setSelectedRow] = useState<string[]>([]);

    const [listType, setListType] = useState<{ label: string, value: string }[]>([]);
    const [statusSelected, setStatusSelected] = useState<string>("");
    const [typeSelected, setTypeSelected] = useState<string>("");
    const [fillterBy, setFillterBy] = useState<Record<string, string>>({});


    const theme = useTheme();

    const dispatch: AppDispatch = useDispatch();

    const {
        isErrorCreateEdit,
        isErrorDeleteMultipleProduct,
        isErrorDeleteProduct,
        isLoading,
        isSuccessCreateEdit,
        isSuccessDeleteProduct,
        isSuccessMultipleDeleteProduct,
        message,
        messageErrorCreateEdit,
        messageErrorDeleteMultipleProduct,
        messageErrorDeleteProduct,
        products
    } = useSelector((state: RootState) => state.products)


    const { VIEW, UPDATE, CREATE, DELETE } = usePermission("MANAGE_PRODUCT.PRODUCT", ["CREATE", "VIEW", "UPDATE", "DELETE"])

    const rows = products?.data || [];


    const columns: GridColDef<any>[] = [
        {
            field: "name",
            headerName: t("Name"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.name}</Typography>
                </>
            }
        },
        {
            field: "type",
            headerName: t("Type"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.type?.name}</Typography>
                </>
            }
        },
        {
            field: "price",
            headerName: t("Price"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.price}</Typography>
                </>
            }
        },
        {
            field: "countInStock",
            headerName: t("CountInStock"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.countInStock}</Typography>
                </>
            }
        },
        {
            field: 'status',
            headerName: t("status"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            align: "left",
            renderCell: (params) => {
                const { row } = params
                return <>
                    {row.status ? (
                        <ActiveProductStyled label={t("Public")}></ActiveProductStyled>
                    ) : <DeActiveProductStyled label={t("Private")}></DeActiveProductStyled>}
                </>
            }
        },
        {
            field: 'action',
            headerName: t("Action"),
            headerAlign: "center",
            align: "center",
            width: 150,
            editable: true,
            sortable: false,
            renderCell: (row) => {
                return (
                    <>
                        <Box>
                            <EditButton
                                //disabled={}
                                disabled={!UPDATE}
                                onClick={() => {
                                    if (row?.id) {
                                        setOpenCreateEdit({
                                            open: true,
                                            _id: row?.id as string,
                                        })
                                    }
                                }}></EditButton>
                            <DeleteButton
                                //disabled={DISABLE.includes(row.row.permissions[0])}
                                disabled={!DELETE}
                                onClick={async () => {
                                    await setOpenCofirmDialog({
                                        open: true,
                                        _id: row.id as string
                                    })
                                    await setOpenCreateEdit({
                                        open: false,
                                        _id: ""
                                    })

                                }}></DeleteButton>
                        </Box>
                    </>
                )
            }
        }
    ];




    const handleOnChangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize);
    }

    const PaginationComponent = () => {
        return (
            <>
                <CustomPagination
                    rowLength={products?.total}
                    pageSize={pageSize}
                    page={page}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onChangePagination={handleOnChangePagination}
                ></CustomPagination>
            </>
        )
    }


    const handleOnCloseCreateEditModal = () => {
        setOpenCreateEdit({
            open: false,
            _id: ""
        })

    }

    const handleOnCloseCofirmDialog = () => {
        setOpenCofirmDialog({
            open: false,
            _id: ""
        });
    }


    const handleOnCloseCofirmMultiple = () => {
        setOpenCofirmMultipleDialog({ open: false });
    }

    const handleGetListProducts = async () => {
        const query: any = {
            params: {
                limit: pageSize,
                page: page,
                search: searchBy,
                order: sortBy,
                ...fillterBy
            }
        }
        await dispatch(getAllProductsAction(query));
    }

    const handleSort = (sort: GridSortModel) => {
        if (sort) {
            const sortField = sort[0]?.field
            const sortOption = sort[0]?.sort
            if (sortField && sortOption) {
                setSortBy(`${sortField} ${sortOption}`)
            } else {
                setSearchBy("createdAt desc")
            }
        } else {
            setSearchBy("createdAt desc")
        }
    }

    const handleDelete = () => {
        dispatch(deleteProductAction({ id: openCofirmDialog?._id }))
        handleOnCloseCofirmDialog();
    }

    const handleDeleteMultipleCities = () => {
        dispatch(deleteMultipleProductsAction({
            productIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "Delete":
                setOpenCofirmMultipleDialog({ open: true });
                break;
        }
    }

    const handleClearFilter = () => {
        setStatusSelected("")
        setTypeSelected("")
        setFillterBy({})
        handleGetListProducts();
    }

    const fetchAllProductType = async () => {
        setLoadingTmp(true);
        await getAllProductTypes({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data?.productTypes;
            if(data){
                const objectProductTypes = data?.map((item:any) => {
                    return {
                        label:item.name,
                        value:item._id
                    }
                })
                setListType(objectProductTypes)
            }
        }).catch((e) => {
            setLoadingTmp(false);
        })
        setLoadingTmp(false);
    }

    useEffect(() => {
        fetchAllProductType();
    },[])

    useEffect(() => {
        handleGetListProducts();
    }, [sortBy, searchBy, i18n, page, pageSize,fillterBy])



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessCreateEdit) {
            handleGetListProducts();
            toast.success(message)
        } else if (isErrorCreateEdit) {
            toast.error(messageErrorCreateEdit)
        }
        setLoadingTmp(false)
        handleOnCloseCreateEditModal();
        dispatch(resetIntitalState());
    }, [isErrorCreateEdit, isSuccessCreateEdit, message, messageErrorCreateEdit])



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessDeleteProduct) {
            handleGetListProducts();
            toast.success("Delete successfully")
        } else if (isErrorDeleteProduct) {
            toast.error(messageErrorDeleteProduct)
        }
        setLoadingTmp(false)
        handleOnCloseCreateEditModal();
        dispatch(resetIntitalState());
    }, [isSuccessDeleteProduct, isErrorDeleteProduct, messageErrorDeleteProduct])



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessMultipleDeleteProduct) {
            handleGetListProducts();
            toast.success("Delete successfully")
        } else if (isErrorDeleteMultipleProduct) {
            toast.error(messageErrorDeleteMultipleProduct)
        }
        setLoadingTmp(false)
        handleOnCloseCofirmMultiple()
        dispatch(resetIntitalState());
    }, [isSuccessMultipleDeleteProduct, isErrorDeleteMultipleProduct, messageErrorDeleteMultipleProduct])

    useEffect(() => {
        setFillterBy({ productType: typeSelected, status: statusSelected })
    }, [typeSelected, statusSelected])


    return (
        <>
            <CofirmDialog
                open={openCofirmDialog}
                onClose={handleOnCloseCofirmDialog}
                handleAction={handleDelete}
                title={t("Cofirm form")}
                description={t("If you delete this product, it can't recover")}
            ></CofirmDialog>
            <CofirmDialog
                open={openCofirmMultipleDialog}
                onClose={handleOnCloseCofirmMultiple}
                handleAction={handleDeleteMultipleCities}
                title={t("Delete Multiple Cities")}
                description={t("If you delete product, it can't recover")}
            ></CofirmDialog>
            <CreateEditProduct
                open={openCreateEdit?.open}
                onClose={handleOnCloseCreateEditModal}
                idProduct={openCreateEdit?.id}
            >
            </CreateEditProduct>
            {(isLoading && isLoadingTmp) && <FallbackSpinner></FallbackSpinner>}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                    flexDirection: "column"
                }}>

                    <Grid container spacing={7}>
                        <Grid item md={12} xs={12}>
                            {selectedRow.length <= 0 && (
                                <>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "center",
                                        marginBottom: 2,
                                        gap: "5px"

                                    }}>
                                        <Box>
                                            <Button onClick={handleClearFilter} sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.common.white
                                            }}>{t("Clear filter")}</Button>
                                        </Box>
                                        <Box sx={{
                                            width: "200px",
                                            mt: { md: "-20px", xs: "0" }
                                        }}>
                                            <CustomSelect
                                                label={t("Type_Product")}
                                                fullWidth={true}
                                                onChange={(e) => {
                                                    setTypeSelected(e?.target?.value as string)
                                                }}
                                                value={typeSelected}
                                                options={listType}
                                                content={t("Type_Product")}
                                            ></CustomSelect>
                                        </Box>
                                        <Box sx={{
                                            width: "200px",
                                            mt: "-20px"
                                        }}>
                                            <CustomSelect
                                                label={t("Status")}
                                                fullWidth={true}
                                                onChange={(e) => {
                                                    setStatusSelected(e?.target?.value as string)
                                                }}
                                                value={statusSelected}
                                                options={Object.values(OBJECT_STATUS_Product)}
                                                content={t("Status")}
                                            ></CustomSelect>
                                        </Box>
                                        <Box sx={{
                                            width: "200px"
                                        }}>
                                            <InputSearch value={searchBy} onChange={(value: string) => {
                                                setSearchBy(value)
                                            }}></InputSearch>
                                        </Box>

                                        <AddButton
                                            disabled={!CREATE}
                                            onClick={() => {
                                                setOpenCreateEdit({
                                                    open: true,
                                                    _id: "",
                                                })
                                            }}></AddButton>
                                    </Box>
                                </>
                            )}
                            {selectedRow.length > 0 && (
                                <>
                                    <TableHeader
                                        handleAction={handleAction}
                                        onClear={() => {
                                            setSelectedRow([])
                                        }}
                                        numRow={selectedRow?.length}
                                        actions={[
                                            {
                                                label: t("Delete"),
                                                value: "Delete",
                                                disabled: !DELETE
                                            }
                                        ]}
                                    ></TableHeader>
                                </>
                            )}
                            <CustomDataGrid
                                sx={{
                                    ".selected-row": {
                                        backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.5)}`,
                                        color: `${theme.palette.primary.main}`
                                    },
                                }}
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row?._id}
                                pageSizeOptions={[5]}
                                sortingOrder={["asc", "desc"]}
                                sortingMode="server"
                                onSortModelChange={handleSort}
                                checkboxSelection
                                disableRowSelectionOnClick
                                rowSelectionModel={selectedRow}
                                onRowSelectionModelChange={(row: any) => {
                                    setSelectedRow(row);
                                }}
                                onRowClick={(row: any) => {
                                    if (row?.id) {
                                        setOpenCreateEdit({
                                            open: true,
                                            id: row?.id as string
                                        })
                                    }
                                }}
                                slots={
                                    {
                                        pagination: PaginationComponent
                                    }
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}


export default ProductList;