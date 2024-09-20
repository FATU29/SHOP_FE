import { REFRESH_TOKEN } from "./auth";


export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export const API_ENDPOINT = {
    AUTH: {
        INDEX: `${BASE_URL}/auth/login`,
        AUTH_ME: `${BASE_URL}/auth/me`,
        LOGOUT: `${BASE_URL}/auth/logout`,
        REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
        REGISTER: `${BASE_URL}/auth/register`,
        CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`
    },
    SYSTEM: {
        ROLE: {
            INDEX: `${BASE_URL}/roles`,
        },
        USER: {
            INDEX: `${BASE_URL}/users`,
        },
    },
    SETTING: {
        CITY: {
            INDEX: `${BASE_URL}/city`,
        },
        DELIVERY_TYPE: {
            INDEX: `${BASE_URL}/delivery-type`,
        },
        PAYMENT_TYPE: {
            INDEX:`${BASE_URL}/payment-type`,
        }
    },
    MANAGE_PRODUCT:{
        PRODUCT_TYPE:{
            INDEX:`${BASE_URL}/product-types`,
        },
        PRODUCT:{
            INDEX:`${BASE_URL}/products`,
        }
    }
}


