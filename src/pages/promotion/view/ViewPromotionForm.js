import { Grid, makeStyles } from "@material-ui/core";
// import { useState } from "react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import Controls from "../../components/createForm/controls/Controls";
// import { Form } from "./useForm";
import { viewDetail } from "../../../redux/actions/promotionAction";
import { triggerReload } from "../../../redux/actions/userAction";

import { SchemaErrorMessageCreatePromotion } from "../../../service/Validations/PromotionValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function ViewPromotionForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { promotionId } = useParams();
  const classes = useStyles();
  const { data, loading } = useSelector((state) => state.viewPromotion);
  console.log(loading);
  useEffect(() => {
    dispatch(viewDetail(promotionId));
  }, [dispatch, triggerReload]);

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
              apply_date: data.apply_date,
              expired_date: data.expired_date,
            }}
            validationSchema={SchemaErrorMessageCreatePromotion}
            validateOnBlur
            validateOnChange
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
                      inputProps={{ readOnly: true }}
                    />
                    <Controls.Input
                      type="text"
                      name="promotion_value"
                      label="Giá trị khuyến mại(%)"
                      required
                      value={props.values.promotion_value}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      name="apply_date"
                      label="Ngày hiệu lực"
                      required
                      value={props.values.apply_date}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
                    <Controls.Input
                      name="expired_date"
                      label="Ngày hết hạn"
                      required
                      value={props.values.expired_date}
                      onChange={props.handleChange}
                      inputProps={{ readOnly: true }}
                    />
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
