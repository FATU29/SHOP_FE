// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceName } from './action'

// ** Axios Imports



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
  orderItems: []
}


export const orderProductsSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },
  },

  extraReducers: builder => { },
})


// Action creators are generated for each case reducer function
export const { addProductToCart } = orderProductsSlice.actions
export default orderProductsSlice.reducer
