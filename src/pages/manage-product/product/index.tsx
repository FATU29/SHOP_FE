import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import ProductList from "src/views/pages/manage-product/product/ProductList";





type TProps = {}

const Product : NextPage<TProps> = () => {
    return (
        <>
            <ProductList></ProductList>
        </>
    )
}


Product.permission = [CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]
export default Product;