import storeApi from "../../api/storeApi";
import {
  STORE_LIST_REQUEST,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAIL,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
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

export const createStore = (storeModels) => async (dispatch) => {
  console.log(storeModels);
  dispatch({
    type: CREATE_STORE_REQUEST,
    // payload: { storeModels },
  });
  try {
    if (storeModels) {
      const param = {
        store_address: storeModels.storeAddress,
        store_phone: storeModels.phone,
      };
      const { data } = await storeApi.createNewStore(param);
      dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: CREATE_STORE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
