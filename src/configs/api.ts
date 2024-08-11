import { REFRESH_TOKEN } from "./auth";


export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export const CONFIG_API = {
    AUTH:{
        INDEX:`${BASE_URL}/auth/login`,
        AUTH_ME:`${BASE_URL}/auth/me`,
        LOGOUT:`${BASE_URL}/auth/logout`,
        REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
        REGISTER:`${BASE_URL}/auth/register`
    }
}