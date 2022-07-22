import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import { Link } from "react-router-dom";
import Customers from "pages/customer/list/customerList";
import Staffs from "pages/staff/list/staffList";
import Managers from "pages/manager/list/managerList";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BadgeIcon from "@mui/icons-material/Badge";

function authen() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { role } = currentUser;
  return role;
}

export default function Layout() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  console.log(authen());
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
            {console.log(authen())}
            {authen() === "Admin"
              ? [
                  <Tab icon={<AccessibilityNewIcon />} label="Khách hàng" value="1" key="1" />,
                  <Tab icon={<ManageAccountsIcon />} label="Người quản lý" value="2" key="2" />,
                  <Tab icon={<BadgeIcon />} label="Nhân viên" value="3" key="3" />,
                ]
              : ""}
            {authen() === "Owner" ? (
              <Tab icon={<ManageAccountsIcon />} label="Quản lý cửa hàng" value="1" />
            ) : (
              ""
            )}
          </TabList>
        </Box>
        {authen() === "Admin" ? (
          <>
            <TabPanel value="1">
              <Customers />
            </TabPanel>
            <TabPanel value="2">
              <Managers />
            </TabPanel>
            <TabPanel value="3">
              <Staffs />
            </TabPanel>
          </>
        ) : (
          ""
        )}
        {authen() === "Owner" ? (
          <TabPanel value="1">
            <Managers />
          </TabPanel>
        ) : (
          ""
        )}
      </TabContext>
    </DashboardLayout>
  );
}
