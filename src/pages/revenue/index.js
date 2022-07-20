// @mui material components
import Grid from "@mui/material/Grid";
// import { DatePicker } from "@material-ui/pickers";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { Form } from "semantic-ui-react";
import { Formik } from "formik";

import {
  // useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Loading from "../../components/Loading";
import { SchemaErrorMessageRevenueManager } from "../../service/Validations/RevenueManagerValidation";
// import Footer from "examples/Footer";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import "./revenue.css";
import { listRevenueInMonthAction } from "../../redux/actions/revenueAction";

function generateArrayOfYears() {
  const max = 2100;
  const min = 2000;
  const year = [];
  for (let i = min; i <= max; i += 1) {
    const element = { key: i, text: i, value: i };
    year.push(element);
  }
  return year;
}
const currentTime = new Date();

const currentMonth = currentTime.getMonth() + 1;
const currentYear = currentTime.getFullYear();

function generateArrayOfMonths() {
  const max = 12;
  const min = 1;
  const month = [];
  for (let i = min; i <= max; i += 1) {
    const element = { key: i, text: i, value: i };
    month.push(element);
  }
  return month;
}

function Dashboard() {
  // const [selectedDate, handleDateChange] = useState(new Date());
  // const [age, setAge] = useState("");

  const { revenue, loading } = useSelector((state) => state.viewRevenue);
  console.log(revenue);
  const triggerReload = useSelector((state) => state.triggerReload);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listRevenueInMonthAction());
  }, [dispatch, triggerReload]);

  const handleSubmit = (data) => {
    console.log(data);
    dispatch(listRevenueInMonthAction(data));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <div className="statistic-header">
              <Form.Group widths="equal">
                <h2>Hôm nay</h2>
                <div className="container">
                  <div className="container-order">
                    <div className="order">
                      <div className="order-label">Tổng số đơn</div>
                      <div className="order-quantity">0</div>
                    </div>
                  </div>
                  <div className="container-order">
                    <div className="order">
                      <div className="order-label">Đơn mới</div>
                      <div className="order-quantity">0</div>
                    </div>
                  </div>
                  <div className="container-order">
                    <div className="order">
                      <div className="order-label">Đang xử lý</div>
                      <div className="order-quantity">0</div>
                    </div>
                  </div>
                  <div className="container-order">
                    <div className="order">
                      <div className="order-label">Giao thành công</div>
                      <div className="order-quantity">0</div>
                    </div>
                  </div>
                  <div className="container-order" style={{ color: "red" }}>
                    <div className="order">
                      <div className="order-label">Hủy</div>
                      <div className="order-quantity">0</div>
                    </div>
                  </div>
                </div>
              </Form.Group>
            </div>
            <div className="statistic-header-container-input">
              <h2>Doanh thu</h2>
              {/* <div className="statistic-header-1">Biểu đồ doanh thu</div> */}
              <div className="statistic-header-2">
                <Formik
                  initialValues={{
                    month: currentMonth,
                    year: currentYear,
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={SchemaErrorMessageRevenueManager}
                  // validateOnBlur
                  // validateOnChange
                  // onReset={handleReset}
                >
                  {(formik) => {
                    console.log(formik);
                    return (
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group widths="4">
                          <Form.Select
                            // key={store.value}
                            // fluid
                            label="Tháng"
                            options={generateArrayOfMonths()}
                            placeholder="Chọn tháng"
                            onChange={(e, v) => {
                              formik.setFieldValue("month", v.value);
                            }}
                            name="month"
                            value={formik.values.month}
                            error={formik.errors.month}
                          />
                          <Form.Select
                            // key={store.value}
                            // fluid
                            label="Năm"
                            options={generateArrayOfYears()}
                            placeholder="Chọn năm"
                            onChange={(e, v) => {
                              formik.setFieldValue("year", v.value);
                            }}
                            name="year"
                            value={formik.values.year}
                            error={formik.errors.year}
                          />
                          <Form.Button type="submit" label="." color="green">
                            Xem
                          </Form.Button>
                        </Form.Group>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="statistic-header">
          <Form.Group widths="equal">
            <h2>Trong tháng </h2>
            <div className="container">
              <div className="container-order">
                <div className="order">
                  <div className="order-label">Tổng số đơn</div>
                  <div className="order-quantity">0</div>
                </div>
              </div>
              <div className="container-order">
                <div className="order">
                  <div className="order-label">Đơn mới</div>
                  <div className="order-quantity">0</div>
                </div>
              </div>
              <div className="container-order">
                <div className="order">
                  <div className="order-label">Đang xử lý</div>
                  <div className="order-quantity">0</div>
                </div>
              </div>
              <div className="container-order">
                <div className="order">
                  <div className="order-label">Giao thành công</div>
                  <div className="order-quantity">0</div>
                </div>
              </div>
              <div className="container-order" style={{ color: "red" }}>
                <div className="order">
                  <div className="order-label">Hủy</div>
                  <div className="order-quantity">0</div>
                </div>
              </div>
            </div>
          </Form.Group>
        </div>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3}>
                {loading ? (
                  <Loading />
                ) : (
                  <ReportsLineChart
                    color="info"
                    title="Doanh thu cửa hàng trong 1 tháng"
                    description="Last Campaign Performance"
                    // date="campaign sent 2 days ago"
                    chart={revenue}
                  />
                )}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
