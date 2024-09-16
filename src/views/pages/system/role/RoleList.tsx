import { Box, Button, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { deleteRoleAction, getAllRolesAction, updateRoleAction } from "src/stores/role/action";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import CustomDataGrid from "src/components/custom-dataGrid";
import { useTranslation } from "react-i18next";
import AddButton from "src/components/grid-add";
import InputSearch from "src/components/input-search";
import FallbackSpinner from "src/components/fall-back";
import toast from "react-hot-toast";
import DeleteButton from "src/components/grid-delete";
import EditButton from "src/components/grid-edit";
import { resetIntitalState } from "src/stores/role";
import CofirmDialog from "src/components/cofirmation-dialog";
import TablePermission from "./component/TablePermission";
import { getDetailRole } from "src/services/role";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import { getAllValueObject } from "src/utils";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { usePermission } from "src/hooks/usePermission";
import CreateEditRole from "./component/CreateEditRole";





const RoleList = () => {


    const [openCreateEdit, setOpenCreateEdit] = useState<any>({
        open: false,
        _id: ""
    })
    const [searchBy, setSearchBy] = useState<string>("")
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("name asc");
    const [openCofirmDialog, setOpenCofirmDialog] = useState<any>({
        open: false,
        _id: ""
    });
    const [permissionSelected, setPermissionSelected] = useState<string[]>([]);
    const [selectedRow, setSelectedRow] = useState<any>({
        id: "",
        name: ""
    });
    const [isDisablePermission, setIsDisablePermission] = useState<boolean>(false);


    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessDeleteRole, isErrorDeleteRole, messageErrorDeleteRole, roles, isSuccessCreateEdit, message, isErrorCreateEdit, messageErrorCreateEdit, isLoading } = useSelector((state: RootState) => state.role)

    const { VIEW, UPDATE, CREATE, DELETE } = usePermission("SYSTEM.ROLE", ["CREATE", "VIEW", "UPDATE", "DELETE"])


    const columns: GridColDef<any>[] = [
        {
            field: 'name',
            headerName: t("Name"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: true
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
                                //disabled={DISABLE.includes(row.row.permissions[0])}
                                disabled={!UPDATE || DISABLE.includes(row.row.permissions[0])}
                                onClick={() => {
                                    setOpenCreateEdit({
                                        open: true,
                                        _id: row.id as string,
                                    })
                                }}></EditButton>
                            <DeleteButton
                                //disabled={DISABLE.includes(row.row.permissions[0])}
                                disabled={!DELETE || DISABLE.includes(row.row.permissions[0])}
                                onClick={() => {
                                    setOpenCofirmDialog({
                                        open: true,
                                        _id: row.id as string
                                    })

                                }}></DeleteButton>
                        </Box>
                    </>
                )
            }
        }
    ];


    const rows = roles.data;


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




    const handleGetListRoles = () => {
        dispatch(getAllRolesAction({
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
        await dispatch(deleteRoleAction({ id: openCofirmDialog._id }))
        handleOnCloseCofirmDialog();
    }

    const handleGetDetailRole = async (id: string) => {
        setLoadingTmp(true)
        await getDetailRole(id).then((res) => {
            if (res?.data) {
                // const isDefaultPermission = [CONFIG_PERMISSIONS.ADMIN, CONFIG_PERMISSIONS.BASIC].some((item) => {
                //     return res?.data.permissions.includes(item);
                // })
                if (res?.data.permissions.includes(CONFIG_PERMISSIONS.ADMIN)) {
                    setIsDisablePermission(true);
                    setPermissionSelected(getAllValueObject(CONFIG_PERMISSIONS, [CONFIG_PERMISSIONS.ADMIN, CONFIG_PERMISSIONS.BASIC]))
                } else if (res?.data.permissions.includes(CONFIG_PERMISSIONS.BASIC)) {
                    setPermissionSelected(CONFIG_PERMISSIONS.DASHBOARD)
                    setIsDisablePermission(true);
                }
                else {
                    setPermissionSelected(res?.data?.permissions || [])
                    setIsDisablePermission(false);
                }
            }
        }).catch((e) => {
            setLoadingTmp(false);
        })
        setLoadingTmp(false);
    }

    const handleUpdateRole = (id: string, name: string,) => {
        dispatch(updateRoleAction({ id: id, name: name, permissions: permissionSelected }));

    }

    useEffect(() => {
        handleGetListRoles();
    }, [sortBy, searchBy])

    useEffect(() => {
        if (selectedRow.id) {
            handleGetDetailRole(selectedRow.id)
        }
    }, [selectedRow.id, selectedRow.name])


    useEffect(() => {
        setLoadingTmp(true)
        if (isSuccessCreateEdit) {
            handleGetListRoles();
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
        if (isSuccessDeleteRole) {
            handleGetListRoles();
            toast.success("Delete successfully")
        } else if (isErrorDeleteRole) {
            toast.error(messageErrorDeleteRole)
        }
        setLoadingTmp(false)
        handleOnCloseCreateEditModal();
        dispatch(resetIntitalState());
    }, [isSuccessDeleteRole, isErrorDeleteRole, messageErrorDeleteRole])




    return (
        <>
            <CofirmDialog
                open={openCofirmDialog}
                onClose={handleOnCloseCofirmDialog}
                handleAction={handleDelete}
                title={t("Cofirm form")}
                description={t("If you delete this role, it can't recover")}
            ></CofirmDialog>
            <CreateEditRole permissionSelected={permissionSelected} open={openCreateEdit.open} onClose={handleOnCloseCreateEditModal} idRole={openCreateEdit._id}></CreateEditRole>
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
                        <Grid item md={4} xs={12}>
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
                                        setSelectedRow({
                                            id: "",
                                            name: ""
                                        })
                                    }}></AddButton>
                            </Box>
                            <CustomDataGrid
                                sx={{
                                    ".selected-row": {
                                        backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.5)}`,
                                        color: `${theme.palette.primary.main}`
                                    },
                                }}
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row._id}
                                pageSizeOptions={[5]}
                                sortingOrder={["asc", "desc"]}
                                sortingMode="server"
                                onSortModelChange={handleSort}
                                hideFooter
                                disableRowSelectionOnClick
                                disableColumnMenu
                                disableColumnFilter
                                getRowClassName={(row) => {
                                    return row.id === selectedRow.id ? "selected-row" : ""
                                }}
                                onRowClick={(row) => {
                                    setSelectedRow({ id: row?.id as string, name: row.row.name });
                                }}
                            />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            {selectedRow?.id &&
                                (<><TablePermission
                                    setPermissionSelected={setPermissionSelected}
                                    permissionSelected={permissionSelected}
                                    disable={isDisablePermission}
                                ></TablePermission>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        marginTop: "10px"
                                    }}>
                                        <Button disabled={isDisablePermission} variant='contained' onClick={() => {
                                            handleUpdateRole(selectedRow.id, selectedRow.name)
                                        }}>{t("Update")}</Button>
                                    </Box></>)
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}


export default RoleList;