import { NextPage } from "next";
import React from "react";
import LayoutNoApp from "src/views/layouts/LayoutNoApp";
import ChangePasswordPage from "src/views/pages/change-password";


type TProps = {}


const ChangePassword:NextPage<TProps> = () => {
    return (
        <>
            <ChangePasswordPage></ChangePasswordPage>
        </>
    )
}


export default ChangePassword;

ChangePassword.getLayout = (page : React.ReactNode) => <><LayoutNoApp>{page}</LayoutNoApp> </>