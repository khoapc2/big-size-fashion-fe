import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Link } from "react-router-dom";
import OnlineOrder from "pages/order/onlineOrder/onlineOrder";
import OfflineOrder from "pages/order/offlineOrder/offlineOrder";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function Layout() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TabContext value={selectedTab}>
        <h1>Đăng nhập bằng role Manager để sử dụng chức năng</h1>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
            <Tab icon={<AccessibilityNewIcon />} label="Đơn hàng online" value="1" />
            <Tab icon={<ManageAccountsIcon />} label="Đơn hàng offline" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OnlineOrder />
        </TabPanel>
        <TabPanel value="2">
          <OfflineOrder />
        </TabPanel>
      </TabContext>
    </DashboardLayout>
  );
}
