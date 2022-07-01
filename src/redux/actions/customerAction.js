import accountApi from "../../api/accountApi";
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listCustomer = (keySearch) => async (dispatch) => {
  const params = {
    Role: "Customer",
    Status: "Both",
  };
  const searchParams = {
    Fullname: keySearch,
    Role: "Customer",
    Status: "Both",
  };
  dispatch({ type: CUSTOMER_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await accountApi.getListAccount(params);
      dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: CUSTOMER_LIST_FAIL, payload: "" });
    } else {
      const data = await accountApi.getSearchListAccount(searchParams);
      dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: CUSTOMER_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: CUSTOMER_LIST_FAIL, payload: message });
  }
};
