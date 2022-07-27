import * as Yup from "yup";

export const SchemaErrorMessageCreatePromotion = Yup.object().shape({
  promotion_name: Yup.string()
    .min(10, "Tên khuyến mại phải trên 10 ký tự!")
    .max(100, "Tên khuyến mại phải dưới 200 ký tự")
    .required("Tên khuyến mại không được bỏ trống"),
  promotion_value: Yup.number()
    .min(1, "Khuyến mại phải ít nhất 1% !")
    .max(100, "Giá trị khuyến mại không vượt quá 100% !")
    .integer("Khuyến mãi phải là số nguyên!")
    .typeError("Giá trị khuyến mại phải là số")
    .required("Giá trị khuyến mại không được bỏ trống!"),
  apply_date: Yup.date(),
  expired_date: Yup.date().when("apply_date", (apply_date, schema) => {
    if (apply_date) {
      const dayAfter = new Date(apply_date.getTime() + 86400000);

      return schema.min(dayAfter, "Ngày hết hạn phải lớn hơn ngày hiệu lực");
    }

    return schema;
  }),
});
