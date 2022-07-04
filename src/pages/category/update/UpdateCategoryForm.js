import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
import { viewDetail, updateCategory } from "../../../redux/actions/categoryAction";
import { SchemaErrorMessageCreateCategory } from "../../../service/Validations/CategoryValidation";
import Loading from "../../../components/Loading";
import {
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from "../../../service/Validations/VarConstant";

// import { Form } from "./useForm";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function CategoryUpdateForm() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.viewCategory);
  const triggerReload = useSelector((state) => state.triggerReload);
  const updateStatus = useSelector((state) => state.updateCategoryState);
  const { success, loadingUpdate, error } = updateStatus;
  const classes = useStyles();

  // const handleReset = () => {};
  useEffect(() => {
    dispatch(viewDetail(categoryId));
    if (success) {
      toast.success("Cập nhật thể loại thành công");
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật thể loại thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_CATEGORY_FAIL, payload: false });
    }
  }, [success, error, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updateCategory(submitData, categoryId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              category: data.category_name,
            }}
            validationSchema={SchemaErrorMessageCreateCategory}
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
                        name="category"
                        label="Thể loại"
                        value={props.values.category}
                        onChange={props.handleChange}
                        error={props.errors.category}
                        helperText={props.errors.category}
                        fullWidth
                        multiline
                      />
                      {loadingUpdate ? (
                        <Loading />
                      ) : (
                        <Controls.Button type="submit" text="Cập nhật" disabled={loadingUpdate} />
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
