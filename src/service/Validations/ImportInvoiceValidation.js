import * as Yup from "yup";

export const SchemaErrorMessageImportInvoice = Yup.object().shape({
  product_name: Yup.string().required("Sản phẩm không được bỏ trống"),
  quantity: Yup.string().required("Số lượng sản phẩm không được bỏ trống"),
  delivery_note_name: Yup.string().required("Tên đơn không được bỏ trống"),
});
