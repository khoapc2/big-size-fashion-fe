import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
// import { Link } from "react-router-dom";
import OnlinePendingOrder from "pages/order/onlineOrder/pending/list/onlineOrder";
import OnlineApprovedOrder from "pages/order/onlineOrder/approve/list/onlineApprovedOrder";
import OnlineDeliveryOrder from "pages/order/onlineOrder/delivery/list/onlineDeliveryOrder";
import OnlinePackagedOrder from "pages/order/onlineOrder/packaged/list/onlinePackagedOrder";
import OnlineReceivedOrder from "pages/order/onlineOrder/received/list/onlineReceivedOrder";
import OnlineRejectOrder from "pages/order/onlineOrder/reject/list/onlineRejectOrder";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

export default function OnlineOrderTab() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <TabContext value={selectedTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
          <Tab icon={<PendingActionsIcon />} label="Chờ xác nhận" value="1" />
          <Tab icon={<AssignmentTurnedInIcon />} label="Đã xác nhận" value="2" />
          <Tab icon={<Inventory2Icon />} label="Đã đóng gói" value="3" />
          <Tab icon={<LocalShippingIcon />} label="Đang giao" value="4" />
          <Tab icon={<CheckBoxIcon />} label="Đã nhận hàng" value="5" />
          <Tab icon={<DisabledByDefaultIcon />} label="Từ chối" value="6" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <OnlinePendingOrder />
      </TabPanel>
      <TabPanel value="2">
        <OnlineApprovedOrder />
      </TabPanel>
      <TabPanel value="3">
        <OnlinePackagedOrder />
      </TabPanel>
      <TabPanel value="4">
        <OnlineDeliveryOrder />
      </TabPanel>
      <TabPanel value="5">
        <OnlineReceivedOrder />
      </TabPanel>
      <TabPanel value="6">
        <OnlineRejectOrder />
      </TabPanel>
    </TabContext>
  );
}
