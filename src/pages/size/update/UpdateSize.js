import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import UpdateStoreForm from "./UpdateSizeForm";
import PageHeader from "../../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function UpdateStore() {
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Chỉnh sửa kích cỡ"
        subTitle="Thông tin"
        icon={<StoreIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <UpdateStoreForm />
      </Paper>
    </DashboardLayout>
  );
}
