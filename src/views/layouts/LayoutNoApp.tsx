import { Box, CssBaseline } from "@mui/material";
import { NextPage } from "next/types";
import React from "react";
import HorizontalLayout from "./HorizontalLayout";




type TProps = {
    children: React.ReactNode
}


const LayoutNoApp: NextPage<TProps> = ({children}) => {

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <>
            <Box>
                <CssBaseline />
                <HorizontalLayout open={false} toggleDrawer={toggleDrawer}></HorizontalLayout>
            </Box>
            {children}
        </>
    )
}



export default LayoutNoApp;