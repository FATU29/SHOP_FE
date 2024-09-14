// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { changePasswordMeAction, registerAuthAction, updateAuthMeAction } from './action'
import { UserDataType } from 'src/contexts/types'


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


type TInitialState = {
  isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string,
  typeError: string,
  isSuccessUpdateMe: boolean,
  isErrorUpdateMe: boolean,
  messageUpdateMe: string,
  isSuccessChangePasswordMe: boolean,
  isErrorChangePasswordMe: boolean,
  messageChangePasswordMe: string,
  userData: UserDataType | null

}

const initialState: TInitialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: "",
  typeError: "",
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: "",
  isSuccessChangePasswordMe: true,
  isErrorChangePasswordMe: false,
  messageChangePasswordMe: "",
  userData: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetIntitalState: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ""
      state.typeError = ""
      state.isSuccessUpdateMe = true
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ""
      state.isSuccessChangePasswordMe = true
      state.isErrorChangePasswordMe = false
      state.messageChangePasswordMe = ""

    },
  },

  extraReducers: builder => {
    // register
    builder.addCase(registerAuthAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(registerAuthAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccess = Boolean(action.payload?.data?.email)
      state.isError = !Boolean(action.payload?.data?.email)
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    builder.addCase(registerAuthAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // updateAuthMe
    builder.addCase(updateAuthMeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateAuthMeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessUpdateMe = Boolean(action.payload?.data?.email)
      state.isErrorUpdateMe = !Boolean(action.payload?.data?.email)
      state.messageUpdateMe = action.payload?.message
      state.typeError = action.payload?.typeError
      state.userData = action.payload?.data
    })

    builder.addCase(updateAuthMeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = action.payload?.message
      state.typeError = action.payload?.typeError
      state.userData = null
    })



    // Change Password Me
    builder.addCase(changePasswordMeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(changePasswordMeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessChangePasswordMe = Boolean(action.payload?.data)
      state.isErrorChangePasswordMe = !Boolean(action.payload?.data)
      state.messageChangePasswordMe = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    builder.addCase(changePasswordMeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessChangePasswordMe = false
      state.isErrorChangePasswordMe = true
      state.messageChangePasswordMe = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  },






})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = authSlice.actions
export default authSlice.reducer
