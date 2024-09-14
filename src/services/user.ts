import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateUsers, TParamsDeleteUsers, TParamsEditUsers, TParamsGetUsers } from "src/styles/user";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllUsers = async (data : {params: TParamsGetUsers}) => {
  try {
    const getAll = API_ENDPOINT.USER.INDEX;
    const res = await instanceAxios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Users:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createUsers = async (data: TParamsCreateUsers) => {
  try {
    const index = API_ENDPOINT.USER.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating Users:", error);
    throw error;
  }
};

export const updateUsers = async (data: TParamsEditUsers) => {
  try {
    const index = API_ENDPOINT.USER.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating Users:", error);
    throw error;
  }
};

export const deleteUsers = async (data: TParamsDeleteUsers) => {
  try {
    const index = API_ENDPOINT.USER.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting Users:", error);
    throw error;
  }
};


export const getDetailUsers = async (id: string) => {
  try {
    const index = API_ENDPOINT.USER.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Users:", error);
    throw error;
  }
};