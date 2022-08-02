import * as Yup from "yup";

export const SchemaErrorMessageCheckInventory = Yup.object().shape({
  product_name: Yup.string().required("Sản phẩm không được bỏ trống"),
  real_quantity: Yup.string().required("Số lượng sản phẩm không được bỏ trống"),
});
