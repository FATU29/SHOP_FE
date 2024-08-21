import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { changePasswordMe, registerAuth, updateAuthMe } from "src/services/auth";

export const registerAuthAction = createAsyncThunk(
  'auth/registerAuthAction',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await registerAuth(data);
      if (response?.data) {
        return response;
      } else {
        return {
          data: null,
          message: response?.data?.message || "",
          typeError: response?.data?.typeError || "",
          status: response?.data?.status || ""
        };
      }
    } catch (error: any) {
      // Sử dụng rejectWithValue để đảm bảo rằng lỗi được truyền đúng cách
      return rejectWithValue({
        data: null,
        message: error.response?.data?.message || "Unknown error",
        typeError: error.response?.data?.typeError || "Unknown error type",
        status: error.response?.status || "Unknown status",
      });
    }
  }
);



export const updateAuthMeAction = createAsyncThunk(
  'auth/updateAuthMeAction',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await updateAuthMe(data);
      if (response?.data) {
        return response;
      } else {
        return {
          data: null,
          message: response?.data?.message || "",
          typeError: response?.data?.typeError || "",
          status: response?.data?.status || ""
        };
      }
    } catch (error: any) {
      // Sử dụng rejectWithValue để đảm bảo rằng lỗi được truyền đúng cách
      return rejectWithValue({
        data: null,
        message: error.response?.data?.message || "Unknown error",
        typeError: error.response?.data?.typeError || "Unknown error type",
        status: error.response?.status || "Unknown status",
      });
    }
  }
);




export const changePasswordMeAction = createAsyncThunk(
  'auth/changePasswordMeAction',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await changePasswordMe(data);
      if (response?.status === "Success") {
        return {
          ...response,
          ["data"]:1
        };
      } else {
        return {
          data: null,
          message: response?.data?.message || "",
          typeError: response?.data?.typeError || "",
          status: response?.data?.status || ""
        };
      }
    } catch (error: any) {
      // Sử dụng rejectWithValue để đảm bảo rằng lỗi được truyền đúng cách
      return rejectWithValue({
        data: null,
        message: error.response?.data?.message || "Unknown error",
        typeError: error.response?.data?.typeError || "Unknown error type",
        status: error.response?.status || "Unknown status",
      });
    }
  }
);