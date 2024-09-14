import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import RoleList from "src/views/pages/system/role/RoleList";





type TProps = {}

const SystemRole : NextPage<TProps> = () => {
    return (
        <>
            <RoleList></RoleList>
        </>
    )
}


SystemRole.permission = [CONFIG_PERMISSIONS.SYSTEM.ROLE.VIEW]
export default SystemRole;