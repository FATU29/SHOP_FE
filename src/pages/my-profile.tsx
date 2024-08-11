import { NextPage } from "next";
import React from "react";
import BlankLayout from "src/views/layouts/BlankLayout";
import LayoutNoApp from "src/views/layouts/LayoutNoApp";
import MyProfile from "src/views/pages/my-profile";



type TProps = {}


const Profile : NextPage<TProps> = () => {
    return (
        <>
            <MyProfile></MyProfile>
        </>
    )
}

export default Profile;
Profile.getLayout = (page: React.ReactNode) => <><LayoutNoApp>{page}</LayoutNoApp></>
