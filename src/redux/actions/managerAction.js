import accountApi from "../../api/accountApi";
import {
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listManager = (keySearch) => async (dispatch) => {
  const params = {
    Role: "Manager",
    Status: "Both",
  };
  const searchParams = {
    Fullname: keySearch,
    Role: "Manager",
    Status: "Both",
  };
  dispatch({ type: MANAGER_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await accountApi.getListAccount(params);
      dispatch({ type: MANAGER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
    } else {
      const data = await accountApi.getSearchListAccount(searchParams);
      dispatch({ type: MANAGER_LIST_SUCCESS, payload: data.content });
      dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: MANAGER_LIST_FAIL, payload: message });
  }
};
