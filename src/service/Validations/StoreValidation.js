import * as Yup from "yup";

const phoneReg = "^(84|0[3|5|7|8|9])+([0-9]{8})$";

export const SchemaErrorMessageCreateStore = Yup.object().shape({
  storeAddress: Yup.string()
    .min(10, "Địa chỉ phải trên 10 ký tự!")
    .max(70, "Địa chỉ phải dưới 20 ký tự")
    .required("Địa chỉ không được bỏ trống"),
  phone: Yup.string()
    .matches(phoneReg, "Số điện thoại không phù hợp")
    .required("Số điện thoại không được bỏ trống!"),
});
