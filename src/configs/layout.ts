import { ROUTE_CONFIG } from "./route";

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
            },
            {
                title: "Nhóm vai trò",
                icon: "icon-park-outline:permissions",
                path: ROUTE_CONFIG.SYSTEM.ROLE,
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
                path: ROUTE_CONFIG.PRODUCT.MANAGE_ORDER,
            },
            {
                title: "Danh sách đánh giá",
                icon: "material-symbols-light:star-rate-outline",
                path: ROUTE_CONFIG.PRODUCT.MANAGE_REVIEW,
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