// ** configs
import { CONFIG_API } from "src/configs/api";

// ** type
import { TLoginAuth } from "src/styles/auth";

// ** fetch
import { instanceAxios } from "src/helpers/intercepterAxios";

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
    throw error; // Rethrow to allow caller to handle it
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
    throw error; // Rethrow to allow caller to handle it
  }
};
