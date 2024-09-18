


import { NextPage } from "next";
import { CONFIG_PERMISSIONS } from "src/configs/permission";
import ProductTypeList from "src/views/pages/manage-product/product-type/ProductTypeList";





type TProps = {}

const TypeCategory : NextPage<TProps> = () => {
    return (
        <>
           <ProductTypeList></ProductTypeList>
        </>
    )
}

TypeCategory.permission = [CONFIG_PERMISSIONS.MANAGE_PRODUCT.PRODUCT_TYPE.VIEW]
export default TypeCategory;