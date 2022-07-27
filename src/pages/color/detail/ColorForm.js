import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
// import { ColorPicker } from "pages/components/colorPicker/colorPicker";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { createColor } from "../../../redux/actions/colorAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreateColor } from "../../../service/Validations/ColorValidation";
import { CREATE_COLOR_FAIL, CREATE_COLOR_SUCCESS } from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  color_name: "",
  color_code: "",
};

export default function ColorForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const response = useSelector((state) => state.createColorState);
  const { success, loading, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Tạo màu thành công");
      dispatch({ type: CREATE_COLOR_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Tạo màu thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_COLOR_FAIL, payload: false });
    }
  }, [navigate, success, error, triggerReload]);

  const handleReset = () => {};

  const handleSubmit = (data, onSubmitProps) => {
    dispatch(createColor(data));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaErrorMessageCreateColor}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {(props) => (
        <Form className={classes.root}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <Controls.Input
                type="text"
                name="color_name"
                label="Tên màu"
                required
                value={props.values.color_name}
                onChange={props.handleChange}
                error={
                  props.touched.color_name && props.errors.color_name
                    ? props.errors.color_name
                    : null
                }
                helperText={
                  props.touched.color_name && props.errors.color_name
                    ? props.errors.color_name
                    : null
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
                type="text"
                name="color_code"
                label="Mã màu(HEX)"
                required
                value={props.values.color_code}
                onChange={props.handleChange}
                error={
                  props.touched.color_code && props.errors.color_code
                    ? props.errors.color_code
                    : null
                }
                helperText={
                  props.touched.color_code && props.errors.color_code
                    ? props.errors.color_code
                    : null
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
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
