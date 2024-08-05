import { Box, CssBaseline } from "@mui/material";
import { NextPage } from "next/types";
import React from "react";
import HorizontalLayout from "./HorizontalLayout";




type TProps = {
    children: React.ReactNode
}


const LayoutNoApp: NextPage<TProps> = ({children}) => {
    return (
        <>
            <Box>
                <CssBaseline />
                <HorizontalLayout open={false} toggleDrawer={() => {}} isHidden={true}></HorizontalLayout>
            </Box>
            {children}
        </>
    )
}



export default LayoutNoApp;