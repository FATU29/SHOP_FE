import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
import { resetIntitalState } from "src/stores/city";
import CofirmDialog from "src/components/cofirmation-dialog";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { usePermission } from "src/hooks/usePermission";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import TableHeader from "src/components/table-header";
import { deleteCityAction, deleteMultipleCitiesAction, getAllCitiesAction } from "src/stores/city/action";
import CreateEditCity from "./component/CreateEditCity";




const CityList = () => {
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


    const theme = useTheme();

    const dispatch: AppDispatch = useDispatch();

    const {
        isSuccessDeleteCity,
        isErrorDeleteCity,
        messageErrorDeleteCity,
        cities,
        isSuccessCreateEdit,
        message,
        isErrorCreateEdit,
        messageErrorCreateEdit,
        isLoading,
        isSuccessMultipleDeleteCity,
        isErrorDeleteMultipleCity,
        messageErrorDeleteMultipleCity
    } = useSelector((state: RootState) => state.city)


    const { VIEW, UPDATE, CREATE, DELETE } = usePermission("SETTING.CITY", ["CREATE", "VIEW", "UPDATE", "DELETE"])

    const rows = cities?.data || [];


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
                    rowLength={cities?.total}
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

    const handleClearFilter = () => {
        setSortBy("")
        setSearchBy("");
        handleGetListCities();
    }

    const handleGetListCities = async () => {
        const query: any = {
            params: {
                limit: pageSize,
                page: page,
                search: searchBy,
                order: sortBy,
            }
        }
        await dispatch(getAllCitiesAction(query));
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
        dispatch(deleteCityAction({ id: openCofirmDialog?._id }))
        handleOnCloseCofirmDialog();
    }

    const handleDeleteMultipleCities = () => {
        dispatch(deleteMultipleCitiesAction({
            cityIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "Delete":
                setOpenCofirmMultipleDialog({ open: true });
                break;
        }
    }



    useEffect(() => {
        handleGetListCities();
    }, [sortBy, searchBy, i18n, page, pageSize])



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessCreateEdit) {
            handleGetListCities();
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
        if (isSuccessDeleteCity) {
            handleGetListCities();
            toast.success("Delete successfully")
        } else if (isErrorDeleteCity) {
            toast.error(messageErrorDeleteCity)
        }
        setLoadingTmp(false)
        handleOnCloseCreateEditModal();
        dispatch(resetIntitalState());
    }, [isSuccessDeleteCity, isErrorDeleteCity, messageErrorDeleteCity])



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessMultipleDeleteCity) {
            handleGetListCities();
            toast.success("Delete successfully")
        } else if (isErrorDeleteMultipleCity) {
            toast.error(messageErrorDeleteMultipleCity)
        }
        setLoadingTmp(false)
        handleOnCloseCofirmMultiple()
        dispatch(resetIntitalState());
    }, [isSuccessMultipleDeleteCity, isErrorDeleteMultipleCity, messageErrorDeleteMultipleCity])


    return (
        <>
            <CofirmDialog
                open={openCofirmDialog}
                onClose={handleOnCloseCofirmDialog}
                handleAction={handleDelete}
                title={t("Cofirm form")}
                description={t("If you delete this city, it can't recover")}
            ></CofirmDialog>
            <CofirmDialog
                open={openCofirmMultipleDialog}
                onClose={handleOnCloseCofirmMultiple}
                handleAction={handleDeleteMultipleCities}
                title={t("Delete Multiple Cities")}
                description={t("If you delete cities, it can't recover")}
            ></CofirmDialog>
            <CreateEditCity
                open={openCreateEdit?.open}
                onClose={handleOnCloseCreateEditModal}
                idCity={openCreateEdit?.id}
            >
            </CreateEditCity>
            {(isLoading || isLoadingTmp) ?? <FallbackSpinner></FallbackSpinner>}
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


export default CityList;