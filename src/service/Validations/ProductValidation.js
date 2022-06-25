import * as Yup from "yup";

export const SchemaErrorCreateProduct = Yup.object().shape({
  productName: Yup.string()
    .max(2, "Tên sản phẩm phải dưới 50 ký tự")
    .required("Tên sản phẩm không được bỏ trống"),
  brandName: Yup.string().required("Tên thương hiệu không được bỏ trống"),
  sexOption: Yup.string().required("Giới tính không được bỏ trống"),
  categoryOption: Yup.array().required("Thể loại không được bỏ trống"),
  colorOption: Yup.array().required("Màu sắc không được bỏ trống"),
  sizeOption: Yup.string().required("Kích thước không được bỏ trống"),
  description: Yup.string().max(500, "Miêu tả sản phẩm không được quá 500 ký tự"),
  price: Yup.number().required("Giá không được bỏ trống"),
});
