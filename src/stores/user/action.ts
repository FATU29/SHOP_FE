import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUsers, getAllUsers,deleteUsers,updateUsers} from "src/services/user";
import { TParamsCreateUsers,TParamsDeleteUsers,TParamsEditUsers,TParamsGetUsers } from "src/styles/user";

export const getAllUsersAction = createAsyncThunk(
  'user/getAllUsersAction',
  async (data : {params:TParamsGetUsers}, { rejectWithValue }) => {
    try {
      const response = await getAllUsers(data);
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


export const createUsersAction = createAsyncThunk(
  'user/createUsersAction',
  async (data: TParamsCreateUsers, { rejectWithValue }) => {
    try {
      const response = await createUsers(data);
      return response;
    } catch (error: any) {
      console.log("error",error)
      return rejectWithValue(
        {
          ...error
        }
      )
    }
  }
);


export const updateUsersAction = createAsyncThunk(
  'user/updateUsersAction',
  async (data: TParamsEditUsers, { rejectWithValue }) => {
    try {
      const response = await updateUsers(data);
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


export const deleteUsersAction = createAsyncThunk(
  'user/deleteUsersAction',
  async (id: TParamsDeleteUsers, { rejectWithValue }) => {
    try {
      const response = await deleteUsers(id);
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

