// import views/page
import RegisterPage from "src/views/pages/register"

import { NextPage } from "next"
import BlankLayout from "src/views/layouts/BlankLayout"



type TProps = {}

const Index:NextPage<TProps> = () => {
    return (
        <RegisterPage></RegisterPage>
    )
}


Index.guestGuard = true;
Index.getLayout = (page : React.ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Index
