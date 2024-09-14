import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";





type TProps = {}

const TypeOrder : NextPage<TProps> = () => {
    return (
        <>
            TypeOrder
        </>
    )
}

TypeOrder.permission = [CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
export default TypeOrder;