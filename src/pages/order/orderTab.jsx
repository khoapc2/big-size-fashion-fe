import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Link } from "react-router-dom";
import OnlineOrderTab from "pages/order/onlineOrder/onlineOrderTab";
import OfflineOrderTab from "pages/order/offlineOrder/offlineOrderTab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

export default function Layout() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
            <Tab icon={<AddBusinessIcon />} label="Đơn hàng offline" value="1" />
            <Tab icon={<ShoppingCartIcon />} label="Đơn hàng online" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OfflineOrderTab />
        </TabPanel>
        <TabPanel value="2">
          <OnlineOrderTab />
        </TabPanel>
      </TabContext>
    </DashboardLayout>
  );
}
