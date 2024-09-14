import { Box, Grid, Typography, useTheme } from "@mui/material";
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
import { resetIntitalState } from "src/stores/user";
import CofirmDialog from "src/components/cofirmation-dialog";
import { toFullName } from "src/utils";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { usePermission } from "src/hooks/usePermission";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import { deleteUsersAction, getAllUsersAction } from "src/stores/user/action";
import CreateEditUser from "./component/CreateEditUser";
import { useAuth } from "src/hooks/useAuth";





const UserList = () => {


    const [openCreateEdit, setOpenCreateEdit] = useState<any>({
        open: false,
        _id: ""
    })
    const [openCofirmDialog, setOpenCofirmDialog] = useState<any>({
        open: false,
        _id: ""
    });



    const [searchBy, setSearchBy] = useState<string>("")
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("createdAt asc");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [permissionSelected, setPermissionSelected] = useState<string[]>([]);


    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const dispatch: AppDispatch = useDispatch();

    const {
        isSuccessDeleteUser,
        isErrorDeleteUser,
        messageErrorDeleteUser,
        users,
        isSuccessCreateEdit,
        message,
        isErrorCreateEdit,
        messageErrorCreateEdit,
        isLoading
    } = useSelector((state: RootState) => state.user)

    const { VIEW, UPDATE, CREATE, DELETE } = usePermission("SYSTEM.USER", ["CREATE", "VIEW", "UPDATE", "DELETE"])

    const rows = users?.data || [];


    const columns: GridColDef<any>[] = [
        {
            field: 'FullName',
            headerName: t("Fullname"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                const fullName = toFullName(row?.lastName, row?.middleName, row?.firstName, i18n.language)

                return <>
                    <Typography>{fullName}</Typography>
                </>
            }
        },
        {
            field: 'Email',
            headerName: t("Email"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params

                return <>
                    <Typography>{row?.email}</Typography>
                </>
            }
        },
        {
            field: 'Role',
            headerName: t("Role"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params

                return <>
                    <Typography>{row?.role.name}</Typography>
                </>
            }
        },
        {
            field: 'Phone',
            headerName: t("Phone"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.phoneNumber}</Typography>
                </>
            }
        },
        {
            field: 'City',
            headerName: t("City"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true,
            renderCell: (params) => {
                const { row } = params
                return <>
                    <Typography>{row?.city && ""}</Typography>
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
                const DISABLE = ["ADMIN.GRANTED", "BASIC.PUBLIC"]
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

    }

    const PaginationComponent = () => {
        return (
            <>
                <CustomPagination
                    rowLength={users?.total}
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


    const handleGetListUsers = async () => {
        await dispatch(getAllUsersAction({
            params: {
                limit: -1,
                page: -1,
                search: searchBy,
                order: sortBy
            }
        }));
    }

    const handleSort = (sort: GridSortModel) => {
        const sortField = sort[0].field
        const sortOption = sort[0].sort
        setSortBy(`${sortField} ${sortOption}`)

    }

    const handleDelete = async () => {
        await dispatch(deleteUsersAction({ id: openCofirmDialog?._id }))
        handleOnCloseCofirmDialog();
    }


    useEffect(() => {
        handleGetListUsers();
    }, [sortBy, searchBy])




    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessCreateEdit) {
            handleGetListUsers();
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
        if (isSuccessDeleteUser) {
            handleGetListUsers();
            toast.success("Delete successfully")
        } else if (isErrorDeleteUser) {
            toast.error(messageErrorDeleteUser)
        }
        setLoadingTmp(false)
        handleOnCloseCreateEditModal();
        dispatch(resetIntitalState());
    }, [isSuccessDeleteUser, isErrorDeleteUser, messageErrorDeleteUser])





    return (
        <>
            <CofirmDialog
                open={openCofirmDialog}
                onClose={handleOnCloseCofirmDialog}
                handleAction={handleDelete}
                title={t("Cofirm form")}
                description={t("If you delete this user, it can't recover")}
            ></CofirmDialog>
            <CreateEditUser
                permissionSelected={permissionSelected}
                open={openCreateEdit?.open}
                onClose={handleOnCloseCreateEditModal}
                idUser={openCreateEdit?.id}
            >
            </CreateEditUser>
            {(isLoading && isLoadingTmp) ?? <FallbackSpinner></FallbackSpinner>}
            <Box sx={{
                backgroundColor: theme.palette.customColors.bodyBg,
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
                        <Grid item xs={12}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 2,
                            }}>
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
                            <CustomDataGrid
                                sx={{
                                    ".selected-row": {
                                        backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.2)}`,
                                        color: `${theme.palette.primary.main}`
                                    }
                                }}
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row?._id}
                                pageSizeOptions={[5]}
                                sortingOrder={["asc", "desc"]}
                                sortingMode="server"
                                onSortModelChange={handleSort}
                                disableRowSelectionOnClick
                                disableColumnMenu
                                disableColumnFilter
                                onRowClick={(row) => {
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


export default UserList;