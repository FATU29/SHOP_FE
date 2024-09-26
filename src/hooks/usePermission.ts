import { useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { CONFIG_PERMISSIONS } from "src/configs/permission";



type TActions = "CREATE" | "VIEW" | "UPDATE" | "DELETE"


export const usePermission = (key: string, actions: TActions[]) => {
    const defaultValue:any = {
        VIEW: false,
        CREATE: false,
        UPDATE: false,
        DELETE: false
    }
    const { user } = useAuth();
    const [permission, setPermission] = useState(defaultValue);

    const userPermission = user?.role?.permissions;

    const getObjectValue = (obj: any, key: string) => {
        const keys = key.split(".");
        let result = obj;
        if (keys && !!key.length) {
            for (const k of keys) {
                if (k in obj) {
                    result = result[k];
                } else {
                    return undefined
                }

            }
        }
        return result;
    }

    useEffect(() => {
        const mapPermission = getObjectValue(CONFIG_PERMISSIONS, key)
        actions.forEach((mode:any) => {
            if (userPermission?.includes(CONFIG_PERMISSIONS.ADMIN)){
                defaultValue[mode] = true
            } else if(userPermission?.includes(mapPermission[mode])){
                defaultValue[mode] = true
            } else {
                defaultValue[mode] = false
            }
        })
        setPermission(defaultValue)
    }, [user?.role])


    return permission;
}