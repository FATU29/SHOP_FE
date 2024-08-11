// ** configs
import { CONFIG_API } from "src/configs/api";

// ** type
import { TLoginAuth, TRegisterAuth } from "src/styles/auth";

// ** fetch
import { instanceAxios } from "src/helpers/intercepterAxios";
import { ROUTE_CONFIG } from "src/configs/route";
import axios from "axios";

// ** common headers
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const loginAPI: string = CONFIG_API.AUTH.INDEX;
    const response = await instanceAxios(loginAPI, {
      method: "POST",
      headers,
      data: JSON.stringify(data), // Use data instead of body
    });
    return response.data;
  } catch (error) {
    console.error("Error in loginAuth /src/services/auth:", error);
  }
};

export const logoutAuth = async () => {
  try {
    const logoutAPI = CONFIG_API.AUTH.LOGOUT;
    const response = await instanceAxios(logoutAPI, {
      method: "POST",
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error in logoutAuth /src/services/auth:", error);
  }
};



export const registerAuth = async (data: TRegisterAuth) => {

  const registerAPI = CONFIG_API.AUTH.REGISTER
  const res = await axios(registerAPI, {
    method: "POST",
    headers,
    data: JSON.stringify(data)
  })
  return res.data;

};
