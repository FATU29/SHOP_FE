import { Box, Container, CssBaseline, Toolbar, useTheme } from "@mui/material";
import { NextPage } from "next/types";
import React from "react";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";




type TProps = {
    children: React.ReactNode
}


const LayoutNoApp: NextPage<TProps> = ({ children }) => {

    const theme = useTheme();

    return (
        <>
            <Box>
                <CssBaseline />
                <HorizontalLayout open={false} toggleDrawer={() => { }} isHidden={true}></HorizontalLayout>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg"
                        sx={{
                            mt: 4,
                            mb: 4,
                        }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    )
}



export default LayoutNoApp;