import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import UserList from "src/views/pages/system/user/UserList";





type TProps = {}

const SystemUser : NextPage<TProps> = () => {
    return (
        <>
            <UserList></UserList>
        </>
    )
}

SystemUser.permission = [CONFIG_PERMISSIONS.SYSTEM.USER.VIEW]
export default SystemUser;