
export type TParamsGetProductTypes = {
    limit: number,
    page: number,
    search?: string,
    order?: string
}


export type TParamsCreateProductType = {
    name: string,
    slug: number
}


export type TParamsEditProductType = {
    id: string,
    name: string,
    slug: number
}


export type TParamsDeleteProductType = {
    id: string
}

export type TParamsDeleteMultipleProductTypes = {
    productTypeIds: string[]
}