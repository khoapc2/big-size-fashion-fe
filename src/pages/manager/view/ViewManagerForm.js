import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { viewDetail } from "../../../redux/actions/customerAction";
import { triggerReload } from "../../../redux/actions/userAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function ViewManagerForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { customerId } = useParams();
  const classes = useStyles();
  const { data, loading } = useSelector((state) => state.viewAccount);
  console.log(loading);
  useEffect(() => {
    dispatch(viewDetail(customerId));
  }, [dispatch, triggerReload]);

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
              email: data.email ? data.email : "Chưa có",
              birthday: data.birthday ? data.birthday : "Chưa có",
              gender: data.gender,
            }}
            validateOnBlur
            validateOnChange
          >
            {(props) => (
              <Form className={classes.root}>
                <Grid container>
                  <Grid item xs={6}>
                    <Controls.Input
                      type="text"
                      name="fullname"
                      label="Tên khách hàng"
                      required
                      value={props.values.fullname}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                    <Controls.Input
                      type="text"
                      name="phone_number"
                      label="Tài khoản/Số điện thoại"
                      required
                      value={props.values.phone_number}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                    <Controls.Input
                      type="text"
                      name="email"
                      label="Email"
                      value={props.values.email}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      name="birthday"
                      label="Ngày sinh"
                      value={props.values.birthday}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                    <Controls.Input
                      name="gender"
                      label="Giới tính"
                      value={props.values.gender}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
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
