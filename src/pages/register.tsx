// import views/page
import RegisterPage from "src/views/pages/register"

import { NextPage } from "next"
import BlankLayout from "src/views/layouts/BlankLayout"



type TProps = {}

const Register:NextPage<TProps> = () => {
    return (
        <RegisterPage></RegisterPage>
    )
}


export default Register

Register.getLayout = (page : React.ReactNode) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true;