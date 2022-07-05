import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ColorForm from "./ColorForm";
import PageHeader from "../../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function CreateColor() {
  const classes = useStyles();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Thêm màu sắc mới"
        subTitle="Sử dụng cho cửa hàng mới"
        icon={<AddBusinessIcon fontColor="large" />}
      />
      <Paper className={classes.pageContent}>
        <ColorForm />
      </Paper>
    </DashboardLayout>
  );
}
