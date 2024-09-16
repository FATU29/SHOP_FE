import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreateDeliveryType,TParamsDeleteDeliveryType,TParamsDeleteMultipleDeliveryTypes,TParamsEditDeliveryType,TParamsGetDeliveryTypes } from "src/styles/delivery-type";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllDeliveryTypes = async (data: { params: TParamsGetDeliveryTypes }) => {
  try {
    const getAll = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
    const res = await instanceAxios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Delivery:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createDeliveryType = async (data: TParamsCreateDeliveryType) => {
  try {
    const index = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating Delivery:", error);
    throw error;
  }
};

export const updateDeliveryType = async (data: TParamsEditDeliveryType) => {
  try {
    const index = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating Delivery:", error);
    throw error;
  }
};

export const deleteDeliveryType = async (data: TParamsDeleteDeliveryType) => {
  try {
    const index = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting Delivery:", error);
    throw error;
  }
};

export const deleteMultipleDeliveryTypes = async (data: TParamsDeleteMultipleDeliveryTypes) => {
  try {
    const index = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
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
    console.error("Error deleting multiple Delivery:", error);
    throw error;
  }
};


export const getDetailDeliveryType = async (id: string) => {
  try {
    const index = API_ENDPOINT.SETTING.DELIVERY_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Delivery:", error);
    throw error;
  }
};