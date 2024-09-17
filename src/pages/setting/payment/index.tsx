import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import PaymentTypeList from "src/views/pages/settings/payment/PaymentTypeList";





type TProps = {}

const SettingPayment : NextPage<TProps> = () => {
    return (
        <>
            <PaymentTypeList></PaymentTypeList>
        </>
    )
}



SettingPayment.permission = [CONFIG_PERMISSIONS.SETTING.PAYMENT_TYPE.VIEW]
export default SettingPayment;