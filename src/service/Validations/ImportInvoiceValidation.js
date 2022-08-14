import * as Yup from "yup";

export const SchemaErrorMessageImportInvoice = Yup.object().shape({
  product_name: Yup.string().required("Sản phẩm không được bỏ trống"),
  quantity: Yup.number()
    .min(1, "Số lượng phải lớn hơn 0!")
    .max(200, "Số lượng không lớn hơn 200!")
    .integer("Số lượng phải là số nguyên!")
    .typeError("Giá trị số lượng phải là số")
    .required("Giá trị số lượng không được bỏ trống!"),
  delivery_note_name: Yup.string().required("Tên đơn không được bỏ trống"),
});
