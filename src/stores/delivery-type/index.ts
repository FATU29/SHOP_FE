// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createDeliveryTypeAction,deleteDeliveryTypeAction,deleteMultipleDeliveryTypesAction,getAllDeliveryTypesAction,serviceName,updateDeliveryTypeAction } from './action'


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
  isSuccessDeleteDeliveryType: false,
  isErrorDeleteDeliveryType: false,
  messageErrorDeleteDeliveryType: "",
  isSuccessMultipleDeleteDeliveryType: false,
  isErrorDeleteMultipleDeliveryType: false,
  messageErrorDeleteMultipleDeliveryType: "",
  deliveryTypes: {
    data: [],
    total: 0
  }
}


export const deliverySlice = createSlice({
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
      state.isSuccessDeleteDeliveryType = false
      state.isErrorDeleteDeliveryType = false
      state.messageErrorDeleteDeliveryType = ""
      state.isSuccessMultipleDeleteDeliveryType= false
      state.isErrorDeleteMultipleDeliveryType= false
      state.messageErrorDeleteMultipleDeliveryType= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllDeliveryTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllDeliveryTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.deliveryTypes.data = action?.payload?.data?.deliveryTypes
      state.deliveryTypes.total = action?.payload?.data?.totalCount
    })

    builder.addCase(getAllDeliveryTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.deliveryTypes.data = []
    })

    //create new role
    builder.addCase(createDeliveryTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createDeliveryTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = true
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful delivery"
      state.typeError = ""


    })

    builder.addCase(createDeliveryTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateDeliveryTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateDeliveryTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful delivery"
      state.typeError = ""

    })

    builder.addCase(updateDeliveryTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteDeliveryTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteDeliveryTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteDeliveryType = action?.payload?.data?._id
      state.isErrorDeleteDeliveryType = false
      state.messageErrorDeleteDeliveryType = ""
      state.typeError = ""
    })

    builder.addCase(deleteDeliveryTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteDeliveryType = false
      state.isErrorDeleteDeliveryType = true
      state.messageErrorDeleteDeliveryType = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultipleDeliveryTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultipleDeliveryTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteDeliveryType = true
      state.isErrorDeleteMultipleDeliveryType = false
      state.messageErrorDeleteMultipleDeliveryType = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultipleDeliveryTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteDeliveryType = false
      state.isErrorDeleteMultipleDeliveryType = true
      state.messageErrorDeleteMultipleDeliveryType = action?.payload?.message
      state.typeError = action?.payload?.code
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = deliverySlice.actions
export default deliverySlice.reducer
