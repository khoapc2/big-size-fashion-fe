import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
import { viewDetail, updateStore } from "../../../redux/actions/storeAction";
import { SchemaErrorMessageCreateStore } from "../../../service/Validations/StoreValidation";
import Loading from "../../../components/Loading";
import { UPDATE_STORE_FAIL, UPDATE_STORE_SUCCESS } from "../../../service/Validations/VarConstant";

// import { Form } from "./useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function StoreUpdateForm() {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewStore);
  const triggerReload = useSelector((state) => state.triggerReload);
  const updateStatus = useSelector((state) => state.updateStoreState);
  const { success, loadingUpdate, error } = updateStatus;
  const classes = useStyles();

  // const handleReset = () => {};
  useEffect(() => {
    dispatch(viewDetail(storeId));
    if (success) {
      toast.success("Cập nhật cửa hàng thành công");
      dispatch({ type: UPDATE_STORE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật cửa hàng thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_STORE_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updateStore(submitData, storeId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              storeName: data.store_name,
              storeAddress: data.store_address,
              phone: data.store_phone,
            }}
            validationSchema={SchemaErrorMessageCreateStore}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
            // onReset={handleReset}
          >
            {(props) => {
              console.log(props);

              return (
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
                        multiline
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
                      {loadingUpdate ? (
                        <Loading />
                      ) : (
                        <Controls.Button type="submit" text="Xác nhận" disabled={loadingUpdate} />
                      )}
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}
