// ** configs
import { CONFIG_API } from "src/configs/api";

// ** type
import { TLoginAuth } from "src/styles/auth";

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const loginAPI: string = CONFIG_API.AUTH.INDEX;
    console.log({ loginAPI, data });

    const res = await fetch(loginAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const dataRes = await res.json();
    console.log(dataRes);
    return dataRes;
  } catch (e) {
    console.error("Error in loginAuth /src/services/auth:", e);
    return null;
  }
};
