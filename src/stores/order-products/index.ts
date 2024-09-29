// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { serviceName } from './action'
import { TItemOrderProduct } from 'src/types/order-products'

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
  orderItems: [] as TItemOrderProduct[]
}


export const orderProductsSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    updateProductToCart: (state, action) => {
      state.orderItems = action.payload.orderItems
    },

  },

  extraReducers: builder => { },
})


// Action creators are generated for each case reducer function
export const { updateProductToCart } = orderProductsSlice.actions
export default orderProductsSlice.reducer
