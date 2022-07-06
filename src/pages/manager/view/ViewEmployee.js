import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ViewEmployeeForm from "./ViewEmployeeForm";
import PageHeader from "../../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function ViewEmployee() {
  const classes = useStyles();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Xem thông tin nhân viên"
        subTitle="Sử dụng cho kiểm tra thông tin nhân viên"
        icon={<AddBusinessIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <ViewEmployeeForm />
      </Paper>
    </DashboardLayout>
  );
}
