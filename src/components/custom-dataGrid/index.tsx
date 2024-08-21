import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styled } from '@mui/material';

// Styled component for the DataGrid
const StyledCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  "& .MuiDataGrid-main": {
    border: `1px solid ${theme.palette.customColors?.borderColor || '#ccc'}`, // Fall back to a default color
    borderRadius: "8px",
  },
}));

// ForwardRef component for CustomDataGrid
const CustomDataGrid = React.forwardRef<HTMLDivElement, DataGridProps>((props, ref) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledCustomGrid
        {...props}
        ref={ref}  // Ensure ref is passed to the StyledCustomGrid
      />
    </Box>
  );
});

// Adding a displayName is helpful for debugging
CustomDataGrid.displayName = 'CustomDataGrid';

export default CustomDataGrid;
