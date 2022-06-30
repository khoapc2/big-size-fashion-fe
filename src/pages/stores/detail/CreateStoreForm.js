import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { createStore } from "../../../redux/actions/storeAction";

import { SchemaErrorMessageCreateStore } from "../../../service/Validations/StoreValidation";

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

  const handleSubmit = (data) => {
    dispatch(createStore(data));
  };

  return (
    <Formik
      initialValues={{
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
            {console.log(props)}
            <Grid item xs={6}>
              <Controls.Input
                name="phone"
                label="Số điện thoại"
                value={props.values.phone}
                onChange={props.handleChange}
                error={props.errors.phone}
                helperText={props.errors.phone}
              />
              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  disabled={props.errors && props.isSubmitting}
                />
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
