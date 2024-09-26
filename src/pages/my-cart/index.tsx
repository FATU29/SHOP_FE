import { NextPage } from "next";
import React from "react";
import LayoutNoApp from "src/views/layouts/LayoutNoApp";
import MyCartPage from "src/views/pages/my-cart";


type TProps = {}


const Index : NextPage<TProps> = () => {
    return (
        <>
            <MyCartPage></MyCartPage>
        </>
    )
}

export default Index;
Index.getLayout = (page: React.ReactNode) => <><LayoutNoApp>{page}</LayoutNoApp></>
