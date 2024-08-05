import { Box, BoxProps, styled } from "@mui/material";
import { NextPage } from "next";



type TProps = {
    children: React.ReactNode
}

const BlankLayoutWrapper = styled(Box)<BoxProps>(({theme}) => {
    return {
        height:"100vh"
    }
}
)


const BlankLayout :NextPage<TProps> = ({children}) => {
    return (
        <>
            <BlankLayoutWrapper>
                <Box sx={{
                    overflow:"hidden",
                    minHeight: "100vh"
                }}>
                    {children}
                </Box>
            </BlankLayoutWrapper>
        </>
    )
}

export default BlankLayout;