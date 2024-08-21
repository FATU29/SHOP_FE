import { Box, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { deleteRoleAction, getAllRolesAction } from "src/stores/role/action";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "src/components/custom-dataGrid";
import { useTranslation } from "react-i18next";
import { PAGE_SIZE_OPTIONS } from "src/configs/gridConfig";
import CustomPagination from "src/components/custom-pagination";
import AddButton from "src/components/grid-add";
import InputSearch from "src/components/input-search";
import CreateEditModal from "./component/CreateEditModal";
import FallbackSpinner from "src/components/fall-back";
import toast from "react-hot-toast";
import DeleteButton from "src/components/grid-delete";
import EditButton from "src/components/grid-edit";
import { string } from "yup";
import { resetIntitalState } from "src/stores/role";





const RoleList = () => {

    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [openCreateEdit, setOpenCreateEdit] = useState<any>({
        open: false,
        _id: ""
    })
    const [isLoadingTmp, setLoadingTmp] = useState<boolean>(false);

    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const { isSuccessDeleteRole, isErrorDeleteRole, messageErrorDeleteRole, roles, isSuccessCreateEdit, message, isErrorCreateEdit, messageErrorCreateEdit, isLoading } = useSelector((state: RootState) => state.role)




    const columns: GridColDef<any>[] = [
        {
            field: 'name',
            headerName: t("Name"),
            width: 150,
            editable: true,
            flex: 1,
            sortable: false
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
                            <EditButton onClick={() => {
                                setOpenCreateEdit({
                                    open: true,
                                    _id: row.id as string,
                                })
                            }}></EditButton>
                            <DeleteButton onClick={() => {
                                dispatch(deleteRoleAction({ id: String(row.id) }))
                            }}></DeleteButton>
                        </Box>
                    </>
                )
            }
        }
    ];


    const rows = roles.data;



    const handleGetListRoles = () => {
        dispatch(getAllRolesAction({
            params: {
                limit: -1,
                page: -1
            }
        }));
    }

    const handleOnChangePagination = (page: number, pageSize: number) => {

    }

    const handleOnCloseCreateEditModal = () => {
        setOpenCreateEdit({
            open: false,
            _id: ""
        })

    }

    const PaginationComponent = () => {
        return (
            <>
                <CustomPagination
                    rowLength={roles.total}
                    pageSize={pageSize}
                    page={page}
                    pageSizeOptions={PAGE_SIZE_OPTIONS}
                    onChangePagination={handleOnChangePagination}
                ></CustomPagination>
            </>
        )
    }


    useEffect(() => {
        handleGetListRoles();
    }, [])

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
            <CreateEditModal open={openCreateEdit.open} onClose={handleOnCloseCreateEditModal} idRole={openCreateEdit._id}></CreateEditModal>
            {( isLoading && isLoadingTmp) ?? <FallbackSpinner></FallbackSpinner>}
            <Box sx={{
                backgroundColor: theme.palette.customColors.lightPaperBg
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                    flexDirection: "column"
                }}>

                    <Grid container>
                        <Grid item md={7} xs={12}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 2
                            }}>
                                <Box sx={{
                                    width: "200px"
                                }}>
                                    <InputSearch></InputSearch>
                                </Box>
                                <AddButton onClick={() => {
                                    setOpenCreateEdit({
                                        open: true,
                                        _id: "",
                                    })
                                }}></AddButton>
                            </Box>
                            <CustomDataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row._id}
                                pageSizeOptions={[5]}
                                disableRowSelectionOnClick
                                hideFooter
                                disableColumnMenu
                                disableColumnFilter
                            />
                        </Grid>
                        <Grid item md={5} xs={12}>
                            List permission
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}


export default RoleList;