import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import { toast } from "react-toastify";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { viewDetail, updatePromotion } from "../../../redux/actions/promotionAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreatePromotion } from "../../../service/Validations/PromotionValidation";
import {
  UPDATE_PROMOTION_FAIL,
  UPDATE_PROMOTION_SUCCESS,
} from "../../../service/Validations/VarConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function UpdatePromotionForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { promotionId } = useParams();
  const classes = useStyles();
  const { data, loading } = useSelector((state) => state.viewPromotion);
  const updateStatus = useSelector((state) => state.updatePromotionState);
  const { success, loadingUpdate, error } = updateStatus;

  useEffect(() => {
    dispatch(viewDetail(promotionId));
    if (success) {
      toast.success("Cập nhật khuyến mại thành công");
      dispatch({ type: UPDATE_PROMOTION_SUCCESS, payload: false });
    } else {
      // console.log(`create:${success}`);
    }
    if (error) {
      // console.log(error);
      toast.error("Cập nhật khuyến mại thất bại, vui lòng thử lại");
      dispatch({ type: UPDATE_PROMOTION_FAIL, payload: false });
    }
  }, [success, error, dispatch, triggerReload]);

  const handleSubmit = (submitData) => {
    dispatch(updatePromotion(submitData, promotionId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              promotion_name: data.promotion_name,
              promotion_value: data.promotion_value,
              apply_date: data.apply_date.split("/").reverse().join("/"),
              expired_date: data.expired_date.split("/").reverse().join("/"),
            }}
            validationSchema={SchemaErrorMessageCreatePromotion}
            validateOnBlur
            validateOnChange
            onSubmit={handleSubmit}
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
                      value={props.values.apply_date}
                      onChange={props.handleChange}
                      InputProps={{ readOnly: true }}
                      error={!!props.errors.apply_date}
                      helperText={props.errors.apply_date}
                    />
                    <Controls.DatePicker
                      name="expired_date"
                      label="Ngày hết hạn"
                      required
                      value={props.values.expired_date}
                      onChange={props.handleChange}
                      InputProps={{ readOnly: true }}
                      error={!!props.errors.expired_date}
                      helperText={props.errors.expired_date}
                    />
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
