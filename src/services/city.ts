import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateCity, TParamsDeleteMultipleCities, TParamsDeleteCity, TParamsEditCity, TParamsGetCities } from "src/types/city";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllCities = async (data: { params: TParamsGetCities }) => {
  try {
    const getAll = API_ENDPOINT.SETTING.CITY.INDEX;
    const res = await instanceAxios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting City:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createCity = async (data: TParamsCreateCity) => {
  try {
    const index = API_ENDPOINT.SETTING.CITY.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating City:", error);
    throw error;
  }
};

export const updateCities = async (data: TParamsEditCity) => {
  try {
    const index = API_ENDPOINT.SETTING.CITY.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating City:", error);
    throw error;
  }
};

export const deleteCity = async (data: TParamsDeleteCity) => {
  try {
    const index = API_ENDPOINT.SETTING.CITY.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting City:", error);
    throw error;
  }
};

export const deleteMultipleCities = async (data: TParamsDeleteMultipleCities) => {
  try {
    const index = API_ENDPOINT.SETTING.CITY.INDEX;
    const res = await instanceAxios(`${index}/delete-many`, {
      method: "DELETE",
      headers,
      data: JSON.stringify(data)
    });
    if (res?.data.status === "Success") {
      return {
        data: []
      };
    }
    return { data: null }
  } catch (error) {
    console.error("Error deleting multiple City:", error);
    throw error;
  }
};


export const getDetailCity = async (id: string) => {
  try {
    const index = API_ENDPOINT.SETTING.CITY.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail City:", error);
    throw error;
  }
};