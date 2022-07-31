import * as Yup from "yup";

const phoneReg = "^(84|0[3|5|7|8|9])+([0-9]{8})$";

export const SchemaErrorMessageUpdateProfile = Yup.object().shape({
  fullname: Yup.string()
    .min(10, "Tên khuyến mại phải trên 10 ký tự!")
    .max(100, "Tên khuyến mại phải dưới 200 ký tự")
    .required("Tên khuyến mại không được bỏ trống"),
  phone_number: Yup.string()
    .matches(phoneReg, "Số điện thoại gồm 10 số, bắt đầu 0 hoặc 84")
    .required("Số điện thoại không được bỏ trống!"),
  email: Yup.string().required("Số điện thoại không được bỏ trống!"),
  birthday: Yup.date().required("Ngày sinh không được bỏ trống!"),
});
