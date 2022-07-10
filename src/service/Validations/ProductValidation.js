import * as Yup from "yup";

Yup.addMethod(Yup.array, "unique", function (field, message) {
  return this.test("unique", message, function (array) {
    const uniqueData = Array.from(new Set(array.map((row) => row[field]?.toLowerCase())));
    const isUnique = array.length === uniqueData.length;
    if (isUnique) {
      return true;
    }
    const index = array.findIndex((row, i) => row[field]?.toLowerCase() !== uniqueData[i]);
    if (array[index][field] === "") {
      return true;
    }
    return this.createError({
      path: `${this.path}.${index}.${field}`,
      message,
    });
  });
});

export const SchemaErrorCreateProduct = Yup.object().shape({
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
  colourWithSize: Yup.array()
    .of(
      Yup.object().shape({
        colour: Yup.string().required("Màu sắc không được bỏ trống"),
        size: Yup.array()
          .min(1, "Kích thước không được bỏ trống")
          .required("Kích thước không được bỏ trống"),
      })
    )
    .min(1)
    .unique("colour", "Màu đã trùng"),
});
