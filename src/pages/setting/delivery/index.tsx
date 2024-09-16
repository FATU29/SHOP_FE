import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import DeliveryTypeList from "src/views/pages/settings/delivery/DeliveryTypeList";





type TProps = {}

const SettingDelivery : NextPage<TProps> = () => {
    return (
        <>
            <DeliveryTypeList></DeliveryTypeList>
        </>
    )
}

SettingDelivery.permission = [CONFIG_PERMISSIONS.SETTING.DELIVERY_TYPE.VIEW]
export default SettingDelivery;