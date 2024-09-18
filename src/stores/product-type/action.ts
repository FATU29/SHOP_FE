import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProductType,deleteProductType,deleteMultipleProductTypes,getAllProductTypes,getDetailProductType,updateProductType } from "src/services/product-type";
import { TParamsCreateProductType, TParamsDeleteProductType, TParamsDeleteMultipleProductTypes, TParamsEditProductType, TParamsGetProductTypes } from "src/types/product-type";



export const serviceName = "product-type"


export const getAllProductTypesAction = createAsyncThunk(
  `${serviceName}/getAllProductTypesAction`,
  async (data: { params: TParamsGetProductTypes }, { rejectWithValue }) => {
    try {
      const response = await getAllProductTypes(data);
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


export const createProductTypeAction = createAsyncThunk(
  `${serviceName}/createProductTypeAction`,
  async (data: TParamsCreateProductType, { rejectWithValue }) => {
    try {
      const response = await createProductType(data);
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


export const updateProductTypeAction = createAsyncThunk(
  `${serviceName}/updateProductTypeAction`,
  async (data: TParamsEditProductType, { rejectWithValue }) => {
    try {
      const response = await updateProductType(data);
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


export const deleteProductTypeAction = createAsyncThunk(
  `${serviceName}/deleteProductTypeAction`,
  async (id: TParamsDeleteProductType, { rejectWithValue }) => {
    try {
      const response = await deleteProductType(id);
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



export const deleteMultipleProductTypesAction = createAsyncThunk(
  `${serviceName}/deleteMultipleProductTypesAction`,
  async (data: TParamsDeleteMultipleProductTypes, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleProductTypes(data);
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


