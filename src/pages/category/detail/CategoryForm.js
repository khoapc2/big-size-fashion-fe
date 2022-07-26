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
import { createCategory } from "../../../redux/actions/categoryAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreateCategory } from "../../../service/Validations/CategoryValidation";
import {
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_SUCCESS,
} from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const initialValues = {
  category: "",
};

export default function CategoryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const response = useSelector((state) => state.createCategoryState);
  const { success, loading, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Tạo thể loại thành công");
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Tạo thể loại thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_CATEGORY_FAIL, payload: false });
    }
  }, [navigate, success, error, triggerReload]);

  const handleReset = () => {};

  const handleSubmit = (data, onSubmitProps) => {
    dispatch(createCategory(data));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaErrorMessageCreateCategory}
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
                name="category"
                label="Thể loại"
                required
                value={props.values.category}
                onChange={props.handleChange}
                error={!!props.errors.category}
                helperText={props.errors.category}
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
            {/* {console.log(props)} */}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
