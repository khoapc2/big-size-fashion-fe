import * as Yup from "yup";

export const SchemaErrorMessageCreateInventoryNote = Yup.object().shape({
  inventory_note_name: Yup.string().required("Tên đơn không được bỏ trống"),
  from_date: Yup.date().required("Ngày bắt đầu không được bỏ trống"),
  to_date: Yup.date()
    .when("from_date", (from_date, schema) => {
      if (from_date) {
        const dayAfter = new Date(from_date.getTime() + 86400000);
        return schema.min(dayAfter, "Ngày kiểm kê phải bé hơn ngày hiện hành");
      }
      return schema;
    })
    .required("Ngày kết thúc không được bỏ trống"),
});
