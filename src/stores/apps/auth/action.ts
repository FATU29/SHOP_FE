import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { registerAuth } from "src/services/auth";

export const registerAuthAction = createAsyncThunk(
  'auth/registerAuthAction',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await registerAuth(data);
      if (response?.data?.data) {
        return response.data.data;
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
