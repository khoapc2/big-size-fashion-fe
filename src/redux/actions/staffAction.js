import accountApi from "../../api/accountApi";
import {
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  STAFF_LIST_FAIL,
  GET_LIST_STAFF_IN_STORE_REQUEST,
  GET_LIST_STAFF_IN_STORE_SUCCESS,
  GET_LIST_STAFF_IN_STORE_FAIL,
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

export const listStaffInStoreAction = () => async (dispatch) => {
  dispatch({ type: GET_LIST_STAFF_IN_STORE_REQUEST });
  try {
    const data = await accountApi.getListStaffInStore();
    dispatch({ type: GET_LIST_STAFF_IN_STORE_SUCCESS, payload: data.content });
    dispatch({ type: GET_LIST_STAFF_IN_STORE_FAIL, payload: "" });
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: GET_LIST_STAFF_IN_STORE_FAIL, payload: message });
  }
};
