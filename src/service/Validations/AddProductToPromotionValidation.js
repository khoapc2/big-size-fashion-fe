import * as Yup from "yup";

export const SchemaErrorMessageAddProductToPromotion = Yup.object().shape({
  product_id: Yup.string().required("Thể loại không được bỏ trống"),
});
