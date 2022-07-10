import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Link } from "react-router-dom";
import ImportDeliver from "pages/deliveryNote/importDeliver/importDeliver";
import ExportDeliver from "pages/deliveryNote/exportDeliver/exportDeliver";

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
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
            <Tab icon={<AddBusinessIcon />} label="Danh sách nhập hàng" value="1" />
            <Tab icon={<LocalShippingIcon />} label="Danh sách xuất hàng" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ImportDeliver />
        </TabPanel>
        <TabPanel value="2">
          <ExportDeliver />
        </TabPanel>
      </TabContext>
    </DashboardLayout>
  );
}
