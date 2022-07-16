import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
// import { Link } from "react-router-dom";
import OfflineReceiverOrder from "pages/order/offlineOrder/receiver/offlineReceivedOrder";
import OfflinePendingOrder from "pages/order/offlineOrder/pending/list/offlineOrder";
import OfflineRejectOrder from "pages/order/offlineOrder/reject/offlineRejectOrder";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

export default function Layout() {
  const [selectedTab, setSelectedTab] = React.useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <TabContext value={selectedTab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="secondary">
          <Tab icon={<PendingActionsIcon />} label="Chờ xác nhận" value="1" />
          <Tab icon={<CheckBoxIcon />} label="Đã nhận hàng" value="2" />
          <Tab icon={<DisabledByDefaultIcon />} label="Từ chối" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <OfflinePendingOrder />
      </TabPanel>
      <TabPanel value="2">
        <OfflineReceiverOrder />
      </TabPanel>
      <TabPanel value="3">
        <OfflineRejectOrder />
      </TabPanel>
    </TabContext>
  );
}
