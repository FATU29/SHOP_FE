// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createCityAction,deleteCityAction,deleteMultipleCitiesAction,getAllCitiesAction,serviceName,updateCityAction } from './action'


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
  isSuccessDeleteCity: false,
  isErrorDeleteCity: false,
  messageErrorDeleteCity: "",
  isSuccessMultipleDeleteCity: false,
  isErrorDeleteMultipleCity: false,
  messageErrorDeleteMultipleCity: "",
  cities: {
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
      state.isSuccessDeleteCity = false
      state.isErrorDeleteCity = false
      state.messageErrorDeleteCity = ""
      state.isSuccessMultipleDeleteCity= false
      state.isErrorDeleteMultipleCity= false
      state.messageErrorDeleteMultipleCity= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllCitiesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllCitiesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.cities.data = action?.payload?.data?.cities
      state.cities.total = action?.payload?.data?.totalCount
    })

    builder.addCase(getAllCitiesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.cities.data = []
    })

    //create new role
    builder.addCase(createCityAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createCityAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = true
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful city"
      state.typeError = ""


    })

    builder.addCase(createCityAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateCityAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateCityAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful city"
      state.typeError = ""

    })

    builder.addCase(updateCityAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteCityAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteCityAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteCity = action?.payload?.data?._id
      state.isErrorDeleteCity = false
      state.messageErrorDeleteCity = ""
      state.typeError = ""
    })

    builder.addCase(deleteCityAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteCity = false
      state.isErrorDeleteCity = true
      state.messageErrorDeleteCity = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultipleCitiesAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultipleCitiesAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteCity = true
      state.isErrorDeleteMultipleCity = false
      state.messageErrorDeleteMultipleCity = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultipleCitiesAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteCity = false
      state.isErrorDeleteMultipleCity = true
      state.messageErrorDeleteMultipleCity = action?.payload?.message
      state.typeError = action?.payload?.code
    })
  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = citySlice.actions
export default citySlice.reducer
