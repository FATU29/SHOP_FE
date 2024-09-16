import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateRole, TParamsDeleteRole, TParamsEditRole, TParamsGetRoles } from "src/styles/role";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllRoles = async (data : {params: TParamsGetRoles}) => {
  try {
    const getAll = API_ENDPOINT.SYSTEM.ROLE.INDEX;
    const res = await instanceAxios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting roles:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createRole = async (data: TParamsCreateRole) => {
  try {
    const index = API_ENDPOINT.SYSTEM.ROLE.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

export const updateRole = async (data: TParamsEditRole) => {
  try {
    const index = API_ENDPOINT.SYSTEM.ROLE.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};

export const deleteRole = async (data: TParamsDeleteRole) => {
  try {
    const index = API_ENDPOINT.SYSTEM.ROLE.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting role:", error);
    throw error;
  }
};


export const getDetailRole = async (id: string) => {
  try {
    const index = API_ENDPOINT.SYSTEM.ROLE.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail role:", error);
    throw error;
  }
};