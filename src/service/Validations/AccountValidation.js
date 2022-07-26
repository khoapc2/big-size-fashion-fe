import * as Yup from "yup";

const phoneReg = "^(84|0[3|5|7|8|9])+([0-9]{8})$";

export const SchemaErrorCreateAccount = Yup.object().shape({
  username: Yup.string()
    .max(50, "Tên tài khoản phải dưới 50 ký tự")
    .required("Tên tài khoản không được bỏ trống"),
  password: Yup.string().required("Mật khẩu không được bỏ trống"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Mật khẩu xác nhận không được bỏ trống"),
  fullname: Yup.string().required("Họ tên không được bỏ trống"),
  store_id: Yup.string().required("Cửa hàng không được bỏ trống"),
  phone_number: Yup.string()
    .matches(phoneReg, "Số điện thoại gồm 10 số, bắt đầu 0 hoặc 84")
    .required("Số điện thoại không được bỏ trống"),
});
