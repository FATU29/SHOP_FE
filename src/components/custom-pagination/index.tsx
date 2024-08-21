import React from "react";
import { Box, Pagination, Select, MenuItem, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface CustomPaginationProps {
    rowLength: number;
    pageSize: number;
    page: number;
    pageSizeOptions: number[];
    onChangePagination: (page: number, pageSize: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ 
    rowLength, 
    pageSize, 
    page, 
    pageSizeOptions, 
    onChangePagination 
}) => {
    
    const totalPages = Math.ceil(rowLength / pageSize);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onChangePagination(value, pageSize);
    };

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
        onChangePagination(page, parseInt(event.target.value as string, 10));
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} p={2} borderTop={`1px solid`} borderColor="divider">
            <Typography variant="body2">
                {`Showing ${pageSize * (page - 1) + 1}-${Math.min(pageSize * page, rowLength)} of ${rowLength}`}
            </Typography>
            <Box display="flex" alignItems="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    size="small"
                />
                <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    variant="outlined"
                    size="small"
                    sx={{ ml: 2, minWidth: 75 }}
                >
                    {pageSizeOptions.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}  
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};

export default CustomPagination;
