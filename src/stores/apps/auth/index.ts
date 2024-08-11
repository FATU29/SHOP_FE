// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { registerAuthAction } from './action'


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
  isSuccess: true,
  isError: false,
  message:"",
  typeError:""
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
    },
  },


  extraReducers: builder => {
    builder.addCase(registerAuthAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(registerAuthAction.fulfilled, (state, action:any) => {
      state.isLoading = false
      state.isSuccess = Boolean(action.payload?.data?.email)
      state.isError = !Boolean(action.payload?.data?.email)
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    builder.addCase(registerAuthAction.rejected, (state, action:any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = authSlice.actions
export default authSlice.reducer
