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
import routes from "routes";

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
import Product from "pages/product/Product";
import NewProduct from "pages/newProduct/NewProduct";

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
// import Employees from "pages/components/createForm/Employees";
import Store from "pages/stores/detail/Store";

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
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="BigSize Management"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator /> */}
          {/* {configsButton} */}
        </>
      )}
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
        <Route path="product/:productId" element={<Product />} />
        <Route path="newproduct" element={<NewProduct />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/sizes" element={<Sizes />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="newstore" element={<Store />} />
        {/* <Route path="/sizes" element={<Sizes />} /> */}
        <Route path="*" element={<Navigate to="/sign-in" />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/managers" element={<Managers />} />
        {/* <Route path="/product/:productId">
          <Product />
        </Route> */}
      </Routes>
    </ThemeProvider>
  );
}
