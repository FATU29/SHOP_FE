export type TParamsGetProducts = {
  limit: number
  page: number
  search?: string
  order?: string
  productType?: string | string[]
}

export type TParamsCreateProduct = {
  name: string
  type: string
  price: number
  discount?: number
  slug: string
  description?: string
  countInStock: number
  status: number
  image: string
  discountEndDate: Date | null
  discountStartDate: Date | null
}

export type TParamsEditProduct = {
  id: string
  name: string
  type: string
  price: number
  discount?: number
  slug: string
  description?: string
  countInStock: number
  status: number
  discountEndDate: Date | null
  discountStartDate: Date | null
  image: string
}

export type TParamsDeleteProduct = {
  id: string
}

export type TParamsDeleteMultipleProducts = {
  productIds: string[]
}

export type TProduct = {
  _id: string
  averageRating: number
  createdAt: Date | null
  image: string
  price: number
  discount: number
  name: string
  slug: string
  totalLike: number
  countInStock: number
  discountStartDate: Date | null
  discountEndDate: Date | null
  likedBy: string[]
}

export type TGetLikeMe = {
  limit?: number
  page?: number
  search?: string
}

export type TGetViewProductMe = {
  limit?: number
  page?: number
  search?: string
}

export const LOCAL_PRODUCT_CART = 'productCart'
