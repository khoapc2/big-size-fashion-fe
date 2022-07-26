import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FeedbackList from "./ProductListInPromotion";
import PageHeader from "../../components/createForm/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

export default function OfflineOrderDetail() {
  // const { loading } = useSelector((state) => state.viewStore);

  const classes = useStyles();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PageHeader
        title="Xem đánh giá sản phẩm"
        subTitle="Sử dụng cho kiểm tra, xóa đánh giá tiêu cực"
        icon={<RateReviewIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <FeedbackList />
      </Paper>
    </DashboardLayout>
  );
}
