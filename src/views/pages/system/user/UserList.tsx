import { Box, Button, Chip, ChipProps, Grid, styled, Typography, useTheme } from "@mui/material";
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
import { resetIntitalState } from "src/stores/user";
import CofirmDialog from "src/components/cofirmation-dialog";
import { toFullName } from "src/utils";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { usePermission } from "src/hooks/usePermission";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import { deleteMultipleUsersAction, deleteUsersAction, getAllUsersAction } from "src/stores/user/action";
import CreateEditUser from "./component/CreateEditUser";
import TableHeader from "src/components/table-header";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import CustomSelect from "src/components/custom-select";
import { getAllRoles } from "src/services/role";
import { OBJECT_STATUS_USER } from "src/configs/users";
import { getAllCities } from "src/services/city";



type TSelectedRow =
    {
        id: string,
        role: { name: string, permissions: string[] }
    }


const ActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => {
    return {
        backgroundColor: `#3a843f29`,
        color: "#3a843f",
        fontSize: "14px",
        padding: "8px 4px",
        fontWeight: "600"
    }
})


const DeActiveUserStyled = styled(Chip)<ChipProps>(({ theme }) => {
    return {
        backgroundColor: `#da251d29`,
        color: "#da251d",
        fontSize: "14px",
        padding: "8px 4px",
        fontWeight: "600"
    }
})



