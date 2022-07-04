import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Link } from "react-router-dom";
import Customers from "pages/customer/list/customerList";
import Managers from "pages/manager/list/managerList";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import BadgeIcon from "@mui/icons-material/Badge";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

export default function Layout() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>CRUD đăng nhập vào tài khoản manager để thao tác</h1>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
            <Tab icon={<AddBusinessIcon />} label="Danh sách nhập hàng" value="1" />
            <Tab icon={<LocalShippingIcon />} label="Danh sách xuất hàng" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Customers />
        </TabPanel>
        <TabPanel value="2">
          <Managers />
        </TabPanel>
      </TabContext>
    </DashboardLayout>
  );
}
