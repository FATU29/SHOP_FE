import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPaymentType,deletePaymentType,deleteMultiplePaymentTypes,getAllPaymentTypes,getDetailPaymentType,updatePaymentType } from "src/services/payment-type";
import { TParamsCreatePaymentType, TParamsDeletePaymentType, TParamsDeleteMultiplePaymentTypes, TParamsEditPaymentType, TParamsGetPaymentTypes } from "src/types/payment-type";



export const serviceName = "payment-type"


export const getAllPaymentTypesAction = createAsyncThunk(
  `${serviceName}/getAllPaymentTypesAction`,
  async (data: { params: TParamsGetPaymentTypes }, { rejectWithValue }) => {
    try {
      const response = await getAllPaymentTypes(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);


export const createPaymentTypeAction = createAsyncThunk(
  `${serviceName}/createPaymentTypeAction`,
  async (data: TParamsCreatePaymentType, { rejectWithValue }) => {
    try {
      const response = await createPaymentType(data);
      return response;
    } catch (error: any) {
      console.log("error", error)
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);


export const updatePaymentTypeAction = createAsyncThunk(
  `${serviceName}/updatePaymentTypeAction`,
  async (data: TParamsEditPaymentType, { rejectWithValue }) => {
    try {
      const response = await updatePaymentType(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);


export const deletePaymentTypeAction = createAsyncThunk(
  `${serviceName}/deletePaymentTypeAction`,
  async (id: TParamsDeletePaymentType, { rejectWithValue }) => {
    try {
      const response = await deletePaymentType(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);



export const deleteMultiplePaymentTypesAction = createAsyncThunk(
  `${serviceName}/deleteMultiplePaymentTypesAction`,
  async (data: TParamsDeleteMultiplePaymentTypes, { rejectWithValue }) => {
    try {
      const response = await deleteMultiplePaymentTypes(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);


