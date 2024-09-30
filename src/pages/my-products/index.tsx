import { NextPage } from "next";
import React from "react";
import LayoutNoApp from "src/views/layouts/LayoutNoApp";
import MyProductsPage from "src/views/pages/my-product";


type TProps = {}


const Index : NextPage<TProps> = () => {
    return (
        <>
            <MyProductsPage></MyProductsPage>
        </>
    )
}


Index.authGuard = true;
export default Index;
Index.getLayout = (page: React.ReactNode) => <><LayoutNoApp>{page}</LayoutNoApp></>
