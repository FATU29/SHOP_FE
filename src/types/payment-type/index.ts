export type TParamsGetPaymentTypes = {
    limit: number,
    page: number,
    search?: string,
    order?: string
}


export type TParamsCreatePaymentType = {
    name: string,
    type: string
}


export type TParamsEditPaymentType = {
    id: string,
    type: number,
    name: string
}


export type TParamsDeletePaymentType = {
    id: string
}

export type TParamsDeleteMultiplePaymentTypes = {
    paymentTypeIds: string[]
}