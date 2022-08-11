import * as Yup from "yup";

export const SchemaErrorMessageCheckInventory = Yup.object().shape({
  product_name: Yup.string().required("Sản phẩm không được bỏ trống"),
  real_quantity: Yup.number()
    .min(1, "Số lượng phải lớn hơn 0!")
    .max(200, "Số lượng không lớn hơn 200!")
    .integer("Số lượng phải là số nguyên!")
    .typeError("Số lượng phải là số")
    .required("Số lượng không được bỏ trống!"),
});
