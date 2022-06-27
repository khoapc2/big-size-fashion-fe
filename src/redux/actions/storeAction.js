import storeApi from "../../api/storeApi";
import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
} from "../../service/Validations/VarConstant";

export const listStore = (keySearch, page) => async (dispatch) => {
  const params = {
    StoreAddress: keySearch,
  };
  dispatch({ type: STORE_LIST_REQUEST });
  try {
    if (!keySearch) {
      const data = await storeApi.getListStore(page);
      dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STORE_LIST_FAIL, payload: "" });
    } else {
      const data = await storeApi.getSearchListStore(params);
      dispatch({ type: STORE_LIST_SUCCESS, payload: data.content });
      dispatch({ type: STORE_LIST_FAIL, payload: "" });
    }
  } catch (error) {
    const message =
      error.respone && error.respone.content.message
        ? error.respone.content.message
        : error.message;
    dispatch({ type: STORE_LIST_FAIL, payload: message });
  }
};
export const a = (keySearch, page) => async (dispatch) => {
  // console.log(keySearch, page);
  dispatch({ type: STORE_LIST_REQUEST });
  try {
    if (keySearch) {
      const data = await storeApi.getListStore(page);
      dispatch({ type: STORE_LIST_SUCCESS, payload: data });
      dispatch({ type: STORE_LIST_FAIL, payload: "" });
    } else {
      const { data } = await storeApi.getListStore({ page, keySearch });
      dispatch({ type: STORE_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    const message = error.response.data;
    dispatch({ type: STORE_LIST_FAIL, payload: message });
  }
};
