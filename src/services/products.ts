import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateProduct, TParamsDeleteProduct, TParamsDeleteMultipleProducts, TParamsEditProduct, TParamsGetProducts } from "src/types/products";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllProducts = async (data: { params: TParamsGetProducts }) => {
  try {
    const getAll = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
    const res = await axios(getAll, {
      method: "GET",
      headers,
      params: data.params
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Product:", error);
    throw error;
  }
};

export const createProduct = async (data: TParamsCreateProduct) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
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

export const updateProduct = async (data: TParamsEditProduct) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
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

export const deleteProduct = async (data: TParamsDeleteProduct) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
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

export const deleteMultipleProducts = async (data: TParamsDeleteMultipleProducts) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
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


export const getDetailProduct = async (id: string) => {
  try {
    const index = API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX;
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


//server side 
export const getAllProductsPublic = async (
  data: { params: TParamsGetProducts }, 
  config?: AxiosRequestConfig
) => {
  try {
    const getAll = `${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public`;
    const res = await axios(getAll, {
      method: "GET",
      headers,
      params: data.params,
      ...config // Truyền thêm config vào axios, bao gồm signal nếu có
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Product:", error);
    throw error;
  }
};


export const getDetailProductPublic = async (id: string) => {
  try {
    const index = `${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public`;
    const res = await axios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Product:", error);
    throw error;
  }
};


export const getDetailProductPublicBySlug = async (slug: string) => {
  try {
    const index = `${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/public/slug`;
    const res = await axios(`${index}/${slug}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Product:", error);
    throw error;
  }
};