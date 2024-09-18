import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUsers, getAllUsers,deleteUsers,updateUsers, deleteMultipleUsers} from "src/services/user";
import { TParamsCreateUsers,TParamsDeleteMultipleUser,TParamsDeleteUsers,TParamsEditUsers,TParamsGetUsers } from "src/types/user";



export const serviceName = "user"


export const getAllUsersAction = createAsyncThunk(
  `${serviceName}/getAllUsersAction`,
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
  `${serviceName}/createUsersAction`,
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
  `${serviceName}/updateUsersAction`,
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
  `${serviceName}/deleteUsersAction`,
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



export const deleteMultipleUsersAction = createAsyncThunk(
  `${serviceName}/deleteMultipleUsersAction`,
  async (data: TParamsDeleteMultipleUser, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleUsers(data);
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


