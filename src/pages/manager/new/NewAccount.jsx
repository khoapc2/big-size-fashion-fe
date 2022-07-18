/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";

import "./newAccount.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Form } from "semantic-ui-react";
import { toast } from "react-toastify";

import { Formik } from "formik";
import { SchemaErrorCreateAccount } from "../../../service/Validations/AccountValidation.js";
import { listStore } from "../../../redux/actions/storeAction";
import { createAccount } from "../../../redux/actions/customerAction";
import { triggerReload } from "../../../redux/actions/userAction";
import {
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_SUCCESS,
} from "../../../service/Validations/VarConstant";

export default function NewAccount() {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.getListStoreDropdown);
  const response = useSelector((state) => state.createAccountState);

  const { success, error } = response;
  useEffect(() => {
    const status = true;
    dispatch(listStore({ status }));
    if (success) {
      toast.success("Tạo tài khoản quản lý thành công");
      dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: false });
    }
    if (error) {
      toast.error("Tạo tài khoản quản lý thất bại, vui lòng thử lại");
      dispatch({ type: CREATE_ACCOUNT_FAIL, payload: false });
    }
  }, [success, error, triggerReload, dispatch]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createAccount(data));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="newAccount">
        <h1 className="addAccountTitle">Tạo tài khoản cho quản lý</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirm: "",
            fullname: "",
            phone_number: "",
            store_id: "",
            role_account: "Manager",
          }}
          onSubmit={onSubmit}
          validationSchema={SchemaErrorCreateAccount}
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
                      <Form.Input
                        fluid
                        label="Họ và tên"
                        placeholder="Họ và tên"
                        name="fullname"
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        error={formik.errors.fullname}
                      />
                      <Form.Input
                        fluid
                        label="Tài khoản"
                        placeholder="Tài khoản"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.errors.username}
                      />
                      <Form.Group widths="equal">
                        <Form.Input
                          type="password"
                          fluid
                          label="Mật khẩu"
                          placeholder="Mật khẩu"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          error={formik.errors.password}
                        />
                        <Form.Input
                          type="password"
                          fluid
                          label="Xác nhận mật khẩu"
                          placeholder="Nhập lại mật khẩu"
                          name="passwordConfirm"
                          onChange={formik.handleChange}
                          value={formik.values.passwordConfirm}
                          error={formik.errors.passwordConfirm}
                        />
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Input
                          fluid
                          label="Số điện thoại"
                          placeholder="Số điện thoại"
                          name="phone_number"
                          onChange={formik.handleChange}
                          value={formik.values.phone_number}
                          error={formik.errors.phone_number}
                        />
                        <Form.Select
                          key={store.value}
                          fluid
                          label="Cửa hàng"
                          options={store || []}
                          placeholder="Chọn cửa hàng"
                          onChange={(e, v) => {
                            formik.setFieldValue("store_id", v.value);
                          }}
                          name="store_id"
                          value={formik.values.store_id}
                          error={formik.errors.store_id}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="accountBottom">
                    <Form.Button type="submit" color="green">
                      Xác nhận
                    </Form.Button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </DashboardLayout>
  );
}
