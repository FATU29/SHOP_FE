import { createAsyncThunk } from "@reduxjs/toolkit";
import {createCity,deleteCity,deleteMultipleCities,getAllCities,getDetailCity,updateCities } from "src/services/city";
import { TParamsCreateCity, TParamsDeleteCity, TParamsDeleteMultipleCities, TParamsEditCity, TParamsGetCities } from "src/styles/city";



export const serviceName = "city"


export const getAllCitiesAction = createAsyncThunk(
  `${serviceName}/getAllCitiesAction`,
  async (data: { params: TParamsGetCities }, { rejectWithValue }) => {
    try {
      const response = await getAllCities(data);
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


export const createCityAction = createAsyncThunk(
  `${serviceName}/createCityAction`,
  async (data: TParamsCreateCity, { rejectWithValue }) => {
    try {
      const response = await createCity(data);
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


export const updateCityAction = createAsyncThunk(
  `${serviceName}/updateCityAction`,
  async (data: TParamsEditCity, { rejectWithValue }) => {
    try {
      const response = await updateCities(data);
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


export const deleteCityAction = createAsyncThunk(
  `${serviceName}/deleteCityAction`,
  async (id: TParamsDeleteCity, { rejectWithValue }) => {
    try {
      const response = await deleteCity(id);
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



export const deleteMultipleCitiesAction = createAsyncThunk(
  `${serviceName}/deleteMultipleCitiesAction`,
  async (data: TParamsDeleteMultipleCities, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleCities(data);
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


