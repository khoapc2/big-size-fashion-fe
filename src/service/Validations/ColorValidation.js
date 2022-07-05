import * as Yup from "yup";

const colorCodeReg = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

export const SchemaErrorMessageCreateColor = Yup.object().shape({
  color_name: Yup.string()
    .max(30, "Tên màu tối đa 30 ký tự")
    .required("Tên màu không được bỏ trống"),
  color_code: Yup.string()
    .matches(colorCodeReg, "Mã màu Hex, bắt đầu bằng kí tự #")
    .required("Mã màu không được bỏ trống"),
});
