import accountApi from "../../api/accountApi";
import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listStaff = (keySearch, page) => async (dispatch) => {
  const params = {
    Role: "Staff",
    Status: "Both",
  };
  const searchParams = {
    Fullname: keySearch,
    Role: "Staff",
    Status: "Both",
  };
  dispatch({ type: STAFF_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await accountApi.getListAccount(params, page);
      dispatch({ type: STAFF_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STAFF_LIST_FAIL, payload: "" });
      console.log(data);
    } else {
      const data = await accountApi.getSearchListAccount(searchParams);
      dispatch({ type: STAFF_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STAFF_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: STAFF_LIST_FAIL, payload: message });
  }
};
