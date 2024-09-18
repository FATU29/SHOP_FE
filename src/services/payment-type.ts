import { API_ENDPOINT } from "src/configs/api";
import { instanceAxios } from "src/helpers/intercepterAxios";
import { TParamsCreatePaymentType, TParamsDeleteMultiplePaymentTypes, TParamsDeletePaymentType, TParamsEditPaymentType, TParamsGetPaymentTypes } from "src/types/payment-type";

const headers = {
  'Content-Type': 'application/json',
};

export const getAllPaymentTypes = async (data: { params: TParamsGetPaymentTypes }) => {
  try {
    const getAll = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
    const res = await instanceAxios(getAll, {
      method: "GET",
      headers,
      params: data.params // For GET requests, use params instead of data
    });
    return res.data;
  } catch (error) {
    console.error("Error getting Payment:", error);
    throw error; // Re-throw the error if you want it to be handled by the caller
  }
};

export const createPaymentType = async (data: TParamsCreatePaymentType) => {
  try {
    const index = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
    const res = await instanceAxios(`${index}`, {
      method: "POST",
      headers,
      data: JSON.stringify(data)
    });
    return res.data;
  } catch (error) {
    console.error("Error creating Payment:", error);
    throw error;
  }
};

export const updatePaymentType = async (data: TParamsEditPaymentType) => {
  try {
    const index = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
    const { id, ...rest } = data;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "PUT",
      headers,
      data: JSON.stringify(rest)
    });
    return res.data;
  } catch (error) {
    console.error("Error updating Payment:", error);
    throw error;
  }
};

export const deletePaymentType = async (data: TParamsDeletePaymentType) => {
  try {
    const index = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${data.id}`, {
      method: "DELETE",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting Payment:", error);
    throw error;
  }
};

export const deleteMultiplePaymentTypes = async (data: TParamsDeleteMultiplePaymentTypes) => {
  try {
    const index = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
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
    console.error("Error deleting multiple Payment:", error);
    throw error;
  }
};


export const getDetailPaymentType = async (id: string) => {
  try {
    const index = API_ENDPOINT.SETTING.PAYMENT_TYPE.INDEX;
    const res = await instanceAxios(`${index}/${id}`, {
      method: "GET",
      headers
    });
    return res.data;
  } catch (error) {
    console.error("Error get detail Payment:", error);
    throw error;
  }
};