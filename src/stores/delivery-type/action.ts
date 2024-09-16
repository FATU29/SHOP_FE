import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDeliveryType,deleteDeliveryType,deleteMultipleDeliveryTypes,getAllDeliveryTypes,getDetailDeliveryType,updateDeliveryType } from "src/services/delivery-type";
import { TParamsCreateDeliveryType, TParamsDeleteDeliveryType, TParamsDeleteMultipleDeliveryTypes, TParamsEditDeliveryType, TParamsGetDeliveryTypes } from "src/styles/delivery-type";



export const serviceName = "delivery-type"


export const getAllDeliveryTypesAction = createAsyncThunk(
  `${serviceName}/getAllDeliveryTypesAction`,
  async (data: { params: TParamsGetDeliveryTypes }, { rejectWithValue }) => {
    try {
      const response = await getAllDeliveryTypes(data);
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


export const createDeliveryTypeAction = createAsyncThunk(
  `${serviceName}/createDeliveryTypeAction`,
  async (data: TParamsCreateDeliveryType, { rejectWithValue }) => {
    try {
      const response = await createDeliveryType(data);
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


export const updateDeliveryTypeAction = createAsyncThunk(
  `${serviceName}/updateDeliveryTypeAction`,
  async (data: TParamsEditDeliveryType, { rejectWithValue }) => {
    try {
      const response = await updateDeliveryType(data);
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


export const deleteDeliveryTypeAction = createAsyncThunk(
  `${serviceName}/deleteDeliveryTypeAction`,
  async (id: TParamsDeleteDeliveryType, { rejectWithValue }) => {
    try {
      const response = await deleteDeliveryType(id);
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



export const deleteMultipleDeliveryTypesAction = createAsyncThunk(
  `${serviceName}/deleteMultipleDeliveryTypesAction`,
  async (data: TParamsDeleteMultipleDeliveryTypes, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleDeliveryTypes(data);
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


