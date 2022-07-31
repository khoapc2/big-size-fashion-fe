import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import UpdateProfileForm from "./UpdateProfileForm";
import PageHeader from "../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function CreatePromotion() {
  const classes = useStyles();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Chỉnh sửa thông tin cá nhân"
        subTitle="Hãy cung cấp thông tin chính xác"
        icon={<AddBusinessIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <UpdateProfileForm />
      </Paper>
    </DashboardLayout>
  );
}
