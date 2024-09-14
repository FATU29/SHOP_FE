import { CONFIG_PERMISSIONS } from "./permission";
import { ROUTE_CONFIG } from "./route";


export type TVertical = {
    title: string,
    path?: string,
    icon: string,
    childrens?: {
        title: string,
        path?: string,
        icon: string,
        permission?:string
    }[]

}


export const VerticalItem = [
    {
        title: "Hệ Thống",
        icon: "icon-park-outline:system",
        // path:"/",
        childrens: [
            {
                title: "Người dùng",
                icon: "ri:group-line",
                path: ROUTE_CONFIG.SYSTEM.USER,
                permission: CONFIG_PERMISSIONS.SYSTEM.USER.VIEW
            },
            {
                title: "Nhóm vai trò",
                icon: "icon-park-outline:permissions",
                path: ROUTE_CONFIG.SYSTEM.ROLE,
                permission: CONFIG_PERMISSIONS.SYSTEM.ROLE.VIEW
            }
        ],

    },
    {
        title: "Quản trị sản phẩm",
        icon: "fluent-mdl2:product",
        // path:"/",
        childrens: [
            {
                title: "Danh sách sản phẩm",
                icon: "fluent-mdl2:product-list",
                path: ROUTE_CONFIG.PRODUCT.MANAGE_PRODUCT,
            },
            {
                title: "Danh mục sản phẩm",
                icon: "icon-park-outline:category-management",
                path: ROUTE_CONFIG.PRODUCT.MANAGE_TYPE_PRODUCT,
            },
            {
                title: "Danh sách đơn hàng",
                icon: "lets-icons:order",
                path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_ORDER,
            },
            {
                title: "Danh sách đánh giá",
                icon: "material-symbols-light:star-rate-outline",
                path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_REVIEW,
            },
        ],
    },
    {
        title: "Quản trị đặt hàng",
        icon: "lets-icons:order",
        // path:"/",
        childrens: [
            {
                title: "Danh sách đặt hàng",
                icon: "fluent:re-order-dots-vertical-20-filled",
                path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_ORDER,
                permission: CONFIG_PERMISSIONS.MANAGE_ORDER.ORDER.VIEW
                
            },
            {
                title: "Danh mục đánh giá",
                icon: "octicon:code-review-16",
                path: ROUTE_CONFIG.MANAGE_ORDER.MANAGE_REVIEW,
            },
        ],
    },
    {
        title: "Cài đặt",
        icon: "uil:setting",
        // path: "/",
        childrens: [
            {
                title: "Cài đặt thành phố",
                icon: "ph:city",
                path: ROUTE_CONFIG.SETTING.SETTING_CITY,
            },
            {
                title: "Cài đặt giao hàng",
                icon: "carbon:delivery",
                path: ROUTE_CONFIG.SETTING.SETTING_DELIVERY,
            },
            {
                title: "Cài đặt thanh toán",
                icon: "ic:baseline-payment",
                path: ROUTE_CONFIG.SETTING.SETTING_PAY,
            },

        ]
    }
]