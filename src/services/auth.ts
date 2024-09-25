// ** configs
import { API_ENDPOINT } from "src/configs/api";

// ** type
import { TChangePassword, TLoginAuth, TRegisterAuth } from "src/types/auth";

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
  const loginAPI: string = API_ENDPOINT.AUTH.INDEX;
  const response = await axios(loginAPI, {
    method: "POST",
    headers,
    data: JSON.stringify(data), // Use data instead of body
  });
  return response.data;
};

export const logoutAuth = async () => {
  try {
    const logoutAPI = API_ENDPOINT.AUTH.LOGOUT;
    const response = await instanceAxios(logoutAPI, {
      method: "POST",
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error in logoutAuth /src/services/auth:", error);
    return error
  }
};



export const registerAuth = async (data: TRegisterAuth) => {

  const registerAPI = API_ENDPOINT.AUTH.REGISTER
  const res = await axios(registerAPI, {
    method: "POST",
    headers,
    data: JSON.stringify(data)
  })
  return res.data;

};


export const updateAuthMe = async (data: any) => {
  try {
    const updateAuthMeAPI = API_ENDPOINT.AUTH.AUTH_ME;
    const res = await instanceAxios(updateAuthMeAPI, {
      method: "PUT",
      headers,
      data: data
    });

    return res.data;
  } catch (error) {
    return error;
  }
}


export const getAuthMe = async () => {
  try {
    const getAuthMeAPI = API_ENDPOINT.AUTH.AUTH_ME;
    const res = await axios(getAuthMeAPI, {
      method: "GET",
      headers
    })
    return res.data
  } catch (error) {
    return error
  }
} 

export const changePasswordMe = async (data:TChangePassword) => {
  try {
    const getAuthMeAPI = API_ENDPOINT.AUTH.CHANGE_PASSWORD;
    const res = await axios(getAuthMeAPI, {
      method: "PATCH",
      headers,
      data:JSON.stringify(data)
    })
    return res.data
  } catch (error) {
    return error
  }
} 