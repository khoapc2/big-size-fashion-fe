import * as Yup from "yup";

export const SchemaErrorMessageStaffPerformance = Yup.object().shape({
  month: Yup.string().required("Tháng không được bỏ trống"),
  year: Yup.string().required("Năm không được bỏ trống"),
});
