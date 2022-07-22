import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Loading from "components/Loading";

// Images
import bgImage from "assets/images/bg-sign-in.jpg";
import { useEffect } from "react";
import { SchemaErrorMessageLogin } from "../../../service/Validations/UserValidation";
// import userApi from "api/userApi";
import "./login.css";
import { guestLogin, triggerReload } from "../../../redux/actions/userAction";
import { USER_LOGIN_FAIL } from "../../../service/Validations/VarConstant";

const initialValues = {
  username: "",
  password: "",
};

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = user;

  const onSubmit = ({ username, password }) => {
    dispatch(guestLogin(username, password));
  };

  useEffect(() => {
    // console.log(userInfo);
    if (userInfo) {
      if (userInfo.role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else if (userInfo.role === "Manager") {
        navigate("/statistic", { replace: true });
      } else if (userInfo.role === "Owner") {
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Tài khoản không có quyền truy cập");
        localStorage.removeItem("user");
      }
    }
    if (error) {
      console.log(error);
      toast.error("Sai tài khoản hoặc mật khẩu, vui lòng thử lại");
      dispatch({ type: USER_LOGIN_FAIL, payload: false });
    }
  }, [navigate, userInfo, error, triggerReload]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Đăng nhập
          </MDTypography>
        </MDBox>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SchemaErrorMessageLogin}
          validateOnBlur
          validateOnChange
        >
          {(props) => (
            <Form>
              <MDBox pt={4} pb={3} px={3}>
                {/* <MDBox component="form" role="form"> */}
                <MDBox mb={2}>
                  <MDInput
                    name="username"
                    type="text"
                    label="Tài khoản"
                    // onChange={handleChange}
                    required
                    fullWidth
                    value={props.values.username}
                    onChange={props.handleChange}
                    error={!!props.errors.username}
                    helperText={props.errors.username}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="password"
                    type="password"
                    label="Mật khẩu"
                    required
                    fullWidth
                    value={props.values.password}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    error={!!props.errors.password}
                    helperText={props.errors.password}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      // disabled={props.errors && props.isSubmitting}
                      type="submit"
                    >
                      Nhập
                    </MDButton>
                  )}
                </MDBox>
                {/* </MDBox> */}
              </MDBox>
            </Form>
          )}
        </Formik>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
