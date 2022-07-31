import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ViewAdjustInventory from "./ViewAdjustInventoryForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function OnlineOrderDetail() {
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Paper className={classes.pageContent}>
        <ViewAdjustInventory />
      </Paper>
    </DashboardLayout>
  );
}
