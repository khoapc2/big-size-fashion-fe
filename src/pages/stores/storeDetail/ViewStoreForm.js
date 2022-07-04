import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { viewDetail } from "../../../redux/actions/storeAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreateStore } from "../../../service/Validations/StoreValidation";
import Loading from "../../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function StoreForm() {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewStore);
  // const triggerReload = useSelector((state) => state.triggerReload);

  console.log(loading);
  const classes = useStyles();

  useEffect(() => {
    dispatch(viewDetail(storeId));
  }, [dispatch, triggerReload]);

  // const handleReset = () => {};

  // const handleSubmit = (data) => {
  //   dispatch(createStore(data));
  // };

  return (
    <div>
      {loading ? (
        <div>
          {console.log("render true")}
          <Loading />
        </div>
      ) : (
        <div>
          {console.log("render fail")}
          <Formik
            initialValues={{
              storeName: data.store_name,
              storeAddress: data.store_address,
              phone: data.store_phone,
            }}
            validationSchema={SchemaErrorMessageCreateStore}
            validateOnBlur
            validateOnChange
            // onSubmit={handleSubmit}
            // onReset={handleReset}
          >
            {(props) => (
              <Form className={classes.root}>
                <Grid container>
                  <Grid item xs={6}>
                    <Controls.Input
                      type="text"
                      name="storeName"
                      label="Tên cửa hàng"
                      value={props.values.storeName}
                      onChange={props.handleChange}
                      fullWidth
                      multiline
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <Controls.Input
                      type="text"
                      name="storeAddress"
                      label="Địa chỉ cửa hàng"
                      value={props.values.storeAddress}
                      onChange={props.handleChange}
                      fullWidth
                      multiline
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  {console.log(props)}
                  <Grid item xs={6}>
                    <Controls.Input
                      name="phone"
                      label="Số điện thoại"
                      value={props.values.phone}
                      onChange={props.handleChange}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    {/* <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  disabled={props.errors && props.isSubmitting}
                />
              </div> */}
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
