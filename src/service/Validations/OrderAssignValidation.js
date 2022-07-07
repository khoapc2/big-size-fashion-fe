import * as Yup from "yup";

export const SchemaErrorMessageOnlineOrderAssign = Yup.object().shape({
  staff: Yup.string().required("Nhân viên chuẩn bị đơn hàng không được bỏ trống"),
});
