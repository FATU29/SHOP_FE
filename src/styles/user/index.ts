export type TParamsGetUsers = {
    limit: number,
    page:number,
    search?: string,
    order?: string
}


export type TParamsCreateUsers = {
    firstName?:string,
    middleName?:string,
    lastName?:string,
    email: string,
    role: string,
    password: string,
    phoneNumber: string,
    address?: string,
    avatar?:string,
    status?: number,
    city?: string
}


export type TParamsEditUsers = {
    id:string,
    firstName?:string,
    middleName?:string,
    lastName?:string,
    email: string,
    role: string,
    password?: string,
    phoneNumber: string,
    address?: string,
    avatar?:string,
    status?: number,
    city?: string
}


export type TParamsDeleteUsers = {
    id:string
}

export type TParamsDeleteMultipleUser ={
    userIds: string[]
}