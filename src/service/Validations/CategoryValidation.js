import * as Yup from "yup";

export const SchemaErrorMessageCreateCategory = Yup.object().shape({
  category: Yup.string()
    .min(5, "Tên khuyến mại phải trên 5 ký tự!")
    .max(30, "Thể loại tối đa 30 ký tự")
    .required("Thể loại không được bỏ trống"),
});
