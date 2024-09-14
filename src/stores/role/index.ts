// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createRoleAction, deleteRoleAction, getAllRolesAction, updateRoleAction } from './action'


interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isLoading: false,
  message:"",
  typeError: "",
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageErrorCreateEdit: "",
  isSuccessDeleteRole: false,
  isErrorDeleteRole: false,
  messageErrorDeleteRole: "",
  roles: {
    data: [],
    total: 0
  }
}


export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    resetIntitalState: (state) => {
      state.isLoading = false
      state.typeError = ""
      state.message = ""
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.isSuccessDeleteRole = false
      state.isErrorDeleteRole = false
      state.messageErrorDeleteRole = ""
    },
  },

  extraReducers: builder => {
    // getAllRoles
    builder.addCase(getAllRolesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllRolesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.roles.data = action?.payload?.data?.roles
      state.roles.total = action?.payload?.data?.totalCount

    })

    builder.addCase(getAllRolesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.roles.data = []
    })

    //create new role
    builder.addCase(createRoleAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createRoleAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful Role"
      state.typeError = ""


    })

    builder.addCase(createRoleAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateRoleAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateRoleAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful role"
      state.typeError = ""

    })

    builder.addCase(updateRoleAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteRoleAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteRoleAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteRole = action?.payload?.data?._id
      state.isErrorDeleteRole = false
      state.messageErrorDeleteRole = ""
      state.typeError = ""
    })

    builder.addCase(deleteRoleAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteRole = false
      state.isErrorDeleteRole = true
      state.messageErrorDeleteRole = action?.payload?.message
      state.typeError = action?.payload?.code
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = roleSlice.actions
export default roleSlice.reducer
