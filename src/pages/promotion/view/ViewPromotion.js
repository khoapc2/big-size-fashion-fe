import React from "react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ViewPromotionForm from "./ViewPromotionForm";
import PageHeader from "../../components/createForm/PageHeader";

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
        title="Xem thông tin khuyến mại mới"
        subTitle="Sử dụng cho cửa hàng mới"
        icon={<AddBusinessIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <ViewPromotionForm />
      </Paper>
    </DashboardLayout>
  );
}
