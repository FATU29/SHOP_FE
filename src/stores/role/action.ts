import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRole, deleteRole, getAllRoles, updateRole } from "src/services/role";
import { TParamsCreateRole, TParamsDeleteRole, TParamsEditRole, TParamsGetRoles } from "src/types/role";

export const getAllRolesAction = createAsyncThunk(
  'role/getAllRolesAction',
  async (data : {params:TParamsGetRoles}, { rejectWithValue }) => {
    try {
      const response = await getAllRoles(data);
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


export const createRoleAction = createAsyncThunk(
  'role/createRoleAction',
  async (data: TParamsCreateRole, { rejectWithValue }) => {
    try {
      const response = await createRole(data);
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


export const updateRoleAction = createAsyncThunk(
  'role/updateRoleAction',
  async (data: TParamsEditRole, { rejectWithValue }) => {
    try {
      const response = await updateRole(data);
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


export const deleteRoleAction = createAsyncThunk(
  'role/deleteRoleAction',
  async (id: TParamsDeleteRole, { rejectWithValue }) => {
    try {
      const response = await deleteRole(id);
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

