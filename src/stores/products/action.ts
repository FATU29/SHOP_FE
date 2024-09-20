import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct,deleteProduct,deleteMultipleProducts,getAllProducts,getDetailProduct,updateProduct } from "src/services/products";
import { TParamsCreateProduct, TParamsDeleteProduct, TParamsDeleteMultipleProducts, TParamsEditProduct, TParamsGetProducts } from "src/types/products";



export const serviceName = "products"


export const getAllProductsAction = createAsyncThunk(
  `${serviceName}/getAllProductsAction`,
  async (data: { params: TParamsGetProducts }, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(data);
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


export const createProductAction = createAsyncThunk(
  `${serviceName}/createProductAction`,
  async (data: TParamsCreateProduct, { rejectWithValue }) => {
    try {
      const response = await createProduct(data);
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


export const updateProductAction = createAsyncThunk(
  `${serviceName}/updateProductAction`,
  async (data: TParamsEditProduct, { rejectWithValue }) => {
    try {
      const response = await updateProduct(data);
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


export const deleteProductAction = createAsyncThunk(
  `${serviceName}/deleteProductAction`,
  async (id: TParamsDeleteProduct, { rejectWithValue }) => {
    try {
      const response = await deleteProduct(id);
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



export const deleteMultipleProductsAction = createAsyncThunk(
  `${serviceName}/deleteMultipleProductsAction`,
  async (data: TParamsDeleteMultipleProducts, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleProducts(data);
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


