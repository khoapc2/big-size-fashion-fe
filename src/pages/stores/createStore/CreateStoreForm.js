import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
import { triggerReload } from "../../../redux/actions/userAction";
// import { Form } from "./useForm";
import { createStore } from "../../../redux/actions/storeAction";
import Loading from "../../../components/Loading";
import { SchemaErrorMessageCreateStore } from "../../../service/Validations/StoreValidation";
import { CREATE_STORE_FAIL, CREATE_STORE_SUCCESS } from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function StoreForm() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleReset = () => {};

  const response = useSelector((state) => state.createStoreState);
  const { success, loading, error } = response;

  const handleSubmit = (data) => {
    dispatch(createStore(data));
  };

  useEffect(() => {
    if (success) {
      toast.success("Tạo cửa hàng thành công");
      dispatch({ type: CREATE_STORE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Tạo cửa hàng thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_STORE_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  return (
    <Formik
      initialValues={{
        storeName: "",
        storeAddress: "",
        phone: "",
      }}
      validationSchema={SchemaErrorMessageCreateStore}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {(props) => (
        <Form className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="storeName"
                label="Tên cửa hàng"
                value={props.values.storeName}
                onChange={props.handleChange}
                error={props.errors.storeName}
                helperText={props.errors.storeName}
                fullWidth
              />
              <Controls.Input
                name="storeAddress"
                label="Địa chỉ cửa hàng"
                value={props.values.storeAddress}
                onChange={props.handleChange}
                error={props.errors.storeAddress}
                helperText={props.errors.storeAddress}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                name="phone"
                label="Số điện thoại"
                value={props.values.phone}
                onChange={props.handleChange}
                error={props.errors.phone}
                helperText={props.errors.phone}
              />
              {loading ? (
                <Loading />
              ) : (
                <Controls.Button type="submit" text="Xác nhận" disabled={loading} />
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
