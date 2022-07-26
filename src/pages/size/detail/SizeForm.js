import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { createSize } from "../../../redux/actions/sizeAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreateSize } from "../../../service/Validations/SizeValidation";
import { CREATE_SIZE_FAIL, CREATE_SIZE_SUCCESS } from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  size: "",
};

export default function SizeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const response = useSelector((state) => state.createSizeState);
  const { success, loading, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Tạo kích cỡ thành công");
      dispatch({ type: CREATE_SIZE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Tạo kích cỡ thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_SIZE_FAIL, payload: false });
    }
  }, [navigate, success, error, triggerReload]);

  const handleReset = () => {};

  const handleSubmit = (data, onSubmitProps) => {
    dispatch(createSize(data));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaErrorMessageCreateSize}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {(props) => (
        <Form className={classes.root}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Controls.Input
                type="text"
                name="size"
                label="Kích cỡ"
                required
                value={props.values.size}
                onChange={props.handleChange}
                error={!!props.errors.size}
                helperText={props.errors.size}
                fullWidth
                multiline
              />
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
