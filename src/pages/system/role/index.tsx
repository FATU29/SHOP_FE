import { NextPage } from "next";
import RoleList from "src/views/pages/system/role/RoleList";





type TProps = {}

const SystemRole : NextPage<TProps> = () => {
    return (
        <>
            <RoleList></RoleList>
        </>
    )
}


export default SystemRole;