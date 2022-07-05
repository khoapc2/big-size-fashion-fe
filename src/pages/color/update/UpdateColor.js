import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import UpdateColorForm from "./UpdateColorForm";
import PageHeader from "../../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function UpdateColor() {
  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Chỉnh sửa kích cỡ"
        subTitle="Thông tin"
        icon={<StoreIcon fontColor="large" />}
      />
      <Paper className={classes.pageContent}>
        <UpdateColorForm />
      </Paper>
    </DashboardLayout>
  );
}
