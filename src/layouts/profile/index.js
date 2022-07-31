/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import { viewOwnProfile } from "../../redux/actions/managerAction";
import { triggerReload } from "../../redux/actions/userAction";
import Loading from "../../components/Loading";

// Images

function Overview() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewOwnProfileState);
  useEffect(() => {
    dispatch(viewOwnProfile());
  }, [dispatch, triggerReload]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div style={{ paddingLeft: 5 }}>
          <MDBox mb={2} />
          <Header fullName={data.name}>
            <MDBox mt={5} mb={3}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <ProfileInfoCard
                    title="profile information"
                    info={{
                      fullName: data.fullname,
                      phone: data.phone_number,
                      email: data.email,
                      birthday: data.birthday,
                    }}
                    action={{ route: "/update-profile", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Header>
        </div>
      )}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
