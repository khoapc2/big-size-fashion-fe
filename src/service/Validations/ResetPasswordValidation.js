import * as Yup from "yup";

export const SchemaErrorResetPassword = Yup.object().shape({
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
  password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
});
