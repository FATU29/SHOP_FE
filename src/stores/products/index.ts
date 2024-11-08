// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { createProductAction,deleteProductAction,deleteMultipleProductsAction,getAllProductsAction,serviceName,updateProductAction, likeProductAction, unlikeProductAction, getlikeProductMeAction, getViewdProductMeAction } from './action'
import { TProduct } from 'src/types/products'


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
  isSuccessDeleteProduct: false,
  isErrorDeleteProduct: false,
  messageErrorDeleteProduct: "",
  isSuccessMultipleDeleteProduct: false,
  isErrorDeleteMultipleProduct: false,
  messageErrorDeleteMultipleProduct: "",
  isSuccessLike: false,
  isErrorLike: false,
  messageErrorLike: "",
  isSuccessUnlike: false,
  isErrorUnlike: false,
  messageErrorUnlike: "",
  products: {
    data: [] as TProduct[],
    total: 0
  },
  likedProducts: {
    data:[],
    total: 0
  },
  viewedProducts: {
    data:[],
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
      state.isSuccessDeleteProduct = false
      state.isErrorDeleteProduct = false
      state.messageErrorDeleteProduct = ""
      state.isSuccessMultipleDeleteProduct= false
      state.isErrorDeleteMultipleProduct= false
      state.messageErrorDeleteMultipleProduct= ""
      state.isSuccessLike= false
      state.isErrorLike= false
      state.messageErrorLike= ""
      state.isSuccessUnlike= false
      state.isErrorUnlike= false
      state.messageErrorUnlike= ""
    },
  },

  extraReducers: builder => {
    // getAllusers
    builder.addCase(getAllProductsAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getAllProductsAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.products.data = action?.payload?.data?.products
      state.products.total = action?.payload?.data?.totalCount
    })

    builder.addCase(getAllProductsAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.products.data = []
    })

    //create new role
    builder.addCase(createProductAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(createProductAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = true
      state.isErrorCreateEdit = false
      state.message = "Adding a Successful product"
      state.typeError = ""


    })

    builder.addCase(createProductAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })

    //update role
    builder.addCase(updateProductAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(updateProductAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = action?.payload?.data?._id
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ""
      state.message = "Update a successful product"
      state.typeError = ""

    })

    builder.addCase(updateProductAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = action?.payload?.message
      state.typeError = action?.payload?.code
    })


     //delete role
     builder.addCase(deleteProductAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteProductAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteProduct = action?.payload?.data?._id
      state.isErrorDeleteProduct = false
      state.messageErrorDeleteProduct = ""
      state.typeError = ""
    })

    builder.addCase(deleteProductAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessDeleteProduct = false
      state.isErrorDeleteProduct = true
      state.messageErrorDeleteProduct = action?.payload?.message
      state.typeError = action?.payload?.code
    })



     //delete multiple user
     builder.addCase(deleteMultipleProductsAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(deleteMultipleProductsAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteProduct = true
      state.isErrorDeleteMultipleProduct = false
      state.messageErrorDeleteMultipleProduct = ""
      state.typeError = ""
    })

    builder.addCase(deleteMultipleProductsAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessMultipleDeleteProduct = false
      state.isErrorDeleteMultipleProduct = true
      state.messageErrorDeleteMultipleProduct = action?.payload?.message
      state.typeError = action?.payload?.code
    })


    //Like
    builder.addCase(likeProductAction.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(likeProductAction.fulfilled, (state, action: any) => {
      state.isLoading = false
      state.isSuccessLike = true
      state.isErrorLike = false
      state.messageErrorLike = ""
    })

    builder.addCase(likeProductAction.rejected, (state, action: any) => {
      state.isLoading = false
      state.isSuccessLike = false
      state.isErrorLike = true
      state.messageErrorLike = action?.payload?.message
    })


      //unLike
      builder.addCase(unlikeProductAction.pending, (state, action) => {
        state.isLoading = true
      })
  
      builder.addCase(unlikeProductAction.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.isSuccessUnlike = true
        state.isErrorUnlike = false
        state.messageErrorUnlike = ""
      })
  
      builder.addCase(unlikeProductAction.rejected, (state, action: any) => {
        state.isLoading = false
        state.isSuccessUnlike = false
        state.isErrorUnlike = true
        state.messageErrorUnlike = action?.payload?.message
      })


      //getAllLiked
      builder.addCase(getlikeProductMeAction.pending, (state, action) => {
        state.isLoading = true
      })
  
      builder.addCase(getlikeProductMeAction.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.likedProducts = action?.payload?.data

      })
  
      builder.addCase(getlikeProductMeAction.rejected, (state, action: any) => {
        state.isLoading = false
        state.likedProducts = state.likedProducts;
      })


      
      //getAllViewedProduct
      builder.addCase(getViewdProductMeAction.pending, (state, action) => {
        state.isLoading = true
      })
  
      builder.addCase(getViewdProductMeAction.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.likedProducts = action?.payload?.data

      })
  
      builder.addCase(getViewdProductMeAction.rejected, (state, action: any) => {
        state.isLoading = false
        state.likedProducts = state.likedProducts;
      })





  },
})


// Action creators are generated for each case reducer function
export const { resetIntitalState } = productSlice.actions
export default productSlice.reducer
