// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createPaymentTypeAction,deletePaymentTypeAction,deleteMultiplePaymentTypesAction,getAllPaymentTypesAction,serviceName,updatePaymentTypeAction } from './action'


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
  isSuccessDeletePaymentType: false,
  isErrorDeletePaymentType: false,
  messageErrorDeletePaymentType: "",
  isSuccessMultipleDeletePaymentType: false,
  isErrorDeleteMultiplePaymentType: false,
  messageErrorDeleteMultiplePaymentType: "",
  paymentTypes: {
    data: [],
    total: 0
  }
}


export const citySlice = createSlice({
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
      state.isSuccessDeletePaymentType = false
      state.isErrorDeletePaymentType = false
      state.messageErrorDeletePaymentType = ""
      state.isSuccessMultipleDeletePaymentType= false
      state.isErrorDeleteMultiplePaymentType= false
      state.messageErrorDeleteMultiplePaymentType= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllPaymentTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllPaymentTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.paymentTypes.data = action?.payload?.data?.paymentTypes
      state.paymentTypes.total = action?.payload?.data?.totalCount
    })

    builder.addCase(getAllPaymentTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.paymentTypes.data = []
    })

    //create new role
    builder.addCase(createPaymentTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createPaymentTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = true
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful payment"
      state.typeError = ""


    })

    builder.addCase(createPaymentTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updatePaymentTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updatePaymentTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful payment"
      state.typeError = ""

    })

    builder.addCase(updatePaymentTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deletePaymentTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deletePaymentTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeletePaymentType = action?.payload?.data?._id
      state.isErrorDeletePaymentType = false
      state.messageErrorDeletePaymentType = ""
      state.typeError = ""
    })

    builder.addCase(deletePaymentTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeletePaymentType = false
      state.isErrorDeletePaymentType = true
      state.messageErrorDeletePaymentType = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultiplePaymentTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultiplePaymentTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeletePaymentType = true
      state.isErrorDeleteMultiplePaymentType = false
      state.messageErrorDeleteMultiplePaymentType = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultiplePaymentTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeletePaymentType = false
      state.isErrorDeleteMultiplePaymentType = true
      state.messageErrorDeleteMultiplePaymentType = action?.payload?.message
      state.typeError = action?.payload?.code
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = citySlice.actions
export default citySlice.reducer
