export type TItemOrderProduct = {
    name: string,
    amount: number,
    image: string,
    price: number,
    discount: number,
    product: string,
    slug: string,
    discountStartDate: Date | null,
    discountEndDate: Date | null,
}