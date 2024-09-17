import { useTranslation } from "react-i18next"


export const PAYMENT_TYPES = () => {
    const {t} = useTranslation();
    return {
        PAYMENT_LATER: {
            label:t("PAYMENT_LATER"),
            value:'PAYMENT_LATER'
        },
        VN_PAYMENT: {
            label:t("VN_PAYMENT"),
            value:'VN_PAYMENT'
        },
        PAYPAL:{
            label:t("PAYPAL"),
            value:"PAYPAL"
        }
    }
}