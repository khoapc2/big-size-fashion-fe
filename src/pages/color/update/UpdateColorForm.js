import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
import { viewDetail, updateColor } from "../../../redux/actions/colorAction";
import { SchemaErrorMessageCreateColor } from "../../../service/Validations/ColorValidation";
import Loading from "../../../components/Loading";
import { UPDATE_COLOR_FAIL, UPDATE_COLOR_SUCCESS } from "../../../service/Validations/VarConstant";

// import { Form } from "./useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function ColorUpdateForm() {
  const { colorId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewColor);
  const triggerReload = useSelector((state) => state.triggerReload);
  const updateStatus = useSelector((state) => state.updateColorState);
  const { success, loadingUpdate, error } = updateStatus;
  const classes = useStyles();

  // const handleReset = () => {};
  useEffect(() => {
    dispatch(viewDetail(colorId));
    if (success) {
      toast.success("Cập nhật màu thành công");
      dispatch({ type: UPDATE_COLOR_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật màu thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_COLOR_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updateColor(submitData, colorId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              color_name: data.colour_name,
              color_code: data.colour_code,
            }}
            validationSchema={SchemaErrorMessageCreateColor}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
            // onReset={handleReset}
          >
            {(props) => (
              <Form className={classes.root}>
                <Grid container>
                  <Grid item xs={6}>
                    <Controls.Input
                      name="color_name"
                      label="Kích cỡ"
                      value={props.values.color_name}
                      onChange={props.handleChange}
                      error={props.errors.color_name}
                      helperText={props.errors.color_name}
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
                      error={!!props.errors.color_code}
                      helperText={props.errors.color_code}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
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
