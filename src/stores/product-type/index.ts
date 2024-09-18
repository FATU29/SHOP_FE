// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createProductTypeAction,deleteProductTypeAction,deleteMultipleProductTypesAction,getAllProductTypesAction,serviceName,updateProductTypeAction } from './action'


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
  isSuccessDeleteProductType: false,
  isErrorDeleteProductType: false,
  messageErrorDeleteProductType: "",
  isSuccessMultipleDeleteProductType: false,
  isErrorDeleteMultipleProductType: false,
  messageErrorDeleteMultipleProductType: "",
  productTypes: {
    data: [],
    total: 0
  }
}


export const productSlice = createSlice({
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
      state.isSuccessDeleteProductType = false
      state.isErrorDeleteProductType = false
      state.messageErrorDeleteProductType = ""
      state.isSuccessMultipleDeleteProductType= false
      state.isErrorDeleteMultipleProductType= false
      state.messageErrorDeleteMultipleProductType= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllProductTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllProductTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.productTypes.data = action?.payload?.data?.productTypes
      state.productTypes.total = action?.payload?.data?.totalCount
    })

    builder.addCase(getAllProductTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.productTypes.data = []
    })

    //create new role
    builder.addCase(createProductTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createProductTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = true
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful product-type"
      state.typeError = ""


    })

    builder.addCase(createProductTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateProductTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateProductTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful product-type"
      state.typeError = ""

    })

    builder.addCase(updateProductTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteProductTypeAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteProductTypeAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteProductType = action?.payload?.data?._id
      state.isErrorDeleteProductType = false
      state.messageErrorDeleteProductType = ""
      state.typeError = ""
    })

    builder.addCase(deleteProductTypeAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteProductType = false
      state.isErrorDeleteProductType = true
      state.messageErrorDeleteProductType = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultipleProductTypesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultipleProductTypesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteProductType = true
      state.isErrorDeleteMultipleProductType = false
      state.messageErrorDeleteMultipleProductType = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultipleProductTypesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteProductType = false
      state.isErrorDeleteMultipleProductType = true
      state.messageErrorDeleteMultipleProductType = action?.payload?.message
      state.typeError = action?.payload?.code
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = productSlice.actions
export default productSlice.reducer
