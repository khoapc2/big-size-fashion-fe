import * as Yup from "yup";

export const SchemaErrorMessageLogin = Yup.object().shape({
  username: Yup.string()
    .min(3, "Tài khoản phải trên 3 ký tự!")
    .max(20, "Tài khoản phải dưới 20 ký tự")
    .required("Tài khoản không được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
});

export const Lohou = Yup.object().shape({
  username: Yup.string()
    .min(8, "Tài khoản phải trên 3 ký tự!")
    .max(20, "Tài khoản phải dưới 20 ký tự")
    .required("Tài khoản không được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
});
