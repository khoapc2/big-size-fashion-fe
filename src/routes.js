/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Products from "pages/productList/ProductList";
import Billing from "layouts/billing";
import Stores from "pages/stores/list/StoreList";
import Promotions from "pages/promotion/list/promotionList";
import Sizes from "pages/size/list/sizeList";
import Colors from "pages/color/list/colorList";
import Categories from "pages/category/list/categoryList";
import Users from "pages/user/userTab";
import DeliveryNote from "pages/deliveryNote/deliveryTab";
import Order from "pages/order/orderTab";
import WarehouseInventory from "pages/warehouseInventory/storeInventory";
// import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Statistic from "pages/revenue/";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
// import ProfileManager from "./pages/profile/Main";
// import Product from "./pages/product/Product";
// const currentUser = JSON.parse(localStorage.getItem("user"));
// const { role } = currentUser;

// const currentUser = JSON.parse(localStorage.getItem("user"));
// const { role } = currentUser;
export const routes = [
  {
    type: "collapse",
    name: "Bảng điều khiển",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Sản phẩm",
    key: "products",
    icon: <Icon fontSize="small">inventory_2_outlined</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Người dùng",
    key: "user",
    icon: <Icon fontSize="small">people_alt_outlined </Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Danh sách giao / nhập hàng",
    key: "delivery-note",
    icon: <Icon fontSize="small">import_export</Icon>,
    route: "/delivery-note",
    component: <DeliveryNote />,
  },
  {
    type: "collapse",
    name: "Đơn hàng",
    key: "order",
    icon: <Icon fontSize="small">import_export</Icon>,
    route: "/order",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Thể loại",
    key: "categories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Kích cỡ",
    key: "sizes",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/sizes",
    component: <Sizes />,
  },
  {
    type: "collapse",
    name: "Màu sắc",
    key: "colors",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/colors",
    component: <Colors />,
  },
  {
    type: "collapse",
    name: "Khuyến mại",
    key: "promotion",
    icon: <Icon fontSize="small">discount </Icon>,
    route: "/promotions",
    component: <Promotions />,
  },
  {
    type: "collapse",
    name: "Cửa hàng",
    key: "stores",
    icon: <Icon fontSize="small">store_mall_directory_sharp</Icon>,
    route: "/stores",
    component: <Stores />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export const routesAdmin = [
  // {
  //   type: "collapse",
  //   name: "Bảng điều khiển",
  //   key: "dashboard",
  //   icon: <Icon fontSize="small">dashboard</Icon>,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  {
    type: "collapse",
    name: "Sản phẩm",
    key: "products",
    icon: <Icon fontSize="small">inventory_2_outlined </Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Người dùng",
    key: "users",
    icon: <Icon fontSize="small">people_alt_outlined</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Yêu cầu nhập hàng",
    key: "delivery-note",
    icon: <Icon fontSize="small">import_export</Icon>,
    route: "/delivery-note",
    component: <DeliveryNote />,
  },
  {
    type: "collapse",
    name: "Thể loại",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Kích cỡ",
    key: "sizes",
    icon: <Icon fontSize="small">height </Icon>,
    route: "/sizes",
    component: <Sizes />,
  },
  {
    type: "collapse",
    name: "Màu sắc",
    key: "colors",
    icon: <Icon fontSize="small">palette</Icon>,
    route: "/colors",
    component: <Colors />,
  },
  {
    type: "collapse",
    name: "Khuyến mại",
    key: "promotions",
    icon: <Icon fontSize="small">discount</Icon>,
    route: "/promotions",
    component: <Promotions />,
  },
  {
    type: "collapse",
    name: "Cửa hàng",
    key: "stores",
    icon: <Icon fontSize="small">store_mall_directory_sharp</Icon>,
    route: "/stores",
    component: <Stores />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export const routesManager = [
  {
    type: "collapse",
    name: "Thống kê",
    key: "statistic",
    icon: <Icon fontSize="small">analytics </Icon>,
    route: "/statistic",
    component: <Statistic />,
  },
  {
    type: "collapse",
    name: "Sản phẩm",
    key: "products",
    icon: <Icon fontSize="small">inventory_2_outlined</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Danh sách giao / nhập hàng",
    key: "delivery-note",
    icon: <Icon fontSize="small">import_export</Icon>,
    route: "/delivery-note",
    component: <DeliveryNote />,
  },
  {
    type: "collapse",
    name: "Đơn hàng",
    key: "order",
    icon: <Icon fontSize="small">article </Icon>,
    route: "/order",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Kiểm kê",
    key: "inventory",
    icon: <Icon fontSize="small">calculate</Icon>,
    route: "/inventory",
    component: <WarehouseInventory />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
  },

  {
    type: "collapse",
    name: "Nhân viên",
    key: "staff",
    icon: <Icon fontSize="small">people </Icon>,
    route: "/staff",
    component: <Profile />,
  },
];

export const routesOwner = [
  {
    type: "collapse",
    name: "Sản phẩm",
    key: "products",
    icon: <Icon fontSize="small">inventory_2_outlined </Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Thống kê",
    key: "statistic",
    icon: <Icon fontSize="small">analytics </Icon>,
    route: "/statistic",
    component: <Statistic />,
  },
  {
    type: "collapse",
    name: "Cửa hàng",
    key: "stores",
    icon: <Icon fontSize="small">store_mall_directory_sharp </Icon>,
    route: "/stores",
    component: <Stores />,
  },
  {
    type: "collapse",
    name: "Quản lí",
    key: "users",
    icon: <Icon fontSize="small">manage_accounts </Icon>,
    route: "/users",
    component: <Users />,
  },
];
