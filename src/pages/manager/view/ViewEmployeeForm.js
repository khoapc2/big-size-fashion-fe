// import { useState } from "react";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
// import { Form } from "./useForm";
import { viewDetail } from "../../../redux/actions/customerAction";
import { triggerReload } from "../../../redux/actions/userAction";

export default function ViewEmployeeForm() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { employeeId } = useParams();
  const { data, loading } = useSelector((state) => state.viewAccount);
  console.log(loading);
  useEffect(() => {
    dispatch(viewDetail(employeeId));
  }, [dispatch, triggerReload]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              username: data.username,
              store_name: data.store_name,
              email: data.email ? data.email : "Chưa có",
              fullname: data.fullname,
              phone_number: data.phone_number,
              gender: data.gender ? data.gender : "Chưa có",
              birthday: data.birthday ? data.birthday : "Chưa có",
              role_account: "Manager",
            }}
            validateOnBlur
            validateOnChange
          >
            {(formik) => {
              console.log(formik);
              return (
                <div className="account">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="accountTop">
                      <div className="accountTopLeft">
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Họ và tên"
                            placeholder="Họ và tên"
                            name="fullname"
                            onChange={formik.handleChange}
                            value={formik.values.fullname}
                            error={formik.errors.fullname}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Cửa hàng"
                            placeholder="Nhập lại mật khẩu"
                            name="store_name"
                            onChange={formik.handleChange}
                            value={formik.values.store_name}
                            error={formik.errors.store_name}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Tài khoản"
                            placeholder="Tài khoản"
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={formik.errors.username}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Số điện thoại"
                            placeholder="Số điện thoại"
                            name="phone_number"
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                            error={formik.errors.phone_number}
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group widths="equal">
                          <Form.Input
                            fluid
                            label="Email"
                            placeholder="Email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                            readOnly
                          />
                          <Form.Input
                            fluid
                            label="Ngày sinh"
                            placeholder="Ngày sinh"
                            name="birthday"
                            onChange={formik.handleChange}
                            value={formik.values.birthday}
                            error={formik.errors.birthday}
                            readOnly
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}
