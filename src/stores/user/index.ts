// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createUsersAction, deleteMultipleUsersAction, deleteUsersAction, getAllUsersAction, serviceName, updateUsersAction } from './action'


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
  isSuccessDeleteUser: false,
  isErrorDeleteUser: false,
  messageErrorDeleteUser: "",
  isSuccessMultipleDeleteUser: false,
  isErrorDeleteMultipleUser: false,
  messageErrorDeleteMultipleUser: "",
  users: {
    data: [],
    total: 0
  }
}


export const userSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetIntitalState: (state) => {
      state.isLoading = false
      state.typeError = ""
      state.message = ""
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.isSuccessDeleteUser = false
      state.isErrorDeleteUser = false
      state.messageErrorDeleteUser = ""
      state.isSuccessMultipleDeleteUser= false
      state.isErrorDeleteMultipleUser= false
      state.messageErrorDeleteMultipleUser= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllUsersAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllUsersAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.users.data = action?.payload?.data?.users
      state.users.total = action?.payload?.data?.totalCount

    })

    builder.addCase(getAllUsersAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.users.data = []
    })

    //create new role
    builder.addCase(createUsersAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createUsersAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful user"
      state.typeError = ""


    })

    builder.addCase(createUsersAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateUsersAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateUsersAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful user"
      state.typeError = ""

    })

    builder.addCase(updateUsersAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteUsersAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteUsersAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteUser = action?.payload?.data?._id
      state.isErrorDeleteUser = false
      state.messageErrorDeleteUser = ""
      state.typeError = ""
    })

    builder.addCase(deleteUsersAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteUser = false
      state.isErrorDeleteUser = true
      state.messageErrorDeleteUser = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultipleUsersAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultipleUsersAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteUser = true
      state.isErrorDeleteMultipleUser = false
      state.messageErrorDeleteMultipleUser = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultipleUsersAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteUser = false
      state.isErrorDeleteMultipleUser = true
      state.messageErrorDeleteMultipleUser = action?.payload?.message
      state.typeError = action?.payload?.code
    })

  

  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = userSlice.actions
export default userSlice.reducer
