import axios from "axios";
import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateProductType,TParamsDeleteProductType,TParamsDeleteMultipleProductTypes,TParamsEditProductType,TParamsGetProductTypes } from "src/types/product-type";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllProductTypes = async (data: { params: TParamsGetProductTypes }) => {
  try {
    const getAll = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
    const res = await axios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Product:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createProductType = async (data: TParamsCreateProductType) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating Product:", error);
    throw error;
  }
};

export const updateProductType = async (data: TParamsEditProductType) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating Product:", error);
    throw error;
  }
};

export const deleteProductType = async (data: TParamsDeleteProductType) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting Product:", error);
    throw error;
  }
};

export const deleteMultipleProductTypes = async (data: TParamsDeleteMultipleProductTypes) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
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
    console.error("Error deleting multiple Product:", error);
    throw error;
  }
};


export const getDetailProductType = async (id: string) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Product:", error);
    throw error;
  }
};