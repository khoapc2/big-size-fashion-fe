import * as Yup from "yup";

export const SchemaErrorMessageCreateCategory = Yup.object().shape({
  category: Yup.string()
    .max(30, "Thể loại tối đa 30 ký tự")
    .required("The loai không được bỏ trống"),
});
