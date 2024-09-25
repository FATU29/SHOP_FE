import { Toolbar } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import BlankLayout from "src/views/layouts/BlankLayout";
import LayoutNoApp from "src/views/layouts/LayoutNoApp";
import MyProfile from "src/views/pages/my-profile";
import DetailProductPage from "src/views/pages/product/DetailProduct";



type TProps = {}


const Product : NextPage<TProps> = () => {
    return (
        <>
            <Toolbar></Toolbar>
            <DetailProductPage></DetailProductPage>
        </>
    )
}



Product.guestGuard = false;
Product.authGuard = false;
Product.getLayout = (page: React.ReactNode) => <><LayoutNoApp>{page}</LayoutNoApp></>
export default Product;
