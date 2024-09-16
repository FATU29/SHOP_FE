export type TParamsGetDeliveryTypes = {
    limit: number,
    page: number,
    search?: string,
    order?: string
}


export type TParamsCreateDeliveryType = {
    name: string,
    price: number
}


export type TParamsEditDeliveryType = {
    id: string,
    name: string,
    price: number
}


export type TParamsDeleteDeliveryType = {
    id: string
}

export type TParamsDeleteMultipleDeliveryTypes = {
    deliveryTypeIds: string[]
}