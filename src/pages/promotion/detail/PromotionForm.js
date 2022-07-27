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
import { createPromotion } from "../../../redux/actions/promotionAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreatePromotion } from "../../../service/Validations/PromotionValidation";
import {
  CREATE_PROMOTION_FAIL,
  CREATE_PROMOTION_SUCCESS,
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
  promotion_name: "",
  promotion_value: "",
  apply_date: "12/12/2022",
  expired_date: "13/12/2022",
};

export default function PromotionForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const response = useSelector((state) => state.createPromotionState);
  const { success, loading, error } = response;
  useEffect(() => {
    if (success) {
      toast.success("Tạo khuyến mại thành công");
      dispatch({ type: CREATE_PROMOTION_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Tạo khuyến mại thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_PROMOTION_FAIL, payload: false });
    }
  }, [navigate, success, error, triggerReload]);

  const handleReset = () => {};

  const handleSubmit = (data, onSubmitProps) => {
    dispatch(createPromotion(data));
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SchemaErrorMessageCreatePromotion}
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
                type="text"
                name="promotion_name"
                label="Tên khuyến mại"
                required
                value={props.values.promotion_name}
                onChange={props.handleChange}
                error={!!props.errors.promotion_name}
                helperText={props.errors.promotion_name}
              />
              <Controls.Input
                type="text"
                name="promotion_value"
                label="Giá trị khuyến mại(%)"
                required
                value={props.values.promotion_value}
                onChange={props.handleChange}
                error={!!props.errors.promotion_value}
                helperText={props.errors.promotion_value}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.DatePicker
                name="apply_date"
                label="Ngày hiệu lực"
                required
                value={props.values.apply_date || ""}
                onChange={props.handleChange}
                error={!!props.errors.apply_date}
                helperText={props.errors.apply_date}
                InputProps={{ readOnly: true }}
              />
              <Controls.DatePicker
                name="expired_date"
                label="Ngày hết hạn"
                required
                value={props.values.expired_date || ""}
                onChange={props.handleChange}
                error={!!props.errors.expired_date}
                helperText={props.errors.expired_date}
                InputProps={{ readOnly: true }}
              />
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
