
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CustomDataGrid from 'src/components/custom-dataGrid';
import { CONFIG_PERMISSIONS, LIST_DATA_PERMISSION } from 'src/configs/permission';
import {  Checkbox, Typography, useTheme } from '@mui/material';
import { getAllValueObject } from 'src/utils';



interface TProps {
    setPermissionSelected: React.Dispatch<React.SetStateAction<string[]>>,
    permissionSelected: string[],
    disable: boolean
}




const TablePermission = (props: TProps) => {

    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const theme = useTheme();

    const { permissionSelected, setPermissionSelected, disable } = props;


    const handleOnChangeCheckBox = (value: string) => {
        const isChecked = permissionSelected.includes(value);
        if (isChecked) {
            const filter = permissionSelected?.filter((item) => item !== value);
            setPermissionSelected(filter);
        } else {
            setPermissionSelected([...permissionSelected, value]);
        }
    }



    const handleCheckAllCheckBox = (value: string, parentValue?: string) => {
        const allValue = parentValue ? getAllValueObject(CONFIG_PERMISSIONS[parentValue][value]) :
            getAllValueObject(CONFIG_PERMISSIONS[value]);

        const isCheckedAll = allValue.every((item) => {
            return permissionSelected.includes(item);
        })

        if (isCheckedAll) {
            const filter = permissionSelected.filter((item) => !allValue.includes(item));
            setPermissionSelected(filter);
        } else {
            const uniquePermissions = new Set([...permissionSelected, ...allValue]);
            setPermissionSelected(Array.from(uniquePermissions))
        }
    }

    const handleCheckAllGroup = (parentValue: string) => {
        const allValue = getAllValueObject(CONFIG_PERMISSIONS[parentValue]);
        const isChecked = allValue.every((item) => {
            return permissionSelected.includes(item);
        })

        if (!isChecked) {
            const uniquePermissions = new Set([...permissionSelected, ...allValue]);
            setPermissionSelected(Array.from(uniquePermissions))
        } else {
            const filter = permissionSelected.filter((item) => !allValue.includes(item));
            setPermissionSelected(filter);
        }

    }

    const getValuePermission = (value: string, mode: string, parentValue?: string) => {
        try {
            return parentValue ? CONFIG_PERMISSIONS[parentValue][value][mode] : CONFIG_PERMISSIONS[value];
        } catch (error) {
            return ""
        }

    }

    const columns: GridColDef<any>[] = [
        {
            field: 'all',
            headerName: "",
            minWidth: 100,
            maxWidth: 100,
            editable: true,
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                const allValue = row?.parentValue ? getAllValueObject(CONFIG_PERMISSIONS[row?.parentValue][row?.value]) : getAllValueObject(CONFIG_PERMISSIONS[row?.value]);
                const isCheckedAll = allValue.every((item) => {
                    return permissionSelected.includes(item);
                })

                return (
                    <>
                        {!row.isHideCheckAll &&
                            (

                                <Checkbox
                                    disabled={disable}
                                    value={row?.value}
                                    onChange={(e) => {
                                        if (row?.isParent) {
                                            handleCheckAllGroup(e.target.value);
                                        } else {
                                            handleCheckAllCheckBox(e.target.value, row.parentValue);
                                        }

                                    }}
                                    checked={isCheckedAll}
                                ></Checkbox>
                            )}
                    </>
                )
            }
        },
        {
            field: 'name',
            headerName: t("Name"),
            width: 110,
            editable: true,
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params
                return (
                    <>
                        <Typography sx={{
                            color: row?.isParent ? theme.palette.primary.main : `rgba(${theme.palette.customColors.main},0.7)`,
                            marginLeft: row?.isParent ? "0px" : "20px",
                            textTransform: row?.isParent ? "Uppercase" : "normal",

                        }}>{row?.name}</Typography>
                    </>
                )
            }
        },

        {
            field: "view",
            headerName: t("View"),
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                const value = getValuePermission(row.value, "VIEW", row.parentValue);
                return (
                    <>
                        {!row?.isHideView && !row?.isParent &&
                            (
                                <Checkbox
                                    disabled={disable}
                                    checked={permissionSelected.includes(value)}
                                    value={getValuePermission(row.value, "VIEW", row.parentValue)}
                                    onChange={(e) => {
                                        handleOnChangeCheckBox(e.target.value);
                                    }}

                                ></Checkbox>
                            )}
                    </>
                )
            }
        },
        {
            field: "create",
            headerName: t("Create"),
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                const value = getValuePermission(row.value, "CREATE", row.parentValue);
                return (
                    <>
                        {!row?.isHideCreate && !row?.isParent &&
                            (
                                <Checkbox
                                    disabled={disable}
                                    checked={permissionSelected.includes(value)}
                                    value={getValuePermission(row.value, "CREATE", row.parentValue)}
                                    onChange={(e) => {
                                        handleOnChangeCheckBox(e.target.value);
                                    }}
                                ></Checkbox>
                            )}
                    </>
                )
            }
        },
        {
            field: "update",
            headerName: t("Update"),
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                const value = getValuePermission(row.value, "UPDATE", row.parentValue);
                return (
                    <>
                        {
                            !row?.isParent && !row?.isHideUpdate && <Checkbox
                                disabled={disable}
                                value={value}
                                onChange={(e) => {
                                    handleOnChangeCheckBox(e.target.value);
                                }}
                                checked={permissionSelected.includes(value)}
                            ></Checkbox>
                        }

                    </>
                )
            }
        },
        {
            field: "delete",
            headerName: t("Delete"),
            flex: 1,
            minWidth: 100,
            maxWidth: 100,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                const value = getValuePermission(row.value, "DELETE", row.parentValue);
                return (
                    <>
                        {!row?.isHideDelete && !row?.isParent &&
                            (
                                <Checkbox
                                    disabled={disable}
                                    checked={permissionSelected.includes(value)}
                                    value={getValuePermission(row.value, "DELETE", row.parentValue)}
                                    onChange={(e) => {
                                        handleOnChangeCheckBox(e?.target?.value);
                                    }}
                                ></Checkbox>
                            )}
                    </>
                )
            }
        },

    ];



    return (
        <>
            <CustomDataGrid
                rows={LIST_DATA_PERMISSION}
                columns={columns}
                pageSizeOptions={[5]}
                hideFooter
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnFilter
            />
        </>
    );
}


export default TablePermission;
