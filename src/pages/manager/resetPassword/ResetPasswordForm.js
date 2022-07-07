import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { resetPassword } from "redux/actions/customerAction";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorResetPassword } from "../../../service/Validations/ResetPasswordValidation";
import {
  RESET_PASSWORD_ACCOUNT_SUCCESS,
  RESET_PASSWORD_ACCOUNT_FAIL,
} from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function ResetPasswordForm() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const response = useSelector((state) => state.resetPasswordState);
  const { success, loading, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Cập nhật mật khẩu thành công");
      dispatch({ type: RESET_PASSWORD_ACCOUNT_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật mật khẩu thất bại, vui lòng thử lại");
      dispatch({ type: RESET_PASSWORD_ACCOUNT_FAIL, payload: false });
    }
  }, [navigate, success, error, triggerReload]);

  const handleReset = () => {};

  const handleSubmit = (submitData, onSubmitProps) => {
    dispatch(resetPassword(submitData, employeeId));
    onSubmitProps.resetForm();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        password: "",
        password_confirm: "",
        showPassword: false,
        showPasswordConfirm: false,
      }}
      validationSchema={SchemaErrorResetPassword}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {(props) => (
        <Form className={classes.root}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={5}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="Mật khẩu"
                  name="password"
                  placeholder="Nhập mật khẩu mới"
                  value={props.values.password}
                  onChange={props.handleChange}
                  type={props.values.showPassword ? "text" : "password"}
                  error={!!props.errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          props.setFieldValue("showPassword", !props.values.showPassword);
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {props.values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!!props.errors.password && (
                  <FormHelperText error id="accountId-error">
                    {props.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Xác nhận</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-confirm"
                  label="Mật khẩu"
                  name="password_confirm"
                  placeholder="Xác nhận mật khẩu"
                  value={props.values.password_confirm}
                  onChange={props.handleChange}
                  type={props.values.showPasswordConfirm ? "text" : "password"}
                  error={!!props.errors.password_confirm}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          props.setFieldValue(
                            "showPasswordConfirm",
                            !props.values.showPasswordConfirm
                          );
                        }}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {props.values.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!!props.errors.password_confirm && (
                  <FormHelperText error id="accountId-error">
                    {props.errors.password_confirm}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              {loading ? (
                <Loading />
              ) : (
                <Controls.Button type="submit" text="Xác nhận" disabled={loading} />
              )}
            </Grid>
            {/* {console.log(props)} */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
