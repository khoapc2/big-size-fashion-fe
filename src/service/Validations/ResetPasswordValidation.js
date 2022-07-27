import * as Yup from "yup";

export const SchemaErrorResetPassword = Yup.object().shape({
  password: Yup.string()
    .required("Mật khẩu không được bỏ trống")
    .min(3, "Mật khẩu không ít hơn 3 kí tự"),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .min(3, "Mật khẩu không ít hơn 3 kí tự"),
});
