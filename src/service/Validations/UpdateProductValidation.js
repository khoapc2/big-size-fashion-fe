import * as Yup from "yup";

export const SchemaErrorUpdateProduct = Yup.object().shape({
  productName: Yup.string()
    .max(50, "Tên sản phẩm phải dưới 50 ký tự")
    .required("Tên sản phẩm không được bỏ trống"),
  brandName: Yup.string().required("Tên thương hiệu không được bỏ trống"),
  sex: Yup.string().required("Giới tính không được bỏ trống"),
  category: Yup.string().required("Thể loại không được bỏ trống"),
  description: Yup.string()
    .max(500, "Miêu tả sản phẩm không được quá 500 ký tự")
    .required("Miêu tả không được bỏ trống"),
  price: Yup.number().required("Giá không được bỏ trống"),
});
