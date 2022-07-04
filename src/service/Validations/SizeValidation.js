import * as Yup from "yup";

export const SchemaErrorMessageCreateSize = Yup.object().shape({
  size: Yup.string().max(30, "Thể loại tối đa 30 ký tự").required("Thể loại không được bỏ trống"),
});