const UserList = () => {
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
    const [listRole, setListRole] = useState<{ label: string, value: string }[]>([]);
    const [listCities, setListCities] = useState<{ label: string, value: string }[]>([]);



    const [searchBy, setSearchBy] = useState<string>("")
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("createdAt asc");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [selectedRow, setSelectedRow] = useState<TSelectedRow[]>([]);
    const [roleSelected, setRoleSelected] = useState<string>("");
    const [statusSelected, setStatusSelected] = useState<string>("");
    const [citySelected, setCitySelected] = useState<string>("");
    const [fillterBy, setFillterBy] = useState<Record<string, string>>({});


    const theme = useTheme();

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
        isLoading,
        isSuccessMultipleDeleteUser,
        isErrorDeleteMultipleUser,
        messageErrorDeleteMultipleUser
    } = useSelector((state: RootState) => state.user)

    const { VIEW, UPDATE, CREATE, DELETE } = usePermission("SYSTEM.USER", ["CREATE", "VIEW", "UPDATE", "DELETE"])

    const rows = users?.data || [];


    const columns: GridColDef<any>[] = [
        {
            field: i18n.language === "vi" ? "lastName" : "firstName",
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
                    <Typography>{row?.city?.name}</Typography>
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
                        <ActiveUserStyled label={t("Active")}></ActiveUserStyled>
                    ) : <DeActiveUserStyled label={t("Blocking")}></DeActiveUserStyled>}
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
                    rowLength={users?.total}
                    pageSize={pageSize}
                    page={page}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onChangePagination={handleOnChangePagination}
                ></CustomPagination>
            </>
        )
    }

    const memoDisabledDeleteUser = useMemo(() => {
        return selectedRow.some((item: TSelectedRow) => {
            return item.role.permissions?.includes(CONFIG_PERMISSIONS.ADMIN)
        })
    }, [selectedRow])

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
        setFillterBy({});
        setSortBy("")
        setSearchBy("");
        setStatusSelected("")
        setRoleSelected("")
        setCitySelected("")
        handleGetListUsers();
    }


    const handleGetListUsers = async () => {
        const query: any = {
            params: {
                limit: pageSize,
                page: page,
                search: searchBy,
                order: sortBy,
                ...fillterBy
            }
        }
        await dispatch(getAllUsersAction(query));
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
        dispatch(deleteUsersAction({ id: openCofirmDialog?._id }))
        handleOnCloseCofirmDialog();
    }

    const handleDeleteMultipleUser = () => {
        const data = selectedRow?.map((item: TSelectedRow) => item.id)
        dispatch(deleteMultipleUsersAction({
            userIds: data
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "Delete":
                setOpenCofirmMultipleDialog({ open: true });
                break;
        }
    }

    const fetchAllRoles = async () => {
        setLoadingTmp(true);
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
            setLoadingTmp(false);
        })
        setLoadingTmp(false);
    }


    const fetchAllCities = async () => {
        setLoadingTmp(true);
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
            setLoadingTmp(false);
        })
        setLoadingTmp(false);
    }


    useEffect(() => {
        handleGetListUsers();
    }, [sortBy, searchBy, i18n, page, pageSize, fillterBy])


    useEffect(() => {
        fetchAllRoles();
        fetchAllCities();
    }, [])

    useEffect(() => {
        setFillterBy({ roleId: roleSelected, status: statusSelected, cityId:citySelected })
    }, [roleSelected, statusSelected,citySelected])

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



    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessMultipleDeleteUser) {
            handleGetListUsers();
            toast.success("Delete successfully")
        } else if (isErrorDeleteMultipleUser) {
            toast.error(messageErrorDeleteMultipleUser)
        }
        setLoadingTmp(false)
        handleOnCloseCofirmMultiple()
        dispatch(resetIntitalState());
    }, [isSuccessMultipleDeleteUser, isErrorDeleteMultipleUser, messageErrorDeleteMultipleUser])





    return (
        <>
            <CofirmDialog
                open={openCofirmDialog}
                onClose={handleOnCloseCofirmDialog}
                handleAction={handleDelete}
                title={t("Cofirm form")}
                description={t("If you delete this user, it can't recover")}
            ></CofirmDialog>
            <CofirmDialog
                open={openCofirmMultipleDialog}
                onClose={handleOnCloseCofirmMultiple}
                handleAction={handleDeleteMultipleUser}
                title={t("Delete Multiple Users")}
                description={t("If you delete users, it can't recover")}
            ></CofirmDialog>
            <CreateEditUser
                open={openCreateEdit?.open}
                onClose={handleOnCloseCreateEditModal}
                idUser={openCreateEdit?.id}
            >
            </CreateEditUser>
            {(isLoading && isLoadingTmp) ?? <FallbackSpinner></FallbackSpinner>}
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
                        <Grid item xs={12}>
                            {selectedRow.length <= 0 && (
                                <>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "center",
                                        marginBottom: 5,
                                        gap: "5px",
                                        flexDirection: { md: "row", xs: "column" }
                                    }
                                    }>
                                        <Box>
                                            <Button onClick={handleClearFilter} sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.common.white
                                            }}>{t("Clear filter")}</Button>
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
                                                options={Object.values(OBJECT_STATUS_USER)}
                                                content={t("Status")}
                                            ></CustomSelect>

                                        </Box>
                                        <Box sx={{
                                            width: "200px",
                                            mt: { md: "-20px", xs: "0" }
                                        }}>
                                            <CustomSelect
                                                label={t("Role")}
                                                fullWidth={true}
                                                onChange={(e) => {
                                                    setRoleSelected(e?.target?.value as string)
                                                }}
                                                value={roleSelected}
                                                options={listRole}
                                                content={t("Role")}
                                            ></CustomSelect>
                                        </Box>
                                        <Box sx={{
                                            width: "200px",
                                            mt: { md: "-20px", xs: "0" }
                                        }}>
                                            <CustomSelect
                                                label={t("City")}
                                                fullWidth={true}
                                                onChange={(e) => {
                                                    setCitySelected(e?.target?.value as string)
                                                }}
                                                value={citySelected}
                                                options={listCities}
                                                content={t("City")}
                                            ></CustomSelect>
                                        </Box>
                                        <Box sx={{
                                            width: "200px"
                                        }}>
                                            <InputSearch
                                                value={searchBy}
                                                onChange={(value: string) => {
                                                    setSearchBy(value)
                                                }}>
                                            </InputSearch>
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
                                                disabled: memoDisabledDeleteUser || !DELETE
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
                                rowSelectionModel={selectedRow?.map((item: any) => {
                                    return item.id
                                })}
                                onRowSelectionModelChange={(row: any) => {
                                    const formatData: any = row.map((id: string) => {
                                        const findRow: any = users?.data?.find((item: any) => item._id === id)
                                        if (findRow) {
                                            return { id: findRow?._id, role: findRow?.role }
                                        }
                                    })
                                    setSelectedRow(formatData);
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


export default UserList;