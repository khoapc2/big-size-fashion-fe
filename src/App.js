import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import { routes, routesManager, routesAdmin } from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import Dashboard from "layouts/dashboard";
import Products from "pages/productList/ProductList";

import Billing from "layouts/billing";
import NewProduct from "pages/product/newProduct/NewProduct";
import UpdateProduct from "pages/product/updateProduct/UpdateProduct";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Stores from "pages/stores/list/StoreList";
import Promotions from "pages/promotion/list/promotionList";
import Sizes from "pages/size/list/sizeList";
import Colors from "pages/color/list/colorList";
import Categories from "pages/category/list/categoryList";
// import Employees from "pages/components/createForm/Employees";
import Staffs from "pages/staff/list/staffList";
import Managers from "pages/manager/list/managerList";
import Customers from "pages/customer/list/customerList";
// import Employees from "pages/components/createForm/Employees";
import CreateCategory from "pages/category/detail/CreateCategory";
import Users from "pages/user/userTab";
import DeliveryNote from "pages/deliveryNote/deliveryTab";
import Order from "pages/order/orderTab";
import CreateStore from "pages/stores/createStore/CreateStore";
import StoreDetail from "pages/stores/storeDetail/ViewStore";
import UpdateStore from "pages/stores/storeUpdate/UpdateStore";
import UpdateCategory from "pages/category/update/UpdateCategory";
import CreatePromotion from "pages/promotion/detail/CreatePromotion";
import ViewPromotion from "pages/promotion/view/ViewPromotion";
import UpdatePromotion from "pages/promotion/update/UpdatePromotion";
import UpdateSize from "pages/size/update/UpdateSize";
import CreateSize from "pages/size/detail/CreateSize";
import OfflineOrder from "pages/order/offlineOrder/pending/offlineOrderDetail/ViewOfflineOrder";
import OnlineOrder from "pages/order/onlineOrder/pending/onlineOrderDetail/ViewOnlineOrder";
import CreateColor from "pages/color/detail/CreateColor";
import UpdateColor from "pages/color/update/UpdateColor";
import ViewCustomer from "pages/customer/detail/ViewCustomer";
import CreateAccount from "pages/manager/new/NewAccount";
import CreateStaff from "pages/staff/new/NewAccount";
import ViewEmployee from "pages/manager/view/ViewEmployee";
import ResetPassword from "pages/manager/resetPassword/ResetPassword";
import CreateImport from "pages/deliveryNote/importDeliver/newImport/newImport";
import ViewProduct from "pages/product/view/viewProduct";
import Inventory from "pages/warehouseInventory/storeInventory";
import Statistic from "pages/revenue";
import StaffPerformance from "pages/staff/performance/staffPerformance";
import ImportDeliveryDetail from "pages/deliveryNote/importDeliver/detail/ViewDeliveryNote";
import ExportDeliveryDetail from "pages/deliveryNote/exportDeliver/detail/ViewDeliveryNote";
// import Fader from "pages/components/Fader";
// import { onMessageListener } from "./firebase/firebase";
// import FirebaseNotifications from "./pages/components/FirebaseNotification/FirebaseNotifications";
// import ReactNotificationComponent from "./pages/components/FirebaseNotification/ReactNotifications";
// import Toastify from "./components/Toastify";

// import Product from "./pages/product/Product";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    // openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: "", body: "" });

  // console.log(show, notification);

  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  // Cache for the rtl
  // useMemo(() => {
  //   const cacheRtl = createCache({
  //     key: "rtl",
  //     stylisPlugins: [rtlPlugin],
  //   });

  //   setRtlCache(cacheRtl);
  // }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  // const configsButton = (
  //   <MDBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.25rem"
  //     height="3.25rem"
  //     bgColor="white"
  //     shadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     color="dark"
  //     sx={{ cursor: "pointer" }}
  //     onClick={handleConfiguratorOpen}
  //   >
  //     <Icon fontSize="small" color="inherit">
  //       settings
  //     </Icon>
  //   </MDBox>
  // );

  const renderSideBar = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let role = "";
    if (currentUser) {
      role = currentUser.role;
    }
    switch (role) {
      case "Admin":
        return (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BigSize Management"
            routes={routesAdmin}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        );
      case "Manager":
        return (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BigSize Management"
            routes={routesManager}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        );
      case "Owner":
        return (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BigSize Management"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        );
      default:
        return <h1>No project match</h1>;
    }
  };

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      {/* {show ? (
        <ReactNotificationComponent title={notification.title} body={notification.body} />
      ) : (
        <>
          <div />
          <div />
        </>
      )}
      <FirebaseNotifications />
      <Fader text="Hello React" /> */}
      {layout === "dashboard" && <>{renderSideBar()}</>}
      {layout === "vr"}
      <Routes>
        {/* {getRoutes(routes)} */}
        {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="billing" element={<Billing />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="products" element={<Products />} />
        <Route path="update-product/:productId" element={<UpdateProduct />} />
        <Route path="product/:productId" element={<ViewProduct />} />
        <Route path="newproduct" element={<NewProduct />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="newstore" element={<CreateStore />} />
        <Route path="store/:storeId" element={<StoreDetail />} />
        <Route path="update-store/:storeId" element={<UpdateStore />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/sizes" element={<Sizes />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/categories" element={<Categories />} />
        {/* <Route path="/sizes" element={<Sizes />} /> */}
        <Route path="*" element={<Navigate to="/sign-in" />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/managers" element={<Managers />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/users" element={<Users />} />
        <Route path="newCategory" element={<CreateCategory />} />
        <Route path="update-category/:categoryId" element={<UpdateCategory />} />
        <Route path="newPromotion" element={<CreatePromotion />} />
        <Route path="update-promotion/:promotionId" element={<UpdatePromotion />} />
        <Route path="promotion/:promotionId" element={<ViewPromotion />} />
        <Route path="newSize" element={<CreateSize />} />
        <Route path="update-size/:sizeId" element={<UpdateSize />} />
        <Route path="newColor" element={<CreateColor />} />
        <Route path="update-color/:colorId" element={<UpdateColor />} />
        <Route path="customer/:customerId" element={<ViewCustomer />} />
        <Route path="newAccount" element={<CreateAccount />} />
        <Route path="newStaff" element={<CreateStaff />} />
        <Route path="delivery-note" element={<DeliveryNote />} />
        <Route path="order" element={<Order />} />
        <Route path="offline-order-detail/:offlineOrderId" element={<OfflineOrder />} />
        <Route path="online-order-detail/:onlineOrderId" element={<OnlineOrder />} />
        <Route path="employee/:employeeId" element={<ViewEmployee />} />
        <Route path="reset-password/:employeeId" element={<ResetPassword />} />
        <Route path="create-import-invoice" element={<CreateImport />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="staff" element={<StaffPerformance />} />
        <Route path="delivery-note-detail/:deliveryId" element={<ImportDeliveryDetail />} />
        <Route path="delivery-export-detail/:deliveryId" element={<ExportDeliveryDetail />} />
      </Routes>
    </ThemeProvider>
  );
}
