import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// react-router components
import { useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  // setOpenConfigurator,
} from "context";
import "./styleNavBar.css";
import { logout } from "../../../redux/actions/userAction";
import { viewOwnProfile } from "../../../redux/actions/managerAction";
import {
  REMOVE_DELIVERY_CART,
  REMOVE_INVENTORY_PRODUCT_LIST_LOG_OUT,
  CREATE_INVENTORY_NOTE_TRIGGER,
} from "../../../service/Validations/VarConstant";

function DashboardNavbar({ absolute, light, isMini }) {
  const { deliveryNote } = useSelector((state) => state.deliveryCart);
  const profile = useSelector((state) => state.viewOwnProfileState);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  // const [openMenu, setOpenMenu] = useState(false);
  const [openAccount, setAccount] = useState(false);
  // const { userToken } = useSelector((state) => state.userToken);

  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    // if (userToken) {
    //   const currentUser = JSON.parse(localStorage.getItem("user"));
    //   if (currentUser) {
    //     const { token } = currentUser;
    //     if (userToken !== token) {
    //       dispatch({ type: DELIVERY_CART, payload: "" });
    //     }
    //   }
    // }

    dispatcher(viewOwnProfile());
  }, []);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleCloseMenu = () => setOpenMenu(false);

  const handleOpenAccount = (event) => setAccount(event.currentTarget);
  const handleCloseAccount = () => setAccount(false);

  // Log out
  const signOut = () => {
    dispatcher({ type: REMOVE_DELIVERY_CART });
    dispatcher({ type: CREATE_INVENTORY_NOTE_TRIGGER });
    dispatcher({ type: REMOVE_INVENTORY_PRODUCT_LIST_LOG_OUT });
    dispatcher(logout());
    navigate("/");
  };

  // Render the user menu
  const renderAccountMenu = () => (
    <Menu
      anchorEl={openAccount}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openAccount)}
      onClose={handleCloseAccount}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>login</Icon>} title="Đăng xuất" onClick={() => signOut()} />
      {/* <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
    </Menu>
  );

  // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs
            icon="home"
            // title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
            {profile.data.role === "Manager" && (
              <div className="header-navbar-profile-name">Quản Lí, {profile.data.fullname}</div>
            )}
            {profile.data.role === "Admin" && (
              <div className="header-navbar-profile-name">
                Quản trị viên, {profile.data.fullname}
              </div>
            )}
            {profile.data.role === "Owner" && (
              <div className="header-navbar-profile-name">{profile.data.fullname}</div>
            )}
            <MDBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in/basic"> */}
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                onClick={handleOpenAccount}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {renderAccountMenu()}
              {/* </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              {profile.data.role === "Manager" && (
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={() => navigate("/create-import-invoice")}
                >
                  <div className="delivery-header-fix-icon">
                    <Icon sx={iconsStyle}> local_shipping_icon </Icon>
                    {deliveryNote.length > 0 && (
                      <div className="number-delivery">{deliveryNote.length}</div>
                    )}
                  </div>
                </IconButton>
              )}

              {/* {renderMenu()} */}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
