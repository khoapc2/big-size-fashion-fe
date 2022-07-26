import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
import { viewDetail, updateSize } from "../../../redux/actions/sizeAction";
import { SchemaErrorMessageCreateSize } from "../../../service/Validations/SizeValidation";
import Loading from "../../../components/Loading";
import { UPDATE_SIZE_FAIL, UPDATE_SIZE_SUCCESS } from "../../../service/Validations/VarConstant";

// import { Form } from "./useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function SizeUpdateForm() {
  const { sizeId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewSize);
  const triggerReload = useSelector((state) => state.triggerReload);
  const updateStatus = useSelector((state) => state.updateSizeState);
  const { success, loadingUpdate, error } = updateStatus;
  const classes = useStyles();

  // const handleReset = () => {};
  useEffect(() => {
    dispatch(viewDetail(sizeId));
    if (success) {
      toast.success("Cập nhật kích cỡ thành công");
      dispatch({ type: UPDATE_SIZE_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật kích cỡ thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_SIZE_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updateSize(submitData, sizeId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              size: data.size_name,
            }}
            validationSchema={SchemaErrorMessageCreateSize}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
            // onReset={handleReset}
          >
            {(props) => (
              <Form className={classes.root}>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={6}>
                    <Controls.Input
                      name="size"
                      label="Kích cỡ"
                      value={props.values.size}
                      onChange={props.handleChange}
                      error={props.errors.size}
                      helperText={props.errors.size}
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item xs={2}>
                    {loadingUpdate ? (
                      <Loading />
                    ) : (
                      <Controls.Button type="submit" text="Cập nhật" disabled={loadingUpdate} />
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
