import accountApi from "../../api/accountApi";
import {
  MANAGER_LIST_REQUEST,
  MANAGER_LIST_SUCCESS,
  MANAGER_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listManager = (keySearch, role) => async (dispatch) => {
  console.log(role);
  dispatch({ type: MANAGER_LIST_REQUEST });
  try {
    if (role === "Admin") {
      console.log("Admin come here");

      const params = {
        Role: "Manager",
        Status: "Both",
      };
      const searchParams = {
        Fullname: keySearch,
        Role: "Manager",
        Status: "Both",
      };
      if (!keySearch) {
        const data = await accountApi.getListAccount(params);
        console.log(data);
        dispatch({ type: MANAGER_LIST_SUCCESS, payload: data.content });
        dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
      } else {
        console.log("yo");
        const data = await accountApi.getSearchListAccount(searchParams);
        dispatch({ type: MANAGER_LIST_SUCCESS, payload: data.content });
        dispatch({ type: MANAGER_LIST_FAIL, payload: "" });
      }
    } else if (role === "Owner") {
      console.log("Owner come here");

      const params = {
        Fullname: keySearch,
      };
      const data = await accountApi.getManagerForOwner(params);
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
