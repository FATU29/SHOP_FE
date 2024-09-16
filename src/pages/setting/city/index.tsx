import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import CityList from "src/views/pages/settings/city/CityList";





type TProps = {}

const SettingCity : NextPage<TProps> = () => {
    return (
        <>
            <CityList></CityList>
        </>
    )
}


SettingCity.permission = [CONFIG_PERMISSIONS.SETTING.CITY.VIEW]
export default SettingCity;