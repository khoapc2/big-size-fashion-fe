import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "components/Loading";
import { toast } from "react-toastify";
import Controls from "../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { viewOwnProfile, updateProfile } from "../../redux/actions/managerAction";
import { triggerReload } from "../../redux/actions/userAction";

import { SchemaErrorMessageUpdateProfile } from "../../service/Validations/ProfileValidation";
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from "../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function UpdateProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { data, loading } = useSelector((state) => state.viewOwnProfileState);
  const updateStatus = useSelector((state) => state.updateProfileState);
  const { success, loadingUpdate, error } = updateStatus;

  useEffect(() => {
    dispatch(viewOwnProfile());
    if (success) {
      toast.success("Cập nhật thông tin cá nhân thành công");
      navigate(`/profile`);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật thông tin cá nhân thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: false });
    }
  }, [success, error, dispatch, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updateProfile(submitData));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              fullname: data.fullname,
              phone_number: data.phone_number,
              email: data.email,
              birthday: data.birthday.split("/").reverse().join("/"),
            }}
            validationSchema={SchemaErrorMessageUpdateProfile}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form className={classes.root}>
                <Grid container>
                  <Grid item xs={6}>
                    <Controls.Input
                      type="text"
                      name="fullname"
                      label="Họ và tên"
                      required
                      value={props.values.fullname}
                      onChange={props.handleChange}
                      error={!!props.errors.fullname}
                      helperText={props.errors.fullname}
                    />
                    <Controls.Input
                      type="text"
                      name="phone_number"
                      label="Số điện thoại"
                      required
                      value={props.values.phone_number}
                      onChange={props.handleChange}
                      error={!!props.errors.phone_number}
                      helperText={props.errors.phone_number}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      name="email"
                      label="Email"
                      required
                      value={props.values.email}
                      onChange={props.handleChange}
                      error={!!props.errors.email}
                      helperText={props.errors.email}
                    />
                    <Controls.DatePicker
                      name="birthday"
                      label="Ngày sinh"
                      required
                      value={props.values.birthday}
                      onChange={props.handleChange}
                      InputProps={{ readOnly: true }}
                      error={!!props.errors.birthday}
                      helperText={props.errors.birthday}
                    />
                    {loadingUpdate ? (
                      <Loading />
                    ) : (
                      <Controls.Button type="submit" text="Xác nhận" disabled={loadingUpdate} />
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
