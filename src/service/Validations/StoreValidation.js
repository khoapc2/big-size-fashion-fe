import * as Yup from "yup";

const phoneReg = "^(84|0[3|5|7|8|9])+([0-9]{8})$";

export const SchemaErrorMessageCreateStore = Yup.object().shape({
  storeName: Yup.string()
    .min(5, "Tên cửa hàng phải trên 5 ký tự!")
    .max(200, "Tên cửa hàng phải dưới 200 ký tự")
    .required("Tên cửa hàng không được bỏ trống"),
  storeAddress: Yup.string()
    .min(10, "Địa chỉ phải trên 10 ký tự!")
    .max(200, "Địa chỉ phải dưới 200 ký tự")
    .required("Địa chỉ không được bỏ trống"),
  phone: Yup.string()
    .matches(phoneReg, "Số điện thoại gồm 10 số, bắt đầu 0 hoặc 84")
    .required("Số điện thoại không được bỏ trống!"),
});
